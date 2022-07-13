import React, { useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import Modal from "../Modal/Modal.js";
import OrderDetails from "../OrderDetails/OrderDetails.js";
import { Context } from "../Context/Context.js";
import { createOrderApi } from "../Api/ApiOrders.js";

const BurgerConstructor = () => {
  const [modalActive, setModalActive] = React.useState(false);
  const [order, setOrder] = React.useState(null);

  const ingredients = useContext(Context);

  const ingredientsIntoBurger = ingredients.filter(
    (ingredient) => ingredient.type === "sauce" || ingredient.type === "main"
  );

  const bunIngredientsOnly = ingredients.filter(
    (ingredient) => ingredient.type === "bun"
  );

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return {
          count: [...bunIngredientsOnly, ...ingredientsIntoBurger].reduce(
            (sum, current) => {
              return sum + current.price;
            },
            0
          ),
        };
      default:
        return state;
    }
  };

  const initialCount = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialCount);

  useEffect(() => {
    dispatch({ type: "add" });
  }, [ingredients]);

  if (ingredients.length === 0) return null;

  const handleClose = () => {
    setModalActive(false);
  };

  const prepareIngredientsId = ingredients.map((ingredient) => {
    return ingredient._id;
  });

  const handleOpen = () => {
    setModalActive(true);
    createOrderApi(prepareIngredientsId).then((data) => {
      setOrder(data.order.number);
    });
  };

  return (
    <div className={`mt-25 ml-10 ${styles.mainConstructorContainer}`}>
      <div className={`ml-8 pr-2 ${styles.burgerConstructorWrapper}`}>
        <ConstructorElement
          key={bunIngredientsOnly._id}
          type="top"
          isLocked={true}
          text={bunIngredientsOnly[1].name + " (верх)"}
          price={bunIngredientsOnly[1].price}
          thumbnail={bunIngredientsOnly[1].image}
        />
        <div className={styles.wrapperForScroll}>
          {ingredientsIntoBurger.map((ingredient) => (
            <React.Fragment key={ingredient._id}>
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
            </React.Fragment>
          ))}
        </div>
        <ConstructorElement
          key={bunIngredientsOnly._id}
          type="bottom"
          isLocked={true}
          text={bunIngredientsOnly[0].name + " (низ)"}
          price={bunIngredientsOnly[0].price}
          thumbnail={bunIngredientsOnly[0].image}
        />
      </div>
      <div className={`mt-10 mr-4 ${styles.orderWrapper}`}>
        <div className={`mr-10 ${styles.totalPriceWrapper}`}>
          <p className="text text_type_digits-medium mr-2">{state.count}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={() => handleOpen()}>
          Оформить заказ
        </Button>
        <Modal open={modalActive} handleClose={handleClose}>
          <OrderDetails orderNumber={order} />
        </Modal>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.array.isRequired,
};

export default BurgerConstructor;
