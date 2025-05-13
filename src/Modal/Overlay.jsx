/**
 * Modal.Overlay
 * Optional backdrop slot. Unstyled by default.
 */
export default function Overlay({ className = "", style = {}, ...props }) {
  return <div className={className} style={style} {...props} />;
}
