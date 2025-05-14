# ocpr13-wealthhealth-modal

A reusable, unstyled React Modal component built on the native `<dialog>` element.  
Provides a flexible compound-component API and focus management without imposing any CSS opinion.

---

## Installation

```bash
# From npm registry
npm install @alexigrigorov/ocpr13-wealthhealth-modal
```

**Peer Dependencies**

- **react** `^19.1.0`
- **react-dom** `^19.1.0`

---

## Quick Start

1. **Add a portal container** to your HTML (e.g. `public/index.html`):

   ```html
   <body>
     <div id="root"></div>
     <div id="modal"></div>
     <!-- Required portal target -->
   </body>
   ```

2. **Use the Modal** in your React component:

   ```jsx
   import React, { useState } from "react";
   import { Modal } from "@alexigrigorov/ocpr13-wealthhealth-modal";

   function App() {
     const [isOpen, setIsOpen] = useState(false);

     return (
       <>
         <button onClick={() => setIsOpen(true)}>Open Modal</button>

         <Modal
           isOpen={isOpen}
           onClose={() => setIsOpen(false)}
           showCloseButton={true}
           disableBackdropClick={false}
           /* Any other <dialog> props: className, style, id, aria-* */
         >
           <Modal.Header>
             <h2>Modal Title</h2>
           </Modal.Header>

           <Modal.Body>
             <p>Your content goes here.</p>
           </Modal.Body>

           <Modal.Footer>
             <button onClick={() => setIsOpen(false)}>Close</button>
           </Modal.Footer>
         </Modal>
       </>
     );
   }
   ```

---

## API Reference

### `<Modal />` props

| Prop                   | Type         | Default | Description                                                                         |
| ---------------------- | ------------ | ------- | ----------------------------------------------------------------------------------- |
| `isOpen` _(required)_  | `boolean`    | —       | Control open state (`true` = open, `false` = closed).                               |
| `onClose` _(required)_ | `() => void` | —       | Called when the modal requests to close (ESC key, backdrop click, or close button). |
| `showCloseButton`      | `boolean`    | `true`  | Render a default `<Modal.CloseButton />` if you don’t provide one yourself.         |
| `disableBackdropClick` | `boolean`    | `false` | When `true`, clicking the backdrop does **not** trigger `onClose`.                  |
| _Other props_          | _various_    | —       | Forwarded to the underlying `<dialog>`: `className`, `style`, `id`, `aria-*`, etc.  |

#### Compound Slots

Nest these components inside `<Modal>`:

- **`<Modal.Header>`**  
  Renders a `<header>` container.  
  _Accepts_: `className`, `style`, and standard HTML props.

- **`<Modal.Body>`**  
  Renders a `<div>` for main content.  
  _Accepts_: `className`, `style`, and standard HTML props.

- **`<Modal.Footer>`**  
  Renders a `<footer>` for action buttons.  
  _Accepts_: `className`, `style`, and standard HTML props.

- **`<Modal.CloseButton>`**  
  A `<button>` wired to `onClose`. Default content is “×”, but you can override children.  
  _Accepts_: `onClick`, `aria-label`, `className`, etc.

- **`<Modal.Overlay>`**  
  Renders a `<div>` for custom backdrops (unstyled).  
  _Accepts_: `className`, `style`, and standard HTML props.

> **Note:** Any children not wrapped in a slot will render inside `<Modal.Body>` automatically.

---

## Accessibility

- Uses native `<dialog>` with `role="dialog"` and `aria-modal="true"`.
- **Focus Management**:
  - Saves the previously focused element.
  - Moves focus into the dialog on open.
  - Restores focus on close.
- **Keyboard**:
  - **ESC key** closes the modal.
  - **Backdrop click** closes the modal (unless `disableBackdropClick` is `true`).

---

## Styling

This component is **unstyled by design**. Apply your own CSS via `className` or `style`, for example:

```css
/* Example dialog style */
#modal dialog {
  padding: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Example overlay */
#modal .custom-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
```

---

## Usage Patterns & Edge Cases

1. **Orphan children auto-wrap**

   ```jsx
   <Modal isOpen onClose={...}>
     <p>This paragraph isn’t wrapped in `<Modal.Body>`.</p>
   </Modal>
   // Renders the paragraph inside Modal.Body automatically.
   ```

2. **Custom Backdrop**

   ```jsx
   <Modal isOpen onClose={...}>
     <Modal.Overlay className="fixed inset-0 bg-black/50 animate-fadeIn" />
     <Modal.Body>…</Modal.Body>
   </Modal>
   ```

3. **ARIA & ID props**

   ```jsx
   <Modal
     isOpen
     onClose={...}
     aria-labelledby="confirm-title"
     aria-describedby="confirm-desc"
   >
     <Modal.Header>
       <h2 id="confirm-title">Confirm Action</h2>
     </Modal.Header>
     <Modal.Body>
       <p id="confirm-desc">Are you sure you want to proceed?</p>
     </Modal.Body>
   </Modal>
   ```

4. **Scrollable Content**

   ```css
   .modal-body--scroll {
     max-height: 60vh;
     overflow-y: auto;
   }
   ```

   ```jsx
   <Modal isOpen onClose={...}>
     <Modal.Body className="modal-body--scroll">
       {/* Long form or list */}
     </Modal.Body>
   </Modal>
   ```

5. **Nested / Stacked Modals**

   - Ensure a single `#modal` portal target—or separate containers—and manage `z-index` in your CSS.

6. **Server-Side Rendering (SSR)**
   - On SSR, `document.getElementById("modal")` may be `null`; the component returns `null` until hydration.

---

## Building

```bash
git clone https://github.com/alexiGrigorov/OCPR13-WealthHealth-Modal.git
cd OCPR13-WealthHealth-Modal
npm install
npm run build
# Output in /dist
```

---

## Contributing

- **Issues & Discussions:**  
  https://github.com/alexiGrigorov/OCPR13-WealthHealth-Modal/issues
- **Pull Requests:** Welcome! Please follow existing code style and add tests where applicable.

---

## License

[ISC](LICENSE)
