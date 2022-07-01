import React, { forwardRef } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../burgerIngredientsItem/burgerIngredientsItem.module.css";
import Modal from "../modal/modal.js";
import IngredientDetails from "../ingredientDetails/ingredientDetails.js";

const BurgerIngredientsItem = forwardRef(
  ({ filteredIngredients, title }, ref) => {
    const [modalActive, setModalActive] = React.useState(false);
    const [currentIngredient, setCurrentIngredient] = React.useState({});

    const handleClick = (ingredient) => {
      setModalActive(true);
      setCurrentIngredient(ingredient);
    };

    return (
      <>
        <li>
          <h2
            className={`mt-2 mb-6 text text_type_main-medium ${styles.categoryTitle}`}
            ref={ref}
          >
            {title}
          </h2>
          <ul className={styles.ingredientItems}>
            {filteredIngredients.map((ingredient) => (
              <li
                className={`mb-8 ${styles.ingredientContainer}`}
                key={ingredient.id}
                onClick={function () {
                  handleClick(ingredient);
                }}
              >
                <Counter count={1} size="default" />
                <img
                  className={`ml-4 ${styles.burgerIngredientsItemImage}`}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
                <div className={styles.priceWrapper}>
                  <p className="mt-1 mb-1 mr-2 text text_type_digits-default">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>

                <h3
                  className={`text text_type_main-small ${styles.ingredientName}`}
                >
                  {ingredient.name}
                </h3>
              </li>
            ))}
          </ul>
        </li>
        <Modal open={modalActive} handleClose={() => setModalActive(false)}>
          <IngredientDetails currIngr={currentIngredient} />
        </Modal>
      </>
    );
  }
);

export default BurgerIngredientsItem;
