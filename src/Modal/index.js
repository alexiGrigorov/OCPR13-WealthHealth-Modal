import Modal from "./Modal";
import Dialog from "./Dialog";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";

// Attach compound slots
Modal.Dialog = Dialog;
Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.CloseButton = CloseButton;
Modal.Overlay = Overlay;

export default Modal;
