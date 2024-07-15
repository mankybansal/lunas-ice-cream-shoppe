import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styled from "@emotion/styled";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Animations from "~/App/animations";
import { useFormContext } from "react-hook-form";
import { KioskFormData } from "~/App/types.ts";
import * as AppConfig from "~/App/config.ts";

const RootContainer = styled(motion.div)<{ wide: boolean }>`
  width: 100%;
  max-width: ${({ wide }) => (wide ? "500px" : "500px")};
  height: 100%;
  overflow: hidden;
  background: #fff5e1;
`;

const flavorToFile: Record<string, string> = {
  FLA1: "scoop-vanilla.gltf",
  FLA2: "scoop-chocolate.gltf",
  FLA3: "scoop-strawberry.gltf",
  FLA4: "scoop-coffee.gltf",
  FLA5: "scoop-mango.gltf",
  FLA6: "scoop-cookies.gltf",
  FLA7: "scoop-mint.gltf",
  FLA8: "scoop-caramel.gltf"
};

const toppingToFile: Record<string, string> = {
  TOP1: "peanuts.gltf",
  TOP2: "sauce.gltf",
  TOP3: "beans.gltf",
  TOP4: "marshmallows.gltf",
  TOP5: "cherry.gltf",
  TOP6: "sprinkles.gltf",
  TOP7: "whipped-cream.gltf",
  TOP8: "chocolate-chips.gltf"
};

const servingToObject: Record<string, string> = {
  SER1: "cup",
  SER2: "cone"
};

const addToppingToScene = (
  sceneGroup: THREE.Group<THREE.Object3DEventMap>,
  model: THREE.Group,
  servingType: string,
  scoopCount: number
) => {
  const clone = model.clone(true);

  if (servingType === "cone") {
    clone.scale.set(2.5, 2.5, 2.5);
    clone.position.y = scoopCount === 2 ? 2 : 0.5;
  } else {
    clone.scale.set(2, 2, 2);
    clone.position.y = -0.35;
    clone.position.x = -1;
  }
  clone.rotation.y = THREE.MathUtils.degToRad(5) * 300;

  clone.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  sceneGroup.add(clone);
};

const addScoopToScene = (
  sceneGroup: THREE.Group<THREE.Object3DEventMap>,
  model: THREE.Group,
  i: number,
  servingType: string
) => {
  const clone = model.clone(true);

  if (servingType === "cone") {
    clone.scale.set(2.5, 2.5, 2.5);
    clone.position.y = 0.5 + i * 1.5;
  } else {
    clone.scale.set(2, 2, 2);

    if (i == 2) {
      clone.position.y = 0.7;
      clone.position.x = 0.2;
    } else {
      clone.position.y = -0.4;
      clone.position.x = -1 + i * 2;
    }
  }
  clone.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

  clone.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  sceneGroup.add(clone);
};

interface Props {
  scoopsToShow: string[];
  toppingsToShow: string[];
  serving: string;
}

export const IceCreamRenderer = ({
  scoopsToShow,
  toppingsToShow,
  serving
}: Props) => {
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
      const cupGeometry = new THREE.CylinderGeometry(2, 2.6, 2, 32);
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
      const coneGeometry = new THREE.ConeGeometry(1.5, 6, 50);
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

    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      target!.clientWidth / target!.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(ref.current!.clientWidth, ref.current!.clientHeight);
    renderer.shadowMap.enabled = true; // Enable shadow map
    renderer.setClearColor(0xfff5e1); // Set background color to cream
    document
      .getElementById("ice-cream-renderer")!
      .appendChild(renderer.domElement);

    // Render the scene with the camera
    renderer.render(scene, camera);

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

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Position the camera
    camera.position.z = 10;

    // Reset the rotation, skip 3 frames worth of rotation (fudge)
    sceneGroup.rotation.y = rotationRef.current - 0.006;

    // Create the animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Set the rotation state
      rotationRef.current = sceneGroup.rotation.y;

      // Rotate the scene
      sceneGroup.rotation.y -= 0.002;

      // Render the scene
      renderer.render(scene, camera);
    }

    animate();

    if (Object.keys(preloadedModels).length > 0) {
      // Add the cup or cone to the scene
      if (servingType === "cup") {
        sceneGroup.add(preloadedModels["cup"].clone(true));
      } else if (servingType === "cone") {
        sceneGroup.add(preloadedModels["cone"].clone(true));
      }

      scoopsToShow.forEach((flavor, i) =>
        addScoopToScene(sceneGroup, preloadedModels[flavor], i, servingType)
      );

      if (scoopsToShow.length > 0) {
        toppingsToShow.forEach((topping) =>
          addToppingToScene(
            sceneGroup,
            preloadedModels[topping],
            servingType,
            scoopsToShow.length
          )
        );
      }
    }

    const handleResize = () => {
      const width = target!.clientWidth;
      const height = target!.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      target?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [servingType, scoopsToShow, toppingsToShow, preloadedModels, rotationRef]);

  if (!shouldShowRenderer) return <></>;

  return (
    <RootContainer
      wide={currentStep === AppConfig.Steps.Start}
      id="ice-cream-renderer"
      ref={ref}
      {...Animations.AnimateInUp}
    />
  );
};
