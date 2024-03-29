import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../pages/Feed/Feed.module.css";
import { TIngredient, useSelector } from "../../utils/types";
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { TWsOrder } from "../../utils/types";
import { TIngredientItem } from "../BurgerIngredients/types";

interface IFeedCard {
  order: TWsOrder;
}

const FeedCard: FC<IFeedCard> = ({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );

  const getCreatedAt = (dirtyDate: string) => {
    return `${dayjs(dirtyDate)
      .format("[Сегодня, ]hh:mm, [i-GMT]Z")
      .toString()}`;
  };

  const uniqueIngredientIds = useMemo(
    () => Array.from(new Set(order.ingredients)),
    [order.ingredients]
  );

  const ingredientIcons = uniqueIngredientIds.map((ingredient) => {
    return {
      srcImage: ingredients.find((item) => item._id === ingredient)
        ?.image_mobile,
      name: ingredients.find((item) => item._id === ingredient)?.name,
      price: ingredients.find((item) => item._id === ingredient)?.price,
    };
  });

  const totalCost = useMemo(
    () =>
      (
        order?.ingredients.map((id) =>
          ingredients.find((item) => id === item._id)
        ) as TIngredientItem[]
      ).reduce(
        (sum: number, current: TIngredientItem): number => sum + current.price,
        0
      ),
    [ingredients, order?.ingredients]
  );

  return (
    <Link
      to={{
        pathname:
          location.pathname === "/feed"
            ? `feed/${order._id}`
            : `orders/${order._id}`,
        state: { background: location },
      }}
      className={styles.cardWrapper}
    >
      <li className={`${styles.cardItem} pt-6 pb-6 mr-2`}>
        <div className={`${styles.orderIdWrapper} pb-6`}>
          <p className={`${styles.orderId} text text_type_digits-default`}>
            #{order.number}
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {getCreatedAt(order.createdAt)}
          </p>
        </div>
        <p className={`${styles.orderTitle} text text_type_main-medium mb-6`}>
          {order.name}
        </p>
        <div className={styles.priceContainer}>
          <div className={styles.iconsContainer}>
            {ingredientIcons.map((icon, index, arr) => {
              return (
                <div
                  className={styles.iconWrapper}
                  key={index}
                  style={{ zIndex: arr.length - 1 - index }}
                >
                  <img
                    className={styles.image}
                    src={icon.srcImage}
                    alt={icon.name}
                  />
                </div>
              );
            })}
          </div>
          <div className={`${styles.totalCount} ml-6`}>
            <p className={`${styles.price} text text_type_digits-default mr-2`}>
              {totalCost}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
};

export default FeedCard;
