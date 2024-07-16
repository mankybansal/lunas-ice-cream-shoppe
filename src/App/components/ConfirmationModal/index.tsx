import { confirmationModalStateAtom } from "./confirmationModalState.atom";
import { useAtom } from "jotai";
import Animations from "~/App/animations";
import { CloseButton, ModalContainer, ModalOverlay } from "~/App/Styled";
import { XCircle } from "~/App/components/icons/XCircle";
import { AnimatePresence } from "framer-motion";
import styled from "@emotion/styled";

const StyledButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #5d4037;
  color: white;
  outline: none;
  border: 0;
  cursor: pointer;
  border-radius: 2rem;
`;

const SecondaryButton = styled(StyledButton)`
  background: white;
  border: 1px solid rgba(93, 64, 55, 0.4);
  color: #5d4037;
`;

export const ConfirmationModal = () => {
  const [confirmationModalState, setConfirmationModalState] = useAtom(
    confirmationModalStateAtom
  );

  const { isVisible, onConfirm, onCancel, confirmText, cancelText } =
    confirmationModalState;

  const handleConfirm = () => {
    onConfirm();
    setConfirmationModalState((p) => ({ ...p, isVisible: false }));
  };

  const handleCancel = () => {
    onCancel?.();
    setConfirmationModalState((p) => ({ ...p, isVisible: false }));
  };

  const handleClickClose = () => {
    setConfirmationModalState((p) => ({ ...p, isVisible: false }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ModalOverlay {...Animations.OverlayVariants}>
          <ModalContainer {...Animations.ModalVariants}>
            <CloseButton onClick={handleClickClose}>
              <XCircle />
            </CloseButton>
            <h2>{confirmationModalState.title}</h2>
            <p>{confirmationModalState.content}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 32
              }}
            >
              {onCancel && (
                <SecondaryButton onClick={handleCancel}>
                  {cancelText}
                </SecondaryButton>
              )}
              <StyledButton onClick={handleConfirm}>{confirmText}</StyledButton>
            </div>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
