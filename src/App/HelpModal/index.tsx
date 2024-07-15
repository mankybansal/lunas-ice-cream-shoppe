import { helpModalStateAtom } from "./helpModalState.atom";
import { useAtomValue, useSetAtom } from "jotai";
import styled from "@emotion/styled";
import { AnimatePresence, motion, Variants } from "framer-motion";
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

const StyledLink = styled.a`
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

const links = {
  vite: "https://vitejs.dev/",
  react: "https://reactjs.org/",
  typescript: "https://www.typescriptlang.org/",
  jotai: "https://jotai.org/",
  emotion: "https://emotion.sh/docs/introduction",
  framer: "https://www.framer.com/motion/",
  reactHookForm: "https://react-hook-form.com/",
  threejs: "https://threejs.org/",
  blender: "https://www.blender.org/",
  figma: "https://www.figma.com/",
  github: "https://github.com/mankybansal/lunas-ice-cream-shoppe",
  firstVersion:
    "https://lunas-ice-cream-shoppe-fd7lxr5fj-mankybansal.vercel.app/"
};

const Link = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <StyledLink target={"_blank"} {...props} />
);

export const HelpModal = () => {
  const setHelpModalState = useSetAtom(helpModalStateAtom);
  const { isVisible } = useAtomValue(helpModalStateAtom);

  const handleClickClose = () => {
    setHelpModalState({ isVisible: false });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay {...OverlayVariants}>
          <ModalContainer {...ModalVariants}>
            <CloseButton onClick={handleClickClose}>
              <XCircle />
            </CloseButton>
            <h1>Help</h1>
            <p style={{ textAlign: "left" }}>
              This is a demo app for a fictional ice cream parlor called Luna's
              Ice Cream Shoppe built with <Link href={links.vite}>Vite</Link>,{" "}
              <Link href={links.react}>React</Link>,{" "}
              <Link href={links.typescript}>Typescript</Link>, ,
              <Link href={links.emotion}>Emotion</Link>, ,
              <Link href={links.jotai}>Jotai</Link>,{" "}
              <Link href={links.framer}>Framer Motion</Link>,{" "}
              <Link href={links.reactHookForm}>React Hook Form</Link>, and{" "}
              <Link href={links.threejs}>ThreeJS</Link>.
            </p>
            <p>
              Luna's is a play on my name, which in Sanskrit means moon. Most of
              my food related projects are part of the Luna universe.
            </p>
            <p>
              I built this project 6 years ago as my first React project. As I
              progress through my software engineering journey, every 2-3 years,
              I keep adding more features and refactor this app to showcase my
              skills and knowledge.
            </p>
            <p>
              If you would like to see where this all began, you can check out{" "}
              <Link href={links.firstVersion}>Luna's Ice Cream Shoppe v1</Link>.
            </p>
            <p>
              All models and images were handcrafted on{" "}
              <Link href={links.blender}>Blender</Link> and{" "}
              <Link href={links.figma}>Figma</Link>.
            </p>
            <p>
              If you have ideas, or want to submit improvements to this project,
              feel free to check out the{" "}
              <Link href={links.github}>repository on Github.</Link>
            </p>
            <p>Keep learning, and get some ice-cream 🍦.</p>
            <h4>
              — Mayank{" "}
              <Link href={"https://manky.me"} style={{ fontSize: 16 }}>
                (Website)
              </Link>
            </h4>
            <b style={{ fontFamily: "Pacifico", color: "brown" }}>
              Made in Seattle, Washington
            </b>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
