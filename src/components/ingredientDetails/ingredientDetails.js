import styles from "../ingredientDetails/ingredientDetails.module.css";

const IngredientDetails = (props) => {
  return (
    <>
      <img className={styles.ingredientImage} src={props.currIngr.image} />
      <p className="mt-4 text text_type_main-medium">{props.currIngr.name}</p>
      <div className={`mt-8 mb-15 ${styles.ingredientNutrition}`}>
        <div>
          <h3 className="text text_type_main-default">Калории,ккал</h3>
          <p className="mt-2 text text_type_digits-default">
            {props.currIngr.calories}
          </p>
        </div>
        <div>
          <h3 className="text text_type_main-default">Белки, г</h3>
          <p className="mt-2 text text_type_digits-default">
            {props.currIngr.proteins}
          </p>
        </div>
        <div>
          <h3 className="text text_type_main-default"> Жиры, г</h3>
          <p className="mt-2 text text_type_digits-default">
            {props.currIngr.fat}
          </p>
        </div>
        <div>
          <h3 className="text text_type_main-default">Углеводы, г</h3>
          <p className="mt-2 text text_type_digits-default">
            {props.currIngr.carbohydrates}
          </p>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
