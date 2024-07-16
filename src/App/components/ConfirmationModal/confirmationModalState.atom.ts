import { atom } from "jotai/index";

export const confirmationModalStateAtom = atom<{
  isVisible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText?: string;
}>({
  isVisible: false,
  title: "",
  content: "",
  onConfirm: () => {},
  onCancel: () => {},
  cancelText: "Cancel",
  confirmText: "Confirm"
});
