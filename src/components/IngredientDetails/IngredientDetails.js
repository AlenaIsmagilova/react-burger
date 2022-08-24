import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import ingredientType from "../../utils/types";
import styles from "../IngredientDetails/IngredientDetails.module.css";

const IngredientDetails = () => {
  const params = useParams();
  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );
  const history = useHistory();
  const location = useLocation();

  console.log(params);

  useEffect(() => {
    if (history.action === "POP")
      history.replace({ pathname: location.pathname });
  }, []);

  const currIngr = ingredients.find((item) => {
    return item._id === params.id;
  });

  if (!currIngr) return null;

  return (
    <div className={styles.ingredientContainer}>
      <img className={styles.ingredientImage} src={currIngr.image} />
      <p className="mt-4 text text_type_main-medium">{currIngr.name}</p>
      <div className={`mt-8 mb-15 ${styles.ingredientNutrition}`}>
        <div className={styles.nutritionInfoContainer}>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Калории,ккал
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {currIngr.calories}
          </p>
        </div>
        <div className={styles.nutritionInfoContainer}>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Белки, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {currIngr.proteins}
          </p>
        </div>
        <div className={styles.nutritionInfoContainer}>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            {" "}
            Жиры, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {currIngr.fat}
          </p>
        </div>
        <div className={styles.nutritionInfoContainer}>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Углеводы, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {currIngr.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  currIngr: ingredientType,
};

export default IngredientDetails;
