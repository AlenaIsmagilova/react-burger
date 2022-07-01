import PropTypes from "prop-types";
import styles from "../ingredientDetails/ingredientDetails.module.css";

const IngredientDetails = (props) => {
  return (
    <>
      <img className={styles.ingredientImage} src={props.currIngr.image} />
      <p className="mt-4 text text_type_main-medium">{props.currIngr.name}</p>
      <div className={`mt-8 mb-15 ${styles.ingredientNutrition}`}>
        <div>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Калории,ккал
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {props.currIngr.calories}
          </p>
        </div>
        <div>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Белки, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {props.currIngr.proteins}
          </p>
        </div>
        <div>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            {" "}
            Жиры, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {props.currIngr.fat}
          </p>
        </div>
        <div>
          <h3 className={`text text_type_main-default ${styles.nutritionInfo}`}>
            Углеводы, г
          </h3>
          <p
            className={`mt-2 text text_type_digits-default ${styles.nutritionInfo}`}
          >
            {props.currIngr.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,

  currIngr: PropTypes.shape({
    carbohydrates: PropTypes.number,
    fat: PropTypes.number,
    proteins: PropTypes.number,
    calories: PropTypes.number,
  }),
};

export default IngredientDetails;
