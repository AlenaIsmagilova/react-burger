import { useRef, FC } from "react";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENTS } from "../../services/actions/actions";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import { TIngredient } from "../BurgerConstructor/types";

interface IBurgerConstructorAddedItem {
  handleClose: () => void;
  index: number;
  item: TIngredient;
}

const BurgerConstructorAddedItem: FC<IBurgerConstructorAddedItem> = ({
  handleClose,
  index,
  item,
}) => {
  const ref = useRef(null);
  const { _id, name, price, image } = item;
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item: { index: number }) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      dispatch({
        type: MOVE_INGREDIENTS,
        payload: { dragIndex, hoverIndex },
      });
      item.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "ingredient",
    item: { _id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  drag(drop(ref));

  return (
    <>
      <span className={styles.ingredientWrapper} ref={ref} style={{ opacity }}>
        <div className="mr-3">
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={handleClose}
        ></ConstructorElement>
      </span>
    </>
  );
};

// BurgerConstructorAddedItem.propTypes = {
//   item: ingredientType,
//   index: PropTypes.number,
//   handleClose: PropTypes.func,
// };

export default BurgerConstructorAddedItem;
