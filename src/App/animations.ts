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

const AnimateInRightWithDelay = (delay: number): Variants => ({
  initial: { opacity: 0, x: -8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeIn", duration: 0.2, delay }
  }
});

const AnimateInRight = AnimateInRightWithDelay(0);

const AnimateInLeftWithDelay = (delay: number): Variants => ({
  initial: { opacity: 0, x: 8 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeIn", duration: 0.2, delay }
  }
});

const AnimateInLeft = AnimateInLeftWithDelay(0);

const ModalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1
  },
  exit: {
    opacity: 0,
    scale: 0.8
  }
};

const OverlayVariants: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

const Animations = {
  AnimateInUp,
  AnimateInDown,
  AnimateInDownOutDown,
  AnimateInRight,
  AnimateInLeft,
  ModalVariants,
  OverlayVariants
};

export default Animations;
