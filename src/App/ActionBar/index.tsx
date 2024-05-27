import { useAtomValue } from "jotai";
import { actionBarStateAtom } from "./actionBarState.atom";

export const ActionBar = () => {
  const { back, next, review } = useAtomValue(actionBarStateAtom);
  if (!back && !next) return null;
  return (
    <div className={"Action-Container"}>
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
    </div>
  );
};
