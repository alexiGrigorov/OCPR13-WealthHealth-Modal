// src/components/Modal/Modal.js
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalContext from "./ModalContext";
import useModalSlots from "./useModalSlots";
import Dialog from "./Dialog";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";

function Modal({
  isOpen,
  onClose,
  showCloseButton = true,
  disableBackdropClick = false,
  children,
  ...dialogProps
}) {
  const dialogRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Detect which compound slots are present and collect orphans
  const {
    hasHeader,
    header,
    hasBody,
    body,
    hasFooter,
    footer,
    hasCloseButton,
    closeButton,
    hasOverlay,
    overlay,
    orphanChildren,
  } = useModalSlots(children);

  // Manage native <dialog> open/close and focus return
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      // Save the element that had focus
      previousActiveElement.current = document.activeElement;
      // Open if not already open
      if (!dialog.hasAttribute("open")) {
        dialog.showModal();
      }
      dialog.focus();
    } else {
      // Close if open
      if (dialog.hasAttribute("open")) {
        dialog.close();
      }
      // Restore focus
      if (previousActiveElement.current?.focus) {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen]);

  // Handle Esc key via the native 'cancel' event
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  // Backdrop-click-to-close
  const handleClick = (e) => {
    if (!disableBackdropClick && e.target === dialogRef.current) {
      onClose();
    }
  };

  // Decide which CloseButton(s) to render
  const renderCloseButton = () => {
    if (!showCloseButton) return null;
    if (hasCloseButton) return closeButton;
    return <CloseButton />;
  };

  // Decide where the body content goes
  const renderBody = () => {
    if (hasBody) return body;
    return <Body>{orphanChildren}</Body>;
  };

  // Build the <dialog> with its children
  const dialogContent = (
    <Dialog ref={dialogRef} onClick={handleClick} {...dialogProps}>
      {hasHeader && header}
      {renderCloseButton()}
      {renderBody()}
      {hasFooter && footer}
    </Dialog>
  );

  // Wrap in context and portal in #modal
  const portalContent = (
    <ModalContext.Provider
      value={{
        onClose,
        showCloseButton,
        disableBackdropClick,
      }}
    >
      {hasOverlay ? overlay : null}
      {dialogContent}
    </ModalContext.Provider>
  );

  const modalRoot = document.getElementById("modal");
  return modalRoot ? ReactDOM.createPortal(portalContent, modalRoot) : null;
}

export default Modal;
