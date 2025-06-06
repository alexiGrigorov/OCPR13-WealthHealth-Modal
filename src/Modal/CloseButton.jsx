import { useContext } from "react";
import ModalContext from "./ModalContext";

/**
 * Modal.CloseButton
 * Renders a button that calls onClose from context (or its own onClick).
 * Default content is "×", but children can override.
 */
export default function CloseButton({
  className = "",
  style = {},
  children,
  onClick,
  "aria-label": ariaLabel,
  ...props
}) {
  const { onClose } = useContext(ModalContext);

  return (
    <button
      type="button"
      onClick={onClick || onClose}
      aria-label={ariaLabel || "Close dialog"}
      className={className}
      style={style}
      {...props}
    >
      {children || "×"}
    </button>
  );
}
