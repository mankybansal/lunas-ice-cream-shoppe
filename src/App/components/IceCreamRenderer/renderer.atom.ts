import { atom } from "jotai";
import * as THREE from "three";

export const rendererAtom = atom<{
  renderer: THREE.WebGLRenderer | null;
}>({
  renderer: null
});
