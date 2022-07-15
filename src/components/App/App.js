import React from "react";
import AppHeader from "../AppHeader/AppHeader.js";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.js";
import { API, checkResponse } from "../../utils/Api/Api.js";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.js";
import styles from "../../index.module.css";
import { Context } from "../../services/Context.js";

const App = () => {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    const getBurgerData = async () => {
      try {
        const res = await fetch(API.baseUrl);
        const data = await checkResponse(res);
        setIngredients(data.data);
      } catch (error) {
        console.error("error in getBurgerData", error);
      }
    };

    getBurgerData();
  }, []);

  return (
    <>
      <AppHeader />
      <Context.Provider value={ingredients}>
        <main>
          <div className={styles.mainContainer}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </Context.Provider>
    </>
  );
};

export default App;
