import { Variants } from "framer-motion";

const AnimateInUpWithDelay = (delay: number): Variants => ({
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeIn", duration: 0.2, delay }
  }
});

const AnimateInUp = AnimateInUpWithDelay(0);

const AnimateInDown: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeIn", duration: 0.2 }
  }
};

const AnimateInDownOutDown: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeIn", duration: 0.2 }
  },
  exit: { opacity: 0, y: -8 }
};

const Animations = { AnimateInUp, AnimateInDown, AnimateInDownOutDown };
export default Animations;
