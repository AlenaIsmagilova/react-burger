import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Profile/Orders.module.css";
import { logOut } from "../../services/actions/authActions";
import FeedCard from "../../components/FeedCard/FeedCard";
import {
  WS_OWN_ORDERS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsActions";

const Orders = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((store) => store.userReducer.refreshToken);
  const orders = useSelector((store) => store.wsReducer.ownMessages);

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logOut(refreshToken));
  };

  useEffect(() => {
    dispatch({ type: WS_OWN_ORDERS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  if (orders.length === 0) return null;

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={`${styles.navLinkContainer}`}>
          <NavLink
            exact
            to="/profile"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            Профиль
          </NavLink>

          <NavLink
            exact
            to="/profile/orders"
            className={`${styles.navProfile} text text_type_main-small`}
            activeClassName={styles.activeNavProfile}
          >
            История заказов
          </NavLink>
          <NavLink
            exact
            to="/profile/exit"
            className={`${styles.navProfile} text text_type_main-small mb-20`}
            activeClassName={styles.activeNavProfile}
            onClick={onClick}
          >
            Выход
          </NavLink>
          <p className={`${styles.navProfile} text text_type_main-small`}>
            В этом разделе вы можете просмотреть свою историю заказов
          </p>
        </div>
      </div>
      <div className={`${styles.ordersContainer}`}>
        <ul className={styles.cardsList}>
          <div className={styles.wrapperForScroll}>
            {orders.map((order, index) => (
              <FeedCard order={order} key={`${order._id}${index}`} />
            ))}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Orders;
