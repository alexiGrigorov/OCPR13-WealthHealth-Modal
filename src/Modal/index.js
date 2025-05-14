import Modal from "./Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";

// Attach compound slots
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.CloseButton = CloseButton;
Modal.Overlay = Overlay;

export default Modal;
