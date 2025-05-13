**1. Document Control**  
**Title:** Modal Component Software Requirements Specification  
**Author:** AI Engineering Assistant  
**Date:** 2025-05-13  
**Version:** 1.0  

---

**2. Purpose**  
Define the functional and non‑functional requirements for a reusable React Modal component, based on HTML `<dialog>` and React Portals, designed for modern browsers and highly configurable via a compound-component API.

---

**3. Scope**  
This document specifies the behavior, API, and design constraints for a single React component library artifact: `<Modal>`, including its subcomponents (`Modal.Dialog`, `Modal.Header`, `Modal.Body`, `Modal.Footer`, `Modal.CloseButton`, `Modal.Overlay`). It does not cover styling beyond minimal defaults, nor integration with specific state‑management or animation libraries.

---

**4. Definitions & Abbreviations**  
- **FRS**: Functional Requirements Specification  
- **NFR**: Non‑Functional Requirement  
- **Slot**: A compound‑component subcomponent (e.g. `Modal.Header`)  
- **Consumer**: A developer using the Modal component library  

---

**5. Design Constraints & Assumptions**  
- Target: Modern browsers with native support for HTML `<dialog>`  
- No built-in polyfills or animations shipped  
- Styling based on Tailwind CSS utilities by default; consumers may override via `className` or CSS  
- React ≥17 and ReactDOM Portals available  

---

**6. Overall Description**  
Users of the component library need a flexible, accessible modal/dialog implementation. The component must be easy to drop into varied projects, allow full visual customization, and enforce common accessibility patterns (focus trapping, ARIA roles). Control over open/close state should reside in the parent (controlled pattern) to integrate with business logic and state stores.

---

**7. Functional Requirements**  

| ID   | Requirement                                                                                                                                                    | Priority | Notes                                                                                                                             |
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------------------|
| FR1  | **Controlled Visibility**: `<Modal>` accepts `isOpen: boolean` and `onClose: () => void`; parent toggles `isOpen`.                                                | High     |                                                                                                                                    |
| FR2  | **Close Button Toggle**: `<Modal>` prop `showCloseButton?: boolean` (default `true`) globally enables/disables rendering of `Modal.CloseButton`.                 | High     | Overrides both default and consumer‑provided slot.                                                                                 |
| FR3  | **Backdrop-Click**: By default clicking outside the dialog invokes `onClose`. Configurable via `disableBackdropClick?: boolean` (default `false`).              | High     |                                                                                                                                    |
| FR4  | **Escape Key**: Pressing `Esc` within the dialog invokes `onClose` (leveraging `<dialog>`’s `cancel` event).                                                  | High     |                                                                                                                                    |
| FR5  | **Compound Slots**: Export subcomponents on `Modal`:                                                                                                           | High     |                                                                                                                                    |
|      | • `Modal.Dialog` — wraps native `<dialog>` and handles portal logic                                                                                             |          |                                                                                                                                    |
|      | • `Modal.Header` — optional slot for header content                                                                                                             |          |                                                                                                                                    |
|      | • `Modal.Body` — primary content container                                                                                                                      |          |                                                                                                                                    |
|      | • `Modal.Footer` — container for action controls                                                                                                                |          |                                                                                                                                    |
|      | • `Modal.CloseButton` — dismissal control; default renders “×”; accepts children for custom content                                                            |          |                                                                                                                                    |
|      | • `Modal.Overlay` — optional slot for backdrop; if omitted, use default `<dialog>` backdrop.                                                                  |          | Supports custom overlays when provided.                                                                                            |
| FR6  | **Default Injection**:                                                                                                                                        | Medium   |                                                                                                                                    |
|      | • If consumer omits `<Modal.CloseButton>` and `showCloseButton===true`, inject default close button.                                                           |          |                                                                                                                                    |
|      | • If consumer includes `<Modal.CloseButton>`, render only the provided slot.                                                                                   |          |                                                                                                                                    |
|      | • Partition children into subcomponent slots vs. "orphans".                                                                                                   |          |                                                                                                                                    |
|      | • If no `<Modal.Body>` slot present, wrap orphan children in default `<Modal.Body>`.                                                                            |          |                                                                                                                                    |
| FR7  | **Portal Rendering**: All slots render inside a React Portal targeting a DOM node `<div id="modal">` sibling to `<div id="root">`.                           | High     |                                                                                                                                    |
| FR8  | **Overlay Behavior**:                                                                                                                                        | Medium   |                                                                                                                                    |
|      | • Default: `<dialog>`’s native backdrop style (e.g. via `::backdrop`) enabled; consumers can override CSS.                                                       |          |                                                                                                                                    |
|      | • If `<Modal.Overlay>` present, disable default backdrop and render custom overlay before `Modal.Dialog`.                                                     |          |                                                                                                                                    |
| FR9  | **Styling Overrides**: Each slot accepts `className` and `style` props; all additional HTML attributes forwarded via props.                                     | High     | Enables full consumer control.                                                                                                     |
| FR10 | **ARIA & Accessibility**:                                                                                                                                    | High     |                                                                                                                                    |
|      | • `Modal.Dialog` applies `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`/`aria-describedby` props if provided.                                   |          |                                                                                                                                    |
|      | • `Modal.CloseButton` defaults to `aria-label="Close dialog"` if none provided.                                                                              |          |                                                                                                                                    |
|      | • Focus trapping via native `<dialog>` in supported browsers.                                                                                                   |          | Document polyfill or focus-trap recommendations for non-supporting environments.                                                    |

---

**8. Non‑Functional Requirements**  

| Category           | Requirement                                                                                                              | Rationale                                                   |
|--------------------|--------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| Accessibility      | Component must meet WCAG 2.1 AA: focus order, keyboard operability, ARIA roles/labels.                                | Crucial for accessibility compliance.                       |
| Performance        | Minimal render overhead; mounting/unmounting only when `isOpen` toggles; no extra dependencies or polyfills included. | Keeps bundle size small and runtime fast.                   |
| Styling            | Minimal default Tailwind CSS utility classes; consumers override via `className` or external stylesheets.             | Supports design-system theming.                             |
| Compatibility      | Supported browsers: latest Chrome, Firefox, Edge, Safari (mobile & desktop).                                           | Per modern-only strategy.                                   |
| Maintainability    | Use TypeScript for type-safety; modular code per slot; comprehensive unit tests targeting slot logic and event flows. | Ensures long‑term code quality.                             |

---

**9. API Summary**  

\`\`\`ts
// Modal root
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  showCloseButton?: boolean;            // default true
  disableBackdropClick?: boolean;       // default false
  children?: React.ReactNode;           // orphan nodes if no <Modal.Body>
  // ARIA
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Compound slots
interface ModalDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  className?: string;
  style?: React.CSSProperties;
}
interface ModalHeaderProps extends React.HTMLAttributes<HTMLElement> { }
interface ModalBodyProps extends React.HTMLAttributes<HTMLElement> { }
interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> { }
interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> { }

// Exports
Modal: React.FC<ModalProps> & {
  Dialog: React.FC<ModalDialogProps>;
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
  CloseButton: React.FC<ModalCloseButtonProps>;
  Overlay: React.FC<ModalOverlayProps>;
};
\`\`\`

---

**10. Open Questions / Decisions**  
- **Focus Return**: The Modal will **automatically return focus** to the element that opened it upon close. Internally, it will store \`document.activeElement\` when opening and restore focus in the \`onClose\` cleanup.  
- **Rapid Toggle Handling**: The component will idempotently handle quick \`isOpen\` toggles. On mount or \`isOpen\` change:  
  - If \`isOpen === true\` and dialog is not open, call \`dialog.showModal()\`.  
  - If \`isOpen === false\` and dialog is open, call \`dialog.close()\`.  
  This ensures correct state even under rapid toggles.  
- **Deep Prop Forwarding**: All additional props (including event handlers like \`onAnimationEnd\`, \`onClick\`, etc.) passed to compound slots (\`Modal.Dialog\`, \`Modal.Header\`, etc.) will be **spread** onto their underlying DOM elements, allowing consumers to attach any necessary handlers.  
