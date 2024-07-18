import React from "react";
import styled from "@emotion/styled";
import { AnimatePresence } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";

import { helpModalStateAtom } from "./helpModalState.atom";

import { XCircle } from "~/App/components/icons/XCircle";
import {
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalOverlay
} from "~/App/Styled";
import Animations from "~/App/animations";

const StyledLink = styled.a`
  color: #fa8758;
  text-decoration: underline;
  font-weight: bold;
`;

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
        <ModalOverlay {...Animations.OverlayVariants}>
          <ModalContainer {...Animations.ModalVariants}>
            <CloseButton onClick={handleClickClose}>
              <XCircle />
            </CloseButton>
            <ModalContent>
              <h1>Help</h1>
              <p style={{ textAlign: "left" }}>
                This is a demo app for a fictional ice cream parlor called
                Luna's Ice Cream Shoppe built with{" "}
                <Link href={links.vite}>Vite</Link>,{" "}
                <Link href={links.react}>React</Link>,{" "}
                <Link href={links.typescript}>Typescript</Link>, ,
                <Link href={links.emotion}>Emotion</Link>, ,
                <Link href={links.jotai}>Jotai</Link>,{" "}
                <Link href={links.framer}>Framer Motion</Link>,{" "}
                <Link href={links.reactHookForm}>React Hook Form</Link>, and{" "}
                <Link href={links.threejs}>ThreeJS</Link>.
              </p>
              <p>
                Luna's is a play on my name, which in Sanskrit means moon. Most
                of my food related projects are part of the Luna universe.
              </p>
              <p>
                I built this project 6 years ago as my first React project. As I
                progress through my software engineering journey, every 2-3
                years, I keep adding more features and refactor this app to
                showcase my skills and knowledge.
              </p>
              <p>
                If you would like to see where this all began, you can check out{" "}
                <Link href={links.firstVersion}>
                  Luna's Ice Cream Shoppe v1
                </Link>
                .
              </p>
              <p>
                All models and images were handcrafted on{" "}
                <Link href={links.blender}>Blender</Link> and{" "}
                <Link href={links.figma}>Figma</Link>.
              </p>
              <p>
                If you have ideas, or want to submit improvements to this
                project, feel free to check out the{" "}
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
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
