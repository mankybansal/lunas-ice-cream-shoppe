import { atom } from "jotai/index";

interface ModalProps {
  isVisible: boolean;
}

interface Props extends ModalProps {}

const initValue: Props = {
  isVisible: false
};

export const helpModalStateAtom = atom<Props>(initValue);
