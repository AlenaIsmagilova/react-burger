import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";
import styles from "../Feed/Feed.module.css";
import FeedCard from "../../components/FeedCard/FeedCard";

const Feed = () => {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsReducer.messages);
  const total = useSelector((store) => store.wsReducer.total);
  const totalToday = useSelector((store) => store.wsReducer.totalToday);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
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
                {orders.map((order, index) => (
                  <FeedCard order={order} key={`${order._id}${index}`} />
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
                    .map((order, index) => (
                      <li
                        key={index}
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
                  .map((order, index) => (
                    <li
                      key={index}
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
