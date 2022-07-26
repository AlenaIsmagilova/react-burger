import React, { useMemo, useRef, useDispatch } from "react";
import { useDrop, useDrag } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENTS } from "../../services/actions/actions.js";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";

const BurgerConstructorAddedItem = ({ handleClose, index, item }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { id, name, price, image } = item;

  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item) {
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
    item: { id, index },
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

export default BurgerConstructorAddedItem;
