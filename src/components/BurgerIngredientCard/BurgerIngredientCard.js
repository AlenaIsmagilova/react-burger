import styles from "../BurgerIngredientsItem/BurgerIngredientsItem.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredientCard = ({ ingredient, openModal }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const currentIngredientInBurger = useSelector(
    (store) => store.burgerConstructorReducer.currentIngredientIntoBurgerItems
  );

  const currentBunInBurger = useSelector(
    (store) => store.burgerConstructorReducer.bunInrgedientsOnly
  );

  const numberOfAddedIngredientsInBurger = currentIngredientInBurger.filter(
    (item) => item._id === ingredient._id
  ).length;

  const setCounter = () => {
    if (
      ingredient.type === "bun" &&
      currentBunInBurger.hasOwnProperty("type") &&
      ingredient._id === currentBunInBurger._id
    ) {
      return 2;
    }
    if (ingredient.type === "main" || ingredient.type === "sauce") {
      return numberOfAddedIngredientsInBurger;
    }
  };

  return (
    <li
      key={ingredient._id}
      ref={dragRef}
      className={`mb-8 ${styles.ingredientContainer}`}
      onClick={function () {
        openModal(ingredient);
      }}
    >
      {setCounter() > 0 && <Counter count={setCounter()} size="default" />}
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

      <h3 className={`text text_type_main-small ${styles.ingredientName}`}>
        {ingredient.name}
      </h3>
    </li>
  );
};

export default BurgerIngredientCard;
