import React from "react";
import { ClassNames, css as emotionCss } from "@emotion/react";
import ReactModal from "react-modal";


const modalClasses: ReactModal.Classes = {
  base: "content-base",
  afterOpen: "content-after",
  beforeClose: "content-before"
}

const modalOverlayClasses: ReactModal.Classes = {
  base: "overlay-base",
  afterOpen: "overlay-after",
  beforeClose: "overlay-before"
}


const Modal = ({ children, ...props }: ReactModal.Props) => {
  return (
    <ClassNames>
      {({ css }) => (
        <ReactModal
          {...props}
          overlayClassName={modalOverlayClasses}
          className={modalClasses}
          closeTimeoutMS={150}
          portalClassName={css`${portalStyles}`}
        >
          {children}
        </ReactModal>
      )}
    </ClassNames>
  );
}

const portalStyles = emotionCss`
.overlay-base {
  padding: 1rem;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
  transition-property: background-color, opacity;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.overlay-after {
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
}

.overlay-before {
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}

.content-base {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  margin: 0 auto;
  border: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 0%;
  width: 0%;
  background-color: transparent;
  transition-property: background-color, width, height;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.content-after {
  width: auto;
  height: auto;
  visibility: visible;
}

.content-before {
  visibility: hidden;
  background-color: transparent;
}
`


export default Modal;