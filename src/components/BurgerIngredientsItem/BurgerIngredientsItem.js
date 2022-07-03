import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../BurgerIngredientsItem/BurgerIngredientsItem.module.css";

const BurgerIngredientsItem = forwardRef(
  ({ filteredIngredients, title, openModal }, ref) => {
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
                key={ingredient._id}
                className={`mb-8 ${styles.ingredientContainer}`}
                onClick={function () {
                  console.log("winner");
                  openModal(ingredient);
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
      </>
    );
  }
);

BurgerIngredientsItem.propTypes = {
  filteredIngredients: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default BurgerIngredientsItem;
