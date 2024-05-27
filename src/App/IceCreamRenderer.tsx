import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Animations from "~/App/animations.ts";
import { useStepHandler } from "~/App/hooks/useStepHandler.ts";

import * as AppConfig from "./config";

const RootContainer = styled(motion.div)<{ wide: boolean }>`
  width: 100%;
  max-width: ${({ wide }) => (wide ? "500px" : "500px")};
  height: 100%;
  overflow: hidden;
`;

const flavorToFile: Record<string, string> = {
  FLA0: "scoop-init.gltf",
  FLA1: "scoop-vanilla.gltf",
  FLA2: "scoop-chocolate.gltf",
  FLA3: "scoop-strawberry.gltf",
  FLA4: "scoop-coffee.gltf",
  FLA5: "scoop-mango.gltf",
  FLA6: "scoop-cookies.gltf",
  FLA7: "scoop-mint.gltf",
  FLA8: "scoop-caramel.gltf"
};

const servingToObject: Record<any, any> = {
  SER1: "cup",
  SER2: "cone"
};

interface Props {
  scoopsToShow: string[];
  serving: string;
}

export const IceCreamRenderer = ({ scoopsToShow, serving }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { currentStep } = useStepHandler();

  const servingType = servingToObject[serving];

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current!.clientWidth / ref.current!.clientHeight,
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

    const textureLoader = new THREE.TextureLoader();

    if (servingType === "cup") {
      // Create Cup
      const cupTexture = textureLoader.load("cup-texture.png", animate);
      const geometry = new THREE.CylinderGeometry(2, 2.6, 2, 32);
      const material = new THREE.MeshPhongMaterial({ map: cupTexture });
      const cup = new THREE.Mesh(geometry, material);
      cup.position.y = -1.5;
      cup.castShadow = true;
      cup.receiveShadow = true;
      cup.rotation.x = Math.PI;
      sceneGroup.add(cup);
    }

    if (servingType === "cone") {
      // Create Cone
      const waffleTexture = textureLoader.load("waffle-texture.jpg", animate);
      const geometry = new THREE.ConeGeometry(1.5, 6, 50);
      const material = new THREE.MeshPhongMaterial({ map: waffleTexture });
      const cone = new THREE.Mesh(geometry, material);
      cone.position.y = -3;
      cone.castShadow = true;
      cone.receiveShadow = true;
      cone.rotation.x = Math.PI;
      sceneGroup.add(cone);
    }

    const gltfLoader = new GLTFLoader();

    // TODO Preload all the flavors, then show the scoops.
    scoopsToShow.forEach((flavor, i) =>
      gltfLoader.load("gltf/" + flavorToFile[flavor], (gltf) => {
        const scoopGLTF = gltf.scene;
        if (servingType === "cone") {
          scoopGLTF.scale.set(2.5, 2.5, 2.5);
          scoopGLTF.position.y = 0.5 + i * 1.5;
        } else {
          scoopGLTF.scale.set(2, 2, 2);

          if (i == 2) {
            scoopGLTF.position.y = 0.7;
            scoopGLTF.position.x = 0.2;
          } else {
            scoopGLTF.position.y = -0.4;
            scoopGLTF.position.x = -1 + i * 2;
          }
        }
        scoopGLTF.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

        // Traverse the model and enable shadows for all meshes
        scoopGLTF.traverse((child) => {
          child.castShadow = true;
          child.receiveShadow = true;
        });

        sceneGroup.add(scoopGLTF);
      })
    );

    // Position the camera
    camera.position.z = 10;

    // Create the animation loop
    function animate() {
      requestAnimationFrame(animate);

      sceneGroup.rotation.y -= 0.002;

      // Render the scene
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      const width = ref.current!.clientWidth;
      const height = ref.current!.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ref.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [servingType, scoopsToShow]);

  return (
    <RootContainer
      wide={currentStep === AppConfig.Steps.Start}
      id="ice-cream-renderer"
      ref={ref}
      {...Animations.AnimateInUp}
    />
  );
};
