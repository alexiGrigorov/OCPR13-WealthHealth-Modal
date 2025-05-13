/**
 * Modal.Header
 * Optional header slot. Wrap your <h2> or icons here.
 */
export default function Header({
  className = "",
  style = {},
  children,
  ...props
}) {
  return (
    <header className={className} style={style} {...props}>
      {children}
    </header>
  );
}
