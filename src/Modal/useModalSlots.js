import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import CloseButton from "./CloseButton";
import Overlay from "./Overlay";

/**
 * Parses children to detect which Modal slots are present,
 * and collects any orphan nodes.
 *
 * @param {React.ReactNode} children
 * @returns {{
 *   hasHeader: boolean,
 *   header: React.ReactElement[],
 *   hasBody: boolean,
 *   body: React.ReactElement[],
 *   hasFooter: boolean,
 *   footer: React.ReactElement[],
 *   hasCloseButton: boolean,
 *   closeButton: React.ReactElement[],
 *   hasOverlay: boolean,
 *   overlay: React.ReactElement[],
 *   orphanChildren: React.ReactNode[],
 * }}
 */
export default function useModalSlots(children) {
  const slots = {
    header: [],
    body: [],
    footer: [],
    closeButton: [],
    overlay: [],
    others: [],
  };

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      slots.others.push(child);
    } else if (child.type === Header) {
      slots.header.push(child);
    } else if (child.type === Body) {
      slots.body.push(child);
    } else if (child.type === Footer) {
      slots.footer.push(child);
    } else if (child.type === CloseButton) {
      slots.closeButton.push(child);
    } else if (child.type === Overlay) {
      slots.overlay.push(child);
    } else {
      slots.others.push(child);
    }
  });

  return {
    hasHeader: slots.header.length > 0,
    header: slots.header,
    hasBody: slots.body.length > 0,
    body: slots.body,
    hasFooter: slots.footer.length > 0,
    footer: slots.footer,
    hasCloseButton: slots.closeButton.length > 0,
    closeButton: slots.closeButton,
    hasOverlay: slots.overlay.length > 0,
    overlay: slots.overlay,
    orphanChildren: slots.others,
  };
}
