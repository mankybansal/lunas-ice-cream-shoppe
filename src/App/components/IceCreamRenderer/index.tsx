import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Animations from "~/App/animations";
import * as AppConfig from "~/App/config";
import { KioskFormData } from "~/App/types";
import { flavorToFile, servingToObject, toppingToFile } from "./constants";
import {
  addScoopToScene,
  addToppingToScene,
  CONE_HEIGHT,
  CONE_RADIUS,
  CUP_HEIGHT,
  CUP_RADIUS_BOTTOM,
  CUP_RADIUS_TOP
} from "./utils";
import { useSetAtom } from "jotai/index";
import { rendererAtom } from "~/App/components/IceCreamRenderer/renderer.atom.ts";
import { MediaQuery } from "~/App/mediaQuery.ts";

const RENDERER_ID = "ice-cream-renderer";

const RootContainer = styled(motion.div)<{ wide: boolean }>`
  width: 100%;
  max-width: ${({ wide }) => (wide ? "500px" : "500px")};
  height: 100%;
  min-height: 300px;
  overflow: hidden;
  background: #fff5e1;

  ${MediaQuery.BreakpointMaxWidth.MD} {
    height: ${({ wide }) => (wide ? "300px" : "200px")};
    min-height: unset;
  }
`;

const buildLights = (scene: THREE.Scene) => {
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 50); // Increase ambient light intensity
  scene.add(ambientLight);

  // Add a directional light
  const directionalLight = new THREE.DirectionalLight(0xf5f5dc, 1.5); // Increase directional light intensity
  directionalLight.position.set(8, 8, 6.5);
  directionalLight.castShadow = true; // Enable shadows for the light
  scene.add(directionalLight);

  // Configure shadow properties for the light
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
};

interface Props {
  scoopsToShow: string[];
  toppingsToShow: string[];
  serving: string;
  isRandom: boolean;
}

export const IceCreamRenderer = ({
  scoopsToShow,
  toppingsToShow,
  serving,
  isRandom
}: Props) => {
  const setRendererState = useSetAtom(rendererAtom);
  const ref = React.useRef<HTMLDivElement>(null);
  const [preloadedModels, setPreloadedModels] = useState<{
    [key: string]: THREE.Group;
  }>({});

  useEffect(() => {
    const loadModels = async () => {
      const loader = new GLTFLoader();
      const models: { [key: string]: THREE.Group } = {};

      const loadModel = (path: string) =>
        new Promise<THREE.Group>((resolve, reject) => {
          loader.load(path, (gltf) => resolve(gltf.scene), undefined, reject);
        });

      const flavorPromises = Object.entries(flavorToFile).map(
        async ([key, file]) => {
          models[key] = await loadModel("gltf/scoops/" + file);
        }
      );

      const toppingPromises = Object.entries(toppingToFile).map(
        async ([key, file]) => {
          models[key] = await loadModel("gltf/toppings/" + file);
        }
      );

      await Promise.all([...flavorPromises, ...toppingPromises]);

      const textureLoader = new THREE.TextureLoader();

      // Pre-create the cup
      const cupTexture = textureLoader.load("images/cup-texture.png");
      const cupGeometry = new THREE.CylinderGeometry(
        CUP_RADIUS_BOTTOM,
        CUP_RADIUS_TOP,
        CUP_HEIGHT,
        32
      );
      const cupMaterial = new THREE.MeshPhongMaterial({ map: cupTexture });
      const cup = new THREE.Mesh(cupGeometry, cupMaterial);
      cup.position.y = -1.5;
      cup.castShadow = true;
      cup.receiveShadow = true;
      cup.rotation.x = Math.PI;
      models["cup"] = new THREE.Group();
      models["cup"].add(cup);

      // Pre-create the cone
      const coneTexture = textureLoader.load("images/waffle-texture.jpg");
      const coneGeometry = new THREE.ConeGeometry(CONE_RADIUS, CONE_HEIGHT, 50);
      const coneMaterial = new THREE.MeshPhongMaterial({ map: coneTexture });
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      cone.position.y = -3;
      cone.castShadow = true;
      cone.receiveShadow = true;
      cone.rotation.x = Math.PI;
      models["cone"] = new THREE.Group();
      models["cone"].add(cone);

      setPreloadedModels(models);
    };

    void loadModels();
  }, []);

  const servingType = servingToObject[serving];

  const { watch } = useFormContext<KioskFormData>();
  const currentStep = watch("currentStep");
  const selectedServing = watch("order.currentItem.serving");

  const shouldShowRenderer = useMemo(
    () =>
      currentStep < AppConfig.Steps.Confirm &&
      (currentStep === AppConfig.Steps.Servings ? !!selectedServing : true),
    [currentStep, selectedServing]
  );

  const rotationRef = useRef(0); // Ref to store the rotation state

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const { clientWidth, clientHeight } = target;
    const aspect = clientWidth / clientHeight;

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, aspect);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true
    });

    renderer.setSize(clientWidth, clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadow map
    renderer.setClearColor(0xfff5e1); // Set background color to cream
    document.getElementById(RENDERER_ID)!.appendChild(renderer.domElement);

    setRendererState({ renderer });

    // Render the scene with the camera
    renderer.render(scene, camera);

    buildLights(scene);

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Reset the rotation, skip 3 frames worth of rotation (fudge)
    sceneGroup.rotation.y = rotationRef.current - 0.006;

    // Initial animation
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const targetScale = 1;
    const duration = 500; // 3 seconds
    const start = performance.now();

    // Easing function (easeOutCubic)
    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    // Create the animation loop
    function animate(time: number) {
      const elapsedTime = time - start;
      const fraction = Math.min(elapsedTime / duration, 1); // Clamp fraction to [0, 1]
      rotationRef.current = sceneGroup.rotation.y; // Set the rotation state

      if (elapsedTime < duration && isRandom) {
        const easeFraction = easeOutCubic(fraction);
        sceneGroup.rotation.y -= 0.01;
        sceneGroup.position.lerp(targetPosition, easeFraction);
        const scalar = THREE.MathUtils.lerp(0.5, targetScale, easeFraction);
        sceneGroup.scale.setScalar(scalar);
      } else {
        sceneGroup.rotation.y -= 0.002;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    if (Object.keys(preloadedModels).length > 0) {
      // Add serving to the scene
      sceneGroup.add(preloadedModels[servingType].clone(true));

      scoopsToShow.forEach((flavor, i) =>
        addScoopToScene(
          sceneGroup,
          preloadedModels[flavor],
          i,
          servingType,
          scoopsToShow.length
        )
      );

      if (scoopsToShow.length > 0) {
        toppingsToShow.forEach((topping) =>
          addToppingToScene(
            sceneGroup,
            preloadedModels[topping],
            servingType,
            scoopsToShow.length,
            topping,
            toppingsToShow
          )
        );
      }
    }

    const handleResize = () => {
      const { clientWidth, clientHeight } = target;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      target?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [
    servingType,
    scoopsToShow,
    toppingsToShow,
    preloadedModels,
    rotationRef,
    isRandom
  ]);

  if (!shouldShowRenderer) return <></>;

  return (
    <RootContainer
      wide={currentStep === AppConfig.Steps.Start}
      id={RENDERER_ID}
      ref={ref}
      {...Animations.AnimateInUp}
    />
  );
};
