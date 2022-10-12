import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../utils/types";
import styles from "../Feed/Feed.module.css";
import FeedCard from "../../components/FeedCard/FeedCard";
import { wsActions } from "../../services/actions/wsActions";

const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsReducer.messages);
  const total = useSelector((store) => store.wsReducer.total);
  const totalToday = useSelector((store) => store.wsReducer.totalToday);

  useEffect(() => {
    dispatch({
      type: wsActions.wsStart,
      payload: "wss://norma.nomoreparties.space/orders/all",
    });
    return () => {
      dispatch({ type: wsActions.wsClosed });
    };
  }, [dispatch]);

  if (orders.length === 0) return null;

  return (
    <>
      <div className={styles.mainContainer}>
        <h2 className={`${styles.title} text text_type_main-medium mb-6 mt-10`}>
          Лента заказов
        </h2>
        <div className={styles.containersWrapper}>
          <div className={`${styles.ordersContainer} mr-15`}>
            <ul className={styles.cardsList}>
              <div className={styles.wrapperForScroll}>
                {orders.map((order) => (
                  <FeedCard order={order} key={order._id} />
                ))}
              </div>
            </ul>
          </div>
          <div>
            <div className={`${styles.statsContainer} mb-15`}>
              <div className={`${styles.doneOrders} mr-9`}>
                <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
                <ul className={styles.doneOrdersWrapper}>
                  {orders
                    .filter((item) => item.status === "done")
                    .map((order) => (
                      <li
                        key={order._id}
                        className={`${styles.doneOrderNumber} text text_type_digits-default`}
                      >
                        {order.number}
                      </li>
                    ))}
                </ul>
              </div>
              <div className={styles.onTheGoOrders}>
                <h3 className="text text_type_main-medium mb-6">В работе:</h3>
                {orders
                  .filter((item) => item.status === "pending")
                  .map((order) => (
                    <li
                      key={order._id}
                      className={`${styles.inWorkOrderNumber} text text_type_digits-default`}
                    >
                      {order.number}
                    </li>
                  ))}
              </div>
            </div>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p
              className={`${styles.ordersNumber} text text_type_digits-medium mb-15`}
            >
              {total}
            </p>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p
              className={`${styles.ordersNumber} text text_type_digits-medium mb-15`}
            >
              {totalToday}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
