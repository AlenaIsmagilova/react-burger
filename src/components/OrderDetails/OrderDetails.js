import styles from "../OrderDetails/OrderDetails.module.css";
import doneOrder from "../../images/done.svg";

const OrderDetails = () => {
  return (
    <>
      <p className="text text_type_digits-large mt-30 ">034536</p>
      <p className="text text_type_main-medium mt-8 mb-15">
        идентификатор заказа
      </p>
      <img className={styles.orderImage} src={doneOrder}></img>
      <p className="text text_type_main-small mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`text text_type_main-small mb-30 ${styles.orderConfirm}`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
