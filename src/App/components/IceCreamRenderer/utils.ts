import * as THREE from "three";
import { Object3D } from "three";

export const CUP_RADIUS_TOP = 3.25;
export const CUP_RADIUS_BOTTOM = 2.5;
export const CUP_HEIGHT = 2.5;

export const CONE_RADIUS = 1.5;
export const CONE_HEIGHT = 6;

const scale = 2.5;

const TRIPLE_SCOOP_DISTANCE = CUP_RADIUS_TOP * 0.4;
const DOUBLE_SCOOP_DISTANCE = CUP_RADIUS_TOP * 0.7;

const CHERRY_KEY = "TOP5";
const WHIPPED_CREAM_KEY = "TOP7";
const CHOCOLATE_SAUCE_KEY = "TOP2";

const distributeObjectsInCup = (
  object: Object3D,
  scoopCount: number,
  i: number
) => {
  if (scoopCount === 2) {
    object.position.x = ((i === 0 ? -1 : 1) * DOUBLE_SCOOP_DISTANCE) / 2;
  } else if (scoopCount === 3) {
    const angle = (i * 2 * Math.PI) / 3; // Divide the circle into 3 parts
    object.position.x = TRIPLE_SCOOP_DISTANCE * Math.cos(angle);
    object.position.z = TRIPLE_SCOOP_DISTANCE * Math.sin(angle);
  }
  object.position.y = -0.7;
};

const addShadow = (child: Object3D): void => {
  child.castShadow = true;
  child.receiveShadow = true;
};

const createClone = (model: THREE.Group) => {
  const clone = model.clone(true);
  clone.scale.set(scale, scale, scale);
  return clone;
};

export const addToppingToScene = (
  sceneGroup: Object3D,
  toppingModel: THREE.Group,
  servingType: string,
  scoopCount: number,
  topping: string,
  toppingsToShow: string[]
) => {
  const isCherry = topping === CHERRY_KEY;
  const isSauce = topping === CHOCOLATE_SAUCE_KEY;
  const hasWhippedCream = toppingsToShow.includes(WHIPPED_CREAM_KEY);
  const hasSauce = toppingsToShow.includes(CHOCOLATE_SAUCE_KEY);

  if (servingType === "cone") {
    const topping = createClone(toppingModel);
    topping.position.y = 0.5 + (scoopCount == 2 ? 1.5 : 0);
    topping.traverse(addShadow);
    sceneGroup.add(topping);
  } else {
    for (let i = 0; i < scoopCount; i++) {
      const topping = createClone(toppingModel);
      distributeObjectsInCup(topping, scoopCount, i);

      // Adjust the position of the cherry if whipped cream is present.
      if (isCherry && hasWhippedCream) topping.position.y += 0.7;
      if (!isSauce && hasSauce) topping.position.y += 0.1;

      topping.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

      topping.traverse(addShadow);
      sceneGroup.add(topping);
    }
  }
};

export const addScoopToScene = (
  sceneGroup: Object3D,
  model: THREE.Group,
  i: number,
  servingType: string,
  scoopCount: number
) => {
  const clone = model.clone(true);
  clone.scale.set(scale, scale, scale);

  if (servingType === "cone") {
    clone.position.y = 0.5 + i * 1.5;
    // Alternate the rotation of the scoops to make them look more natural.
    clone.rotation.y = i % 2 === 0 ? THREE.MathUtils.degToRad(90) : 0;
  } else {
    distributeObjectsInCup(clone, scoopCount, i);
  }

  clone.rotation.y = THREE.MathUtils.degToRad(5) * (i * 300);

  clone.traverse(addShadow);
  sceneGroup.add(clone);
};
