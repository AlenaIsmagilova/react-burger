import { forwardRef } from "react";
import styles from "../BurgerIngredientsItem/BurgerIngredientsItem.module.css";
import BurgerIngredientCard from "../BurgerIngredientCard/BurgerIngredientCard";
import { TIngredient } from "../BurgerConstructor/types";
import { TIngredientItem } from "../BurgerIngredients/types";

interface IBurgerIngredientsItem {
  filteredIngredients: TIngredientItem[];
  title: string;
  openModal: (ingredient: TIngredientItem) => void;
}

const BurgerIngredientsItem = forwardRef<
  HTMLHeadingElement,
  IBurgerIngredientsItem
>(({ filteredIngredients, title, openModal }, ref) => {
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
          {filteredIngredients.map(
            (ingredient: TIngredientItem, index: number) => (
              <BurgerIngredientCard
                key={ingredient._id}
                ingredient={ingredient}
                openModal={openModal}
              />
            )
          )}
        </ul>
      </li>
    </>
  );
});

// BurgerIngredientsItem.propTypes = {
//   filteredIngredients: PropTypes.array.isRequired,
//   title: PropTypes.string,
//   openModal: PropTypes.func,
// };

export default BurgerIngredientsItem;
