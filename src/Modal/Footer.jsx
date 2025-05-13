/**
 * Modal.Footer
 * Action container with default top border and right-aligned items.
 */
export default function Footer({
  className = "",
  style = {},
  children,
  ...props
}) {
  return (
    <footer className={className} style={style} {...props}>
      {children}
    </footer>
  );
}
