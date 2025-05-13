/**
 * Modal.Body
 * Primary content container, with default padding.
 */
export default function Body({
  className = "",
  style = {},
  children,
  ...props
}) {
  return (
    <div className={className} style={style} {...props}>
      {children}
    </div>
  );
}
