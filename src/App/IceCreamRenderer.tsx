import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

const RootContainer = styled.div`
  width: 100%;
  max-width: 350px;
  height: 100vh;
  overflow: hidden;

  color: #f5e6cc;
  color: #fff4e6;
  color: #ffdab9;
  color: #f4cba0;
  color: #fff9c4;
  color: #ffa07a;
  color: #ffd1dc;
  color: #e0f7fa;
  color: #5d4037;
  color: #424242;
  color: #556b2f;
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

interface Props {
  scoopsToShow: string[];
}

export const IceCreamRenderer = ({ scoopsToShow }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

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
    const directionalLight = new THREE.DirectionalLight(0xf5f5dc, 3); // Increase directional light intensity
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

    const gltfLoader = new GLTFLoader();

    let scoops: THREE.Group[] = [];

    // TODO Preload all the flavors, then show the scoops.
    scoopsToShow.forEach((flavor, i) => {
      let file = flavorToFile[flavor];

      gltfLoader.load("gltf/" + file, (gltf) => {
        const scoopGLTF = gltf.scene;
        scoopGLTF.scale.set(2.5, 2.5, 2.5);
        scoopGLTF.position.y = 0.5 + i * 1.5;
        scoopGLTF.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

        // Traverse the model and enable shadows for all meshes
        scoopGLTF.traverse((child) => {
          child.castShadow = true;
          child.receiveShadow = true;
        });

        scene.add(scoopGLTF);
        scoops.push(scoopGLTF);
      });
    });

    // Load the waffle texture
    const textureLoader = new THREE.TextureLoader();
    const waffleTexture = textureLoader.load("waffle-texture.jpg", () => {
      animate(); // Start animation loop after texture is loaded
    });
    const geometry = new THREE.ConeGeometry(1.5, 6, 50);
    const material = new THREE.MeshPhongMaterial({ map: waffleTexture });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.y = -3;
    cone.castShadow = true;
    cone.receiveShadow = true;
    scene.add(cone);

    // Position the camera
    camera.position.z = 10;

    // Flip the cone upside down
    cone.rotation.x = Math.PI;

    // Create the animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate the cone
      cone.rotation.y += 0.002;

      // Rotate the scoops
      scoops.forEach((scoop) => {
        scoop.rotation.y -= 0.002;
      });

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
  }, [scoopsToShow]);

  return <RootContainer id="ice-cream-renderer" ref={ref} />;
};
