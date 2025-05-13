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

  // Default top-right placement with 1em margin
  const defaultStyle = {
    display: "block",
    marginInlineStart: "var(--modal-close-button-margin-inline-start, auto)",
    marginBlockEnd: "var(--modal-close-button-margin-block-end, 1em)",
  };
  const combinedStyle = { ...defaultStyle, ...style };

  return (
    <button
      type="button"
      onClick={onClick || onClose}
      aria-label={ariaLabel || "Close dialog"}
      className={className}
      style={combinedStyle}
      {...props}
    >
      {children || "×"}
    </button>
  );
}
