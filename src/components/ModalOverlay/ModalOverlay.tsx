import PropTypes from "prop-types";
import { FC } from "react";
import styles from "../ModalOverlay/ModalOverlay.module.css";

interface IModalOverlay {
  onClick: () => void;
  children: React.ReactNode | undefined;
  className: string;
}

const ModalOverlay: FC<IModalOverlay> = ({ children, onClick, className }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClick}>
      {children}
    </div>
  );
};

// ModalOverlay.propTypes = {
//   onClick: PropTypes.func,
//   children: PropTypes.element.isRequired,
// };

export default ModalOverlay;
