import React from "react";
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import { API, checkResponse } from "../Api/Api.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import styles from "../../index.module.css";

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
          <BurgerConstructor ingredients={state} />
        </div>
      </main>
    </>
  );
};

export default App;
