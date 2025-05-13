import { useContext, forwardRef } from "react";
import ModalContext from "./ModalContext";

/**
 * Modal.Dialog
 * Wraps a native <dialog> element, applies default styling,
 * ARIA attributes, and forwards all props.
 */
const Dialog = forwardRef(function Dialog(
  { className = "", style = {}, children, ...props },
  ref,
) {
  const { disableBackdropClick } = useContext(ModalContext);

  return (
    <dialog
      role="dialog"
      aria-modal="true"
      className={className}
      style={style}
      ref={ref}
      {...props}
    >
      {children}
    </dialog>
  );
});

export default Dialog;
