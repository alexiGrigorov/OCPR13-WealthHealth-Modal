import { createContext } from "react";

const ModalContext = createContext({
  // Called by slot components on mount to register their presence
  registerSlot: () => {},
  // Controls whether any CloseButton is rendered
  showCloseButton: true,
  // Controls whether backdrop clicks invoke onClose
  disableBackdropClick: false,
  // Callback to close the modal
  onClose: () => {},
});

export default ModalContext;
