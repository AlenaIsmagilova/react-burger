import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../Feed/Feed.module.css";

const Feed = () => {
  return (
    <>
      <div className={styles.mainContainer}>
        <h2 className={`${styles.title} text text_type_main-medium mb-6 mt-10`}>
          Лента заказов
        </h2>
        <div className={styles.containersWrapper}>
          <div className={`${styles.ordersContainer} mr-15`}>
            <ul className={styles.cardsList}>
              <li className={`${styles.cardItem} pt-6 pb-6`}>
                <div className={`${styles.orderIdWrapper} pb-6`}>
                  <p
                    className={`${styles.orderId} text text_type_digits-default`}
                  >
                    #034535
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    Сегодня, 16:20 i-GMT+3
                  </p>
                </div>
                <p
                  className={`${styles.orderTitle} text text_type_main-default mb-6`}
                >
                  Death Star Starship Main бургер
                </p>
                <div className={styles.priceContainer}>
                  <div className={styles.iconsWrapper}>
                    <img></img>
                  </div>
                  <div className={styles.totalCount}>
                    <p
                      className={`${styles.price} text text_type_digits-default mr-2`}
                    >
                      560
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
              <li className={`${styles.cardItem} pt-6 pb-6`}>
                <div className={`${styles.orderIdWrapper} pb-6`}>
                  <p
                    className={`${styles.orderId} text text_type_digits-default`}
                  >
                    #034534
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    Сегодня, 13:20 i-GMT+3
                  </p>
                </div>
                <p
                  className={`${styles.orderTitle} text text_type_main-default mb-6`}
                >
                  Interstellar бургер
                </p>
                <div className={styles.priceContainer}>
                  <div></div>
                  <div className={styles.totalCount}>
                    <p
                      className={`${styles.price} text text_type_digits-default mr-2`}
                    >
                      510
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
              <li className={`${styles.cardItem} pt-6 pb-6`}>
                <div className={`${styles.orderIdWrapper} pb-6`}>
                  <p
                    className={`${styles.orderId} text text_type_digits-default`}
                  >
                    #034533
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    Вчера, 13:50 i-GMT+3
                  </p>
                </div>
                <p
                  className={`${styles.orderTitle} text text_type_main-default mb-6`}
                >
                  Black Hole Singularity острый бургер
                </p>
                <div className={styles.priceContainer}>
                  <div></div>
                  <div className={styles.totalCount}>
                    <p
                      className={`${styles.price} text text_type_digits-default mr-2`}
                    >
                      330
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
              <li className={`${styles.cardItem} pt-6 pb-6`}>
                <div className={`${styles.orderIdWrapper} pb-6`}>
                  <p
                    className={`${styles.orderId} text text_type_digits-default`}
                  >
                    #034532
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    2 дня назад, 21:53 i-GMT+3
                  </p>
                </div>
                <p
                  className={`${styles.orderTitle} text text_type_main-default mb-6`}
                >
                  Supernova Infinity бургер
                </p>
                <div className={styles.priceContainer}>
                  <div></div>
                  <div className={styles.totalCount}>
                    <p
                      className={`${styles.price} text text_type_digits-default mr-2`}
                    >
                      450
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.statsContainer}>
            <h3>Готовы:</h3>
            <h3>В работе:</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;