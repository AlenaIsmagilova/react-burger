import styles from "../OrderDetails/OrderDetails.module.css";
import doneOrder from "../../images/done.svg";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { useSelector } from "../../utils/types";
import { FC } from "react";
import { TIngredientItem } from "../BurgerIngredients/types";

interface IOrderDetails {
  orderNumber: number;
}

const OrderDetails: FC<IOrderDetails> = (props) => {
  const isLoading = useSelector((store) => store.orderDetailsReducer.isLoading);
  const error = useSelector((store) => store.orderDetailsReducer.error);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>Упс, произошла ошибка. Попробуйте сделать заказ позже</p>
      ) : (
        <>
          <p className="text text_type_digits-large mt-30 ">
            {props.orderNumber}
          </p>
          <p className="text text_type_main-medium mt-8 mb-15">
            идентификатор заказа
          </p>
          <img className={styles.orderImage} src={doneOrder} alt="done"></img>
          <p className="text text_type_main-small mt-15 mb-2">
            Ваш заказ начали готовить
          </p>
          <p
            className={`text text_type_main-small mb-30 ${styles.orderConfirm}`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};

// OrderDetails.propTypes = {
//   orderNumber: PropTypes.number,
// };

export default OrderDetails;
