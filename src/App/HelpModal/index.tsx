import { helpModalStateAtom } from "./helpModalState.atom";
import { useSetAtom } from "jotai";
import styled from "@emotion/styled";
import { motion, Variants } from "framer-motion";
import { XCircle } from "~/App/icons/XCircle.tsx";

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled(motion.div)`
  background: white;
  border-radius: 24px;
  position: relative;
  text-align: left;
  padding: 48px;
  max-width: 600px;
  min-width: 400px;
`;

const Link = styled.a`
  color: #fa8758;
  text-decoration: underline;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

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

export const HelpModal = () => {
  const setHelpModalState = useSetAtom(helpModalStateAtom);

  const handleClickClose = () => {
    setHelpModalState({ isVisible: false });
  };

  return (
    <ModalOverlay {...OverlayVariants}>
      <ModalContainer {...ModalVariants}>
        <CloseButton onClick={handleClickClose}>
          <XCircle />
        </CloseButton>
        <h1>Help</h1>
        <p style={{ textAlign: "left" }}>
          This is a demo app for a fictional ice cream parlor called Luna's Ice
          Cream Shoppe built with{" "}
          <Link target={"_blank"} href="https://vitejs.dev/">
            Vite
          </Link>
          ,{" "}
          <Link target={"_blank"} href="https://reactjs.org/">
            React
          </Link>
          ,{" "}
          <Link target={"_blank"} href="https://www.typescriptlang.org/">
            Typescript
          </Link>
          ,{" "}
          <Link target={"_blank"} href="https://jotai.org/">
            Jotai
          </Link>
          ,{" "}
          <Link target={"_blank"} href="https://www.framer.com/motion/">
            Framer Motion
          </Link>
          ,{" "}
          <Link target={"_blank"} href="https://react-hook-form.com/">
            React Hook Form
          </Link>
          , and{" "}
          <Link target={"_blank"} href="https://threejs.org/">
            ThreeJS
          </Link>
          .
        </p>
        <p>
          I built this project 6 years ago as my first React project. As I
          progress through my software engineering journey, I keep adding more
          features to this app to showcase my skills and knowledge. Since I
          started this project I have been updating it every 2-3 years.
        </p>
        <p>
          All models and images were handcrafted on{" "}
          <Link target={"_blank"} href="https://www.blender.org/">
            Blender
          </Link>{" "}
          and{" "}
          <Link target={"_blank"} href={"https://www.figma.com/"}>
            Figma
          </Link>
          .
        </p>
        <p>
          If you have ideas, or want to submit improvements to this project,
          feel free to check out the{" "}
          <Link
            target={"_blank"}
            href={"https://github.com/mankybansal/lunas-ice-cream-shoppe"}
          >
            repository on Github.
          </Link>
        </p>
        <p>Keep learning, and get some ice-cream.</p>
        <b style={{ fontFamily: "Pacifico", color: "brown" }}>
          Made in Seattle, Washington
        </b>
      </ModalContainer>
    </ModalOverlay>
  );
};
