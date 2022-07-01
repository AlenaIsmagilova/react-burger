import React, { useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import bun from "../../images/bun.svg";
import styles from "../burgerConstructor/burgerConstructor.module.css";
import modalStyles from "../modal/modal.module.css";
import Modal from "../modal/modal.js";
import OrderDetails from "../orderDetails/orderDetails.js";

const BurgerConstructor = ({ ingredients }) => {
  const [modalActive, setModalActive] = React.useState(false);
  const ingredientsIntoBurger = ingredients.filter(
    (ingredient) => ingredient.type === "sauce" || ingredient.type === "main"
  );

  const handleClose = () => {
    setModalActive(false);
  };

  return (
    <div className={`mt-25 ml-10 ${styles.mainConstructorContainer}`}>
      <div className={`ml-8 pr-2 ${styles.burgerConstructorWrapper}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bun}
        />
        {ingredientsIntoBurger.map((ingredient) => (
          <>
            <span className={styles.ingredientWrapper}>
              <div className="mr-3">
                <DragIcon type="primary" />
              </div>

              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              ></ConstructorElement>
            </span>
          </>
        ))}
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={bun}
        />
      </div>

      <div className={`mt-10 mr-4 ${styles.orderWrapper}`}>
        <div className={`mr-10 ${styles.totalPriceWrapper}`}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => setModalActive(true)}
        >
          Оформить заказ
        </Button>
        <Modal open={modalActive} handleClose={handleClose}>
          <OrderDetails />
        </Modal>
      </div>
    </div>
  );
};

export default BurgerConstructor;
