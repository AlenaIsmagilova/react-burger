import { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import BurgerIngredientsItem from "../BurgerIngredientsItem/BurgerIngredientsItem.js";
import Modal from "../Modal/Modal.js";
import IngredientDetails from "../IngredientDetails/IngredientDetails.js";
import { Context } from "../Context/Context.js";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Булки");

  const ingredients = useContext(Context);

  const [modalActive, setModalActive] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  const sauceDivEl = useRef(null);
  const bunDivEl = useRef(null);
  const mainDivEl = useRef(null);

  const handleOpenModal = (ingredient) => {
    setModalActive(true);
    setCurrentIngredient(ingredient);
  };

  const onSauceTabClick = (value) => {
    setCurrent(value);
    if (value === "Соусы") {
      sauceDivEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onBunTabClick = (value) => {
    setCurrent(value);
    if (value === "Булки") {
      bunDivEl.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onMainTabClick = (value) => {
    setCurrent(value);
    if (value === "Начинки") {
      mainDivEl.current.scrollIntoView({ behavior: "smooth" });
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
      <div className={styles.typeIndgredientWrapper}>
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
      <Modal
        title="Детали ингредиента"
        open={modalActive}
        handleClose={() => setModalActive(false)}
      >
        <IngredientDetails currIngr={currentIngredient} />
      </Modal>
    </section>
  );
};

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.array.isRequired,
// };

export default BurgerIngredients;
