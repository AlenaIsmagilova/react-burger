import PropTypes from "prop-types";
import styles from "../modalOverlay/modalOverlay.module.css";

const ModalOverlay = ({ children, onClick }) => {
  // const closeOnOverlay = (e) => {
  //   console.log("kfjkldf");
  //   return e.currentTarget === e.target ? onClick() : null;
  // };

  // useEffect(() => {
  //   console.log("useEffect");
  //   window.addEventListener("click", closeOnOverlay);

  //   return () => {
  //     console.log("removeEventListener");
  //     window.removeEventListener("click", closeOnOverlay);
  //   };
  // }, [closeOnOverlay]);

  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};

export default ModalOverlay;
