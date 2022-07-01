import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "../modal/modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay.js";
import stylesForOverlay from "../modalOverlay/modalOverlay.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, open, handleClose }) => {
  const closeOnEscKey = (e) => (e.key === "Escape" ? handleClose() : null);

  useEffect(() => {
    console.log("useEffect");
    window.addEventListener("keydown", closeOnEscKey);

    return () => {
      window.removeEventListener("keydown", closeOnEscKey);
    };
  });

  return ReactDOM.createPortal(
    <>
      {open && (
        <ModalOverlay
          className={stylesForOverlay.modalOverlay}
          onClick={handleClose}
        >
          <div className={styles.modal}>
            <div className={styles.closeBtnWrapper} onClick={handleClose}>
              <h2 className={`text text_type_main-large ${styles.header}`}>
                Детали ингредиента
              </h2>
              <CloseIcon type="primary" />
            </div>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </ModalOverlay>
      )}
    </>,
    modalRoot
  );
};

export default Modal;
