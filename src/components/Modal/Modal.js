import { useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styles from "../Modal/Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay.js";
import stylesForOverlay from "../ModalOverlay/ModalOverlay.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, handleClose, title }) => {
  const closeOnEscKey = (e) => (e.key === "Escape" ? handleClose() : null);

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscKey);
    return () => {
      window.removeEventListener("keydown", closeOnEscKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      (
      <ModalOverlay
        className={stylesForOverlay.modalOverlay}
        onClick={handleClose}
      >
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.closeBtnWrapper} onClick={handleClose}>
            {title && (
              <h2 className={`text text_type_main-large ${styles.header}`}>
                {title}
              </h2>
            )}
            <CloseIcon type="primary" />
          </div>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </ModalOverlay>
      )
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  title: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default Modal;
