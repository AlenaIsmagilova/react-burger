import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../FeedDetails/FeedDetails.module.css";
import { wsActions } from "../../services/actions/wsActions";
import { getCookie } from "../../utils/helpers";

const FeedDetails = () => {
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const profileRoute = "/profile/orders/:id";
  const feedRoute = "/feed/:id";
  const clearToken = getCookie("accessToken").replace("Bearer ", "");

  const allOrders = useSelector((store) => store.wsReducer.messages);
  const ownOrders = useSelector((store) => store.wsReducer.ownMessages);
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );

  const orders = match.path === profileRoute ? ownOrders : allOrders;
  const currentOrder = useMemo(() =>
    orders.find((item) => {
      return item._id === params.id;
    })
  );

  useEffect(() => {
    if (history.action === "POP")
      history.replace({ pathname: location.pathname });
    if (!currentOrder) {
      if (match.path === profileRoute) {
        dispatch({
          type: wsActions.wsWithTokenStart,
          payload: `wss://norma.nomoreparties.space/orders?token=${clearToken}`,
        });
      } else if (match.path === feedRoute) {
        dispatch({
          type: wsActions.wsStart,
          payload: "wss://norma.nomoreparties.space/orders/all",
        });
      }
      return () => {
        dispatch({ type: wsActions.wsClosed });
      };
    }
  }, [
    dispatch,
    history,
    location.pathname,
    match.path,
    currentOrder,
    clearToken,
  ]);

  const getCreatedAt = (dirtyDate) => {
    return `${dayjs(dirtyDate)
      .format("[Сегодня, ]hh:mm, [i-GMT]Z")
      .toString()}`;
  };

  const orderStatus = () => {
    if (currentOrder.status === "done") {
      return "Выполнен";
    } else {
      return "В работе";
    }
  };

  const uniqueIngredientIds = useMemo(
    () => Array.from(new Set(currentOrder?.ingredients)),
    [orders]
  );

  const ingredientDesc = useMemo(() =>
    uniqueIngredientIds.map((ingredientId) => {
      const { image_mobile, name, price, type } = ingredients.find(
        (item) => item._id === ingredientId
      );
      return {
        srcImage: image_mobile,
        name: name,
        id: ingredientId,
        price: price,
        type: type,
      };
    })
  );

  const quantityOfIngredient = (ingredient) => {
    return currentOrder.ingredients.filter((item) => {
      return item === ingredient.id;
    }).length;
  };

  const totalCost = useMemo(() =>
    currentOrder?.ingredients
      .map((id) => ingredients.find((item) => id === item._id))
      .reduce((sum, current) => sum + current.price, 0)
  );

  if (!currentOrder) return null;
  if (!ingredients) return null;

  return (
    <div className={styles.mainContainer}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default mb-10`}
      >
        #{currentOrder.number}
      </p>
      <h3
        className={`${styles.currentOrderName} text text_type_main-medium mb-3`}
      >
        {currentOrder.name}
      </h3>
      <p className={`${styles.orderStatus} text text_type_main-default mb-15`}>
        {orderStatus()}
      </p>

      <div className={styles.ordersWrapper}>
        <div className={styles.ingredientContainer}>
          <p
            className={`${styles.titleNutrition} text text_type_main-medium mb-6`}
          >
            Состав:
          </p>
          <ul className={styles.wrapperForScroll}>
            {ingredientDesc.map((item, index) => {
              return (
                <li
                  key={`${index}${params.id}`}
                  className={styles.ingredientWrapper}
                >
                  <div className={styles.iconAndNameWrapper}>
                    <div className={styles.iconWrapper}>
                      <img
                        className={`${styles.image} mr-4`}
                        src={item.srcImage}
                        alt={item.name}
                      />
                    </div>
                    <p
                      className={`${styles.ingredientName} text text_type_main-small pl-4`}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className={styles.costWrapper}>
                    <p className="text text_type_digits-default pr-2">
                      {quantityOfIngredient(item)}
                      &nbsp;x&nbsp;{item.price}
                    </p>
                    <CurrencyIcon />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.totalContainer}>
            <p className="text text_type_main-default text_color_inactive">
              {getCreatedAt(currentOrder.createdAt)}
            </p>
            <div className={`${styles.totalCount} ml-6`}>
              <p
                className={`${styles.price} text text_type_digits-default mr-2`}
              >
                {totalCost}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
