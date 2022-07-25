import { forwardRef } from "react";
import PropTypes from "prop-types";
import styles from "../BurgerIngredientsItem/BurgerIngredientsItem.module.css";
import BurgerIngredientCard from "../BurgerIngredientCard/BurgerIngredientCard.js";

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
            {filteredIngredients.map((ingredient, index) => (
              <BurgerIngredientCard
                key={`${index}${ingredient._id}`}
                ingredient={ingredient}
                openModal={openModal}
              />
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
