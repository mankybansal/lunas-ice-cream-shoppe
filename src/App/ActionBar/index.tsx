import { useAtomValue } from "jotai";
import { actionBarStateAtom } from "./actionBarState.atom";
import { motion } from "framer-motion";
import Animations from "~/App/animations.ts";

export const ActionBar = () => {
  const { back, next, review } = useAtomValue(actionBarStateAtom);
  if (!back && !next) return null;
  return (
    <motion.div className={"Action-Container"} {...Animations.AnimateInUp}>
      {review}
      <div className={"Step-Control"}>
        {back && (
          <div className="Button-step Button-prev" onClick={back.onClick}>
            {back.icon} {back.label}
          </div>
        )}
        {next && (
          <div className="Button-step Button-next" onClick={next.onClick}>
            {next.label} {next.icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};
