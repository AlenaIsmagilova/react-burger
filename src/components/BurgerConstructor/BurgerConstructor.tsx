import { useMemo, FC } from "react";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../BurgerConstructor/BurgerConstructor.module.css";
import { TIngredient, useDispatch } from "../../utils/types";
import { useSelector } from "../../utils/types";
import { getOrderDetails } from "../../services/actions/actions";
import {
  RESET_ORDER_DETAILS,
  SET_ORDER_MODAL_ACTIVE,
  ADD_INGREDIENT_IN_BURGER,
  ADD_BUN_IN_BURGER,
  DELETE_INGREDIENT_IN_BURGER,
} from "../../services/actions/actions";
import BurgerConstructorAddedItem from "../BurgerConstructorAddedItem/BurgerConstructorAddedItem";
import { getCookie } from "../../utils/helpers";
import { TIngredientItem } from "../BurgerIngredients/types";

const BurgerConstructor: FC = () => {
  const history = useHistory();
  const accessToken = getCookie("accessToken");
  const currentIngredientInBurger = useSelector(
    (store) => store.burgerConstructorReducer.currentIngredientIntoBurgerItems
  );

  const currentBunInBurger = useSelector(
    (store) => store.burgerConstructorReducer.bunInrgedientsOnly
  );

  const userIsLogedIn = useSelector((store) => store.userReducer.isLogedIn);

  const handleTotalPrice = () => {
    let totalCostBuns = 0;
    let totalCostIngredients = 0;

    if (currentIngredientInBurger.length > 0) {
      totalCostIngredients = currentIngredientInBurger.reduce(
        (sum: number, current: TIngredient) => {
          return sum + current.price;
        },
        0
      );
    }
    if (currentBunInBurger?._id) {
      totalCostBuns = currentBunInBurger?.price * 2;
    }
    return totalCostIngredients + totalCostBuns;
  };

  const totalCost = handleTotalPrice();

  const [collected, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => {
      return {
        canDrop: monitor.canDrop(),
      };
    },
    drop: (ingredient: TIngredientItem) => {
      addIngredientsInBurger(ingredient);
      addBunInBurger(ingredient);
    },
  });

  const addIngredientsInBurger = (ingredient: TIngredientItem) => {
    if (ingredient.type === "sauce" || ingredient.type === "main") {
      dispatch({
        type: ADD_INGREDIENT_IN_BURGER,
        payload: { ...ingredient, onlyFrontId: +new Date() },
      });
    }
  };

  const addBunInBurger = (ingredient: TIngredientItem) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN_IN_BURGER,
        payload: ingredient,
      });
    }
  };

  const dispatch = useDispatch();

  const { currentIngredientIntoBurgerItems } = useSelector((store) => {
    return store.burgerConstructorReducer;
  });

  const ingredients = useSelector(
    (store) => store.burgerIngredientsReducer.ingredientItems
  );

  const prepareIngredientsId = useMemo(
    () =>
      ingredients.map((ingredient: TIngredientItem) => {
        return ingredient._id;
      }),
    [ingredients]
  );

  const handleOpen = () => {
    if (userIsLogedIn) {
      dispatch({ type: RESET_ORDER_DETAILS });
      dispatch({ type: SET_ORDER_MODAL_ACTIVE });
      dispatch(getOrderDetails(prepareIngredientsId, accessToken));
    } else {
      return history.push("/login");
    }
  };

  const handleDeleteIngredient = (ingredient: TIngredientItem) => {
    dispatch({ type: DELETE_INGREDIENT_IN_BURGER, payload: ingredient });
  };

  return (
    <div className={`mt-25 ml-10 ${styles.mainConstructorContainer}`}>
      <div
        ref={dropTarget}
        className={`${
          collected.canDrop ? styles.burgerConstructorWrapperBorder : ""
        } ${`ml-8 pr-2 ${styles.burgerConstructorWrapper}`}`}
      >
        {currentIngredientInBurger.length === 0 && !currentBunInBurger?._id ? (
          <>
            <p
              className={`${styles.withoutOrderTitle} text text_type_main-medium `}
            >
              Перетащите сюда ингредиенты.{" "}
            </p>
            <p
              className={`${styles.withoutOrderTitle} text text_type_main-medium `}
            >
              Начните с булки.
            </p>
          </>
        ) : (
          <>
            {currentBunInBurger?._id && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={currentBunInBurger?.name + " (верх)"}
                price={currentBunInBurger?.price}
                thumbnail={currentBunInBurger?.image}
              />
            )}
            <div className={styles.wrapperForScroll}>
              {currentIngredientIntoBurgerItems.map(
                (ingredient: TIngredient, index: number) => (
                  <BurgerConstructorAddedItem
                    key={ingredient.onlyFrontId}
                    item={ingredient}
                    index={index}
                    handleClose={() => handleDeleteIngredient(ingredient)}
                  />
                )
              )}
            </div>
            {currentBunInBurger?._id && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={currentBunInBurger?.name + " (низ)"}
                price={currentBunInBurger?.price}
                thumbnail={currentBunInBurger?.image}
              />
            )}
            {
              <div className={`mt-10 mr-4 ${styles.orderWrapper}`}>
                <div className={`mr-10 ${styles.totalPriceWrapper}`}>
                  <p className="text text_type_digits-medium mr-2">
                    {totalCost}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <Button
                  type="primary"
                  size="large"
                  onClick={() => handleOpen()}
                  htmlType="button"
                >
                  Оформить заказ
                </Button>
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default BurgerConstructor;

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

      // добавить элемент в начало списка
      if (index === 0) {
        // ваш код ...
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        // ваш код ...
        while (currIndex !== index) {
          currIndex++;
          break;
        }

        curr = curr.next;
        curr.next = node;

        // добавить элемент
        // ваш код ...
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}

const list = new LinkedList<number>();
list.insertAt(12, 0);
list.insertAt(13, 0);
list.insertAt(114, 0);
list.print(); // 13 114 12
