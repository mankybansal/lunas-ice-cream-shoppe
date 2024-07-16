import { atom } from "jotai";

interface ModalProps {
  isVisible: boolean;
}

interface Props extends ModalProps {
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText?: string;
}

const initValue: Props = {
  isVisible: false,
  title: "",
  content: "",
  onConfirm: () => {},
  onCancel: () => {},
  cancelText: "Cancel",
  confirmText: "Confirm"
};

export const confirmationModalStateAtom = atom<Props>(initValue);
