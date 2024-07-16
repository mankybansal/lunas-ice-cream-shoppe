import * as THREE from "three";

export const addToppingToScene = (
  sceneGroup: THREE.Group<THREE.Object3DEventMap>,
  toppingModel: THREE.Group,
  servingType: string,
  scoopCount: number,
  topping: string,
  toppingsToShow: string[]
) => {
  const isCherry = topping === "TOP5";
  const hasWhippedCream = toppingsToShow.includes("TOP7");

  if (servingType === "cone") {
    const clone = toppingModel.clone(true);
    clone.scale.set(2.5, 2.5, 2.5);
    clone.position.y = 0.5 + (scoopCount == 2 ? 1.5 : 0);

    // Adjust the position of the cherry if whipped cream is present.
    if (isCherry && hasWhippedCream) {
      clone.position.y = 0.5 + (scoopCount == 2 ? 1.5 : 0) + 0.5;
    }

    clone.rotation.y = THREE.MathUtils.degToRad(5) * (2 * 300);

    clone.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });

    sceneGroup.add(clone);
  } else {
    for (let i = 0; i < scoopCount; i++) {
      const clone = toppingModel.clone(true);
      clone.scale.set(2, 2, 2);
      const cupRadius = 2.6;
      let scoopDistance = cupRadius * 0.4; // Adjust this multiplier as needed for spacing

      if (scoopCount == 1) {
        clone.position.x = 0;
        clone.position.z = 0;
      } else if (scoopCount == 2) {
        scoopDistance = cupRadius * 0.9;
        if (i == 0) {
          clone.position.x = -scoopDistance / 2;
          clone.position.z = 0;
        } else if (i == 1) {
          clone.position.x = scoopDistance / 2;
          clone.position.z = 0;
        }
      } else if (scoopCount == 3) {
        const angle = (i * 2 * Math.PI) / 3; // Divide the circle into 3 parts
        clone.position.x = scoopDistance * Math.cos(angle);
        clone.position.z = scoopDistance * Math.sin(angle);
      }
      clone.position.y = -0.2;

      // Adjust the position of the cherry if whipped cream is present.
      if (isCherry && hasWhippedCream) {
        clone.position.y = -0.2 + 0.5;
      }

      clone.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

      clone.traverse((child) => {
        child.castShadow = true;
        child.receiveShadow = true;
      });

      sceneGroup.add(clone);
    }
  }
};

export const addScoopToScene = (
  sceneGroup: THREE.Group<THREE.Object3DEventMap>,
  model: THREE.Group,
  i: number,
  servingType: string,
  scoopCount: number
) => {
  const clone = model.clone(true);

  if (servingType === "cone") {
    clone.scale.set(2.5, 2.5, 2.5);
    clone.position.y = 0.5 + i * 1.5;
  } else {
    clone.scale.set(2, 2, 2);
    const cupRadius = 2.6;
    let scoopDistance = cupRadius * 0.4; // Adjust this multiplier as needed for spacing

    if (scoopCount == 1) {
      clone.position.x = 0;
      clone.position.z = 0;
    } else if (scoopCount == 2) {
      scoopDistance = cupRadius * 0.9;
      if (i == 0) {
        clone.position.x = -scoopDistance / 2;
        clone.position.z = 0;
      } else if (i == 1) {
        clone.position.x = scoopDistance / 2;
        clone.position.z = 0;
      }
    } else if (scoopCount == 3) {
      const angle = (i * 2 * Math.PI) / 3; // Divide the circle into 3 parts
      clone.position.x = scoopDistance * Math.cos(angle);
      clone.position.z = scoopDistance * Math.sin(angle);
    }
    clone.position.y = -0.2;
  }
  clone.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

  clone.traverse((child) => {
    child.castShadow = true;
    child.receiveShadow = true;
  });

  sceneGroup.add(clone);
};
