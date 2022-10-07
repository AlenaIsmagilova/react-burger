import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem";
import {
  SET_INGREDIENTS_ITEM_IN_MODAL,
  SET_NAV_INGREDIENTS,
  SET_INGREDIENTS_MODAL_ACTIVE,
} from "../../services/actions/actions";

const BurgerIngredients = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );

  const current = useSelector(
    (store) => store.burgerIngredientsReducer.currentIngredients
  );

  const sauceDivEl = useRef(null);
  const bunDivEl = useRef(null);
  const mainDivEl = useRef(null);

  const handleOpenModal = (ingredient) => {
    dispatch({ type: SET_INGREDIENTS_MODAL_ACTIVE });
    dispatch({ type: SET_INGREDIENTS_ITEM_IN_MODAL, payload: ingredient });
  };

  const onSauceTabClick = (value) => {
    dispatch({ type: SET_NAV_INGREDIENTS, payload: value });
    if (value === "Соусы") {
      sauceDivEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onBunTabClick = (value) => {
    dispatch({ type: SET_NAV_INGREDIENTS, payload: value });
    if (value === "Булки") {
      bunDivEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onMainTabClick = (value) => {
    dispatch({ type: SET_NAV_INGREDIENTS, payload: value });
    if (value === "Начинки") {
      mainDivEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tabsBlockEl = useRef(null);

  const tabsBlockOnScroll = () =>
    tabsBlockEl.current.getBoundingClientRect().bottom;

  const bunScroll = () => bunDivEl.current.getBoundingClientRect().top;
  const mainScroll = () => mainDivEl.current.getBoundingClientRect().top;
  const sauceScroll = () => sauceDivEl.current.getBoundingClientRect().top - 30;

  const handleScroll = () => {
    if (tabsBlockOnScroll() > bunScroll()) {
      dispatch({ type: SET_NAV_INGREDIENTS, payload: "Булки" });
    }

    if (tabsBlockOnScroll() > sauceScroll()) {
      dispatch({ type: SET_NAV_INGREDIENTS, payload: "Соусы" });
    }
    if (tabsBlockOnScroll() > mainScroll()) {
      dispatch({ type: SET_NAV_INGREDIENTS, payload: "Начинки" });
    }
  };
  const bunIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "bun"),
    [ingredients]
  );

  const sauceIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "sauce"),
    [ingredients]
  );

  const mainIngredients = useMemo(
    () => ingredients.filter((ingredient) => ingredient.type === "main"),
    [ingredients]
  );

  if (ingredients.length === 0) return null;

  return (
    <section className={styles.ingredientsContainer}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div ref={tabsBlockEl} className={styles.typeIndgredientWrapper}>
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
      <div className={styles.ingredientItemsContainer} onScroll={handleScroll}>
        <ul className={styles.ingredientItems}>
          <BurgerIngredientsItem
            filteredIngredients={bunIngredients}
            title="Булки"
            ref={bunDivEl}
            openModal={handleOpenModal}
          ></BurgerIngredientsItem>
          <BurgerIngredientsItem
            filteredIngredients={sauceIngredients}
            title="Соусы"
            ref={sauceDivEl}
            openModal={handleOpenModal}
          ></BurgerIngredientsItem>
          <BurgerIngredientsItem
            filteredIngredients={mainIngredients}
            title="Начинки"
            ref={mainDivEl}
            openModal={handleOpenModal}
          ></BurgerIngredientsItem>
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;
