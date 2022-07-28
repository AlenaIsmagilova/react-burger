import PropTypes from "prop-types";
import styles from "../ModalOverlay/ModalOverlay.module.css";

const ModalOverlay = ({ children, onClick }) => {
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
