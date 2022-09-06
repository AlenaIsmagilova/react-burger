import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Profile/Orders.module.css";
import { logOut } from "../../services/actions/authActions";
import FeedCard from "../../components/FeedCard/FeedCard";
import { wsActions } from "../../services/actions/wsActions";
import { getCookie } from "../../utils/helpers";

const Orders = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((store) => store.userReducer.refreshToken);
  const orders = useSelector((store) => store.wsReducer.ownMessages);
  const clearToken = getCookie("accessToken").replace("Bearer ", "");

  const onClick = (e) => {
    e.preventDefault();
    dispatch(logOut(refreshToken));
  };

  useEffect(() => {
    dispatch({
      type: wsActions.wsWithTokenStart,
      payload: `wss://norma.nomoreparties.space/orders?token=${clearToken}`,
    });
    return () => {
      dispatch({ type: wsActions.wsClosed });
    };
  }, [dispatch, clearToken]);

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
            {orders
              .map((order) => <FeedCard order={order} key={order._id} />)
              .reverse()}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Orders;
