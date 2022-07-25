import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import styles from "../../index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredientsItems } from "../../services/actions/actions.js";
import {
  ADD_INGREDIENT_IN_BURGER,
  ADD_BUN_IN_BURGER,
} from "../../services/actions/actions.js";

const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );

  //отправляю санки(экшн-функцию)
  useEffect(() => {
    dispatch(getBurgerIngredientsItems());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main>
          <div className={styles.mainContainer}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </DndProvider>
    </>
  );
};

export default App;
