import React, { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredients.module.css";
import BurgerIngredientsItem from "../burgerIngredientsItem/burgerIngredientsItem.js";

const BurgerIngredients = ({ ingredients }) => {
  const [current, setCurrent] = useState("Булки");
  const sauceDivEl = useRef(null);
  const bunDivEl = useRef(null);
  const mainDivEl = useRef(null);

  const onSauceTabClick = (value) => {
    setCurrent(value);
    if (value === "Соусы") {
      sauceDivEl.current.scrollIntoView();
    }
  };

  const onBunTabClick = (value) => {
    setCurrent(value);
    if (value === "Булки") {
      bunDivEl.current.scrollIntoView();
    }
  };

  const onMainTabClick = (value) => {
    setCurrent(value);
    if (value === "Начинки") {
      mainDivEl.current.scrollIntoView();
    }
  };

  const bunIngredients = ingredients.filter(
    (ingredient) => ingredient.type === "bun"
  );
  const sauceIngredients = ingredients.filter(
    (ingredient) => ingredient.type === "sauce"
  );
  const mainIngredients = ingredients.filter(
    (ingredient) => ingredient.type === "main"
  );

  if (ingredients.length === 0) return null;

  return (
    <section className={styles.ingredientsContainer}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div style={{ display: "flex" }}>
        <Tab value="Булки" active={current === "Булки"} onClick={onBunTabClick}>
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={onSauceTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={onMainTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.ingredientItemsContainer}>
        <ul className={styles.ingredientItems}>
          <BurgerIngredientsItem
            filteredIngredients={bunIngredients}
            title="Булки"
            ref={bunDivEl}
          ></BurgerIngredientsItem>
          <BurgerIngredientsItem
            filteredIngredients={sauceIngredients}
            title="Соусы"
            ref={sauceDivEl}
          ></BurgerIngredientsItem>
          <BurgerIngredientsItem
            filteredIngredients={mainIngredients}
            title="Начинки"
            ref={mainDivEl}
          ></BurgerIngredientsItem>
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
