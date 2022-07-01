import React from "react";
import AppHeader from "./components/appHeader/appHeader.js";
import BurgerIngredients from "./components/burgerIngredients/burgerIngredients.js";
import { API, checkResponse } from "./components/api/api.js";
import BurgerConstructor from "./components/burgerConstructor/burgerConstructor.js";
import styles from "../src/index.module.css";

const App = () => {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    const getBurgerData = async () => {
      try {
        const res = await fetch(API.baseUrl);
        const data = await checkResponse(res);
        setState(data.data);
      } catch (error) {
        console.error("error in getBurgerData", error);
      }
    };

    getBurgerData();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <div className={styles.mainContainer}>
          <BurgerIngredients ingredients={state} />
          <BurgerConstructor ingredients={state}></BurgerConstructor>
        </div>
      </main>
    </>
  );
};

export default App;
