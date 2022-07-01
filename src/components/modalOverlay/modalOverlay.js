import { useEffect } from "react";
import styles from "../modalOverlay/modalOverlay.module.css";

const ModalOverlay = ({ children, close }) => {
  const closeOnOverlay = (e) => (e.currentTarget === e.target ? close() : null);

  useEffect(() => {
    console.log("useEffect");
    window.addEventListener("click", closeOnOverlay);

    return () => {
      window.removeEventListener("click", closeOnOverlay);
    };
  }, [closeOnOverlay]);

  return (
    <div className={styles.modalOverlay} onClick={close}>
      {children}
    </div>
  );
};

export default ModalOverlay;
