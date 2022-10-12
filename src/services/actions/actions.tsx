import { TIngredient } from "../../utils/types";
import { TIngredientItem as TIngredientItem } from "../../components/BurgerIngredients/types";
import { getBurgerData } from "../../utils/api/api";
import { createOrderApi } from "../../utils/api/apiOrders";
import { AppDispatch, AppThunk } from "../../utils/types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
  "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCES" =
  "GET_INGREDIENTS_SUCCES";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
  "GET_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT_IN_BURGER: "SET_CURRENT_INGREDIENT_IN_BURGER" =
  "SET_CURRENT_INGREDIENT_IN_BURGER";

export const GET_ORDER_DETAILS_REQUEST: "GET_ORDER_DETAILS_REQUEST" =
  "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS" =
  "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED: "GET_ORDER_DETAILS_FAILED" =
  "GET_ORDER_DETAILS_FAILED";
export const RESET_ORDER_DETAILS: "RESET_ORDER_DETAILS" = "RESET_ORDER_DETAILS";

export const SET_INGREDIENTS_ITEM_IN_MODAL: "SET_INGREDIENTS_ITEM_IN_MODAL" =
  "SET_INGREDIENTS_ITEM_IN_MODAL";
export const RESET_INGREDIENTS_ITEM_IN_MODAL: "RESET_INGREDIENTS_ITEM_IN_MODAL" =
  "RESET_INGREDIENTS_ITEM_IN_MODAL";

export const SET_NAV_INGREDIENTS: "SET_NAV_INGREDIENTS" = "SET_NAV_INGREDIENTS";

export const SET_ORDER_MODAL_ACTIVE: "SET_ORDER_MODAL_ACTIVE" =
  "SET_ORDER_MODAL_ACTIVE";
export const SET_INGREDIENTS_MODAL_ACTIVE: "SET_INGREDIENTS_MODAL_ACTIVE" =
  "SET_INGREDIENTS_MODAL_ACTIVE";
export const SET_ORDER_MODAL_INACTIVE: "SET_ORDER_MODAL_INACTIVE" =
  "SET_ORDER_MODAL_INACTIVE";
export const SET_INGREDIENTS_MODAL_INACTIVE: "SET_INGREDIENTS_MODAL_INACTIVE" =
  "SET_INGREDIENTS_MODAL_INACTIVE";

export const ADD_INGREDIENT_IN_BURGER: "ADD_INGREDIENT_IN_BURGER" =
  "ADD_INGREDIENT_IN_BURGER";
export const ADD_BUN_IN_BURGER: "ADD_BUN_IN_BURGER" = "ADD_BUN_IN_BURGER";
export const RESET_CONSTRUCTOR_AFTER_ORDER: "RESET_CONSTRUCTOR_AFTER_ORDER" =
  "RESET_CONSTRUCTOR_AFTER_ORDER";

export const DELETE_INGREDIENT_IN_BURGER: "DELETE_INGREDIENT_IN_BURGER" =
  "DELETE_INGREDIENT_IN_BURGER";

export const MOVE_INGREDIENTS: "MOVE_INGREDIENTS" = "MOVE_INGREDIENTS";

interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientItems: TIngredientItem[];
}

interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

interface ISetCurrentIngredientsInBurger {
  readonly type: typeof SET_CURRENT_INGREDIENT_IN_BURGER;
}

interface IGetOrderDetailsRequest {
  readonly type: typeof GET_ORDER_DETAILS_REQUEST;
}

interface IGetOrderDetailsSuccess {
  readonly type: typeof GET_ORDER_DETAILS_SUCCESS;
  readonly payload: number;
}

interface IGetOrderDetailsFailed {
  readonly type: typeof GET_ORDER_DETAILS_FAILED;
}

interface IResetOrderDetails {
  readonly type: typeof RESET_ORDER_DETAILS;
}

interface ISetIngredientsItemInModal {
  readonly type: typeof SET_INGREDIENTS_ITEM_IN_MODAL;
  readonly payload: TIngredientItem;
}

interface IResetIngredientsItemInModal {
  readonly type: typeof RESET_INGREDIENTS_ITEM_IN_MODAL;
  readonly payload: TIngredientItem;
}

interface ISetNavIngredients {
  readonly type: typeof SET_NAV_INGREDIENTS;
  readonly payload: string;
}

interface ISetOrderModalActive {
  readonly type: typeof SET_ORDER_MODAL_ACTIVE;
}

interface ISetIngredientsModalActive {
  readonly type: typeof SET_INGREDIENTS_MODAL_ACTIVE;
}

interface ISetOrderModalInactive {
  readonly type: typeof SET_ORDER_MODAL_INACTIVE;
}

interface ISetIngredientsModalInactive {
  readonly type: typeof SET_INGREDIENTS_MODAL_INACTIVE;
}

interface IAddIngredientInBurger {
  readonly type: typeof ADD_INGREDIENT_IN_BURGER;
  readonly payload: TIngredient;
}

interface IAddBunInBurger {
  readonly type: typeof ADD_BUN_IN_BURGER;
  readonly payload: TIngredient;
}

interface IResetConstructorAfterOrder {
  readonly type: typeof RESET_CONSTRUCTOR_AFTER_ORDER;
}

interface IDeleteIngredientInBurger {
  readonly type: typeof DELETE_INGREDIENT_IN_BURGER;
  readonly payload: TIngredient;
}

interface IMoveIngredients {
  readonly type: typeof MOVE_INGREDIENTS;
  readonly payload: TIngredient;
}

export type TActions =
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | ISetCurrentIngredientsInBurger
  | IGetOrderDetailsRequest
  | IGetOrderDetailsSuccess
  | IGetOrderDetailsFailed
  | IResetOrderDetails
  | ISetIngredientsItemInModal
  | IResetIngredientsItemInModal
  | ISetNavIngredients
  | ISetOrderModalActive
  | ISetIngredientsModalActive
  | ISetOrderModalInactive
  | ISetIngredientsModalInactive
  | IAddIngredientInBurger
  | IAddBunInBurger
  | IResetConstructorAfterOrder
  | IDeleteIngredientInBurger
  | IMoveIngredients;

//санки(фишка санок в том, что он не возвращает объект экшенов, а возвращает функцию,
//в аргументе которой диспатч - это дает возможность диспатчить экшены(объекты) в разных местах. при запросе/ошибке/при ответе)
export const getBurgerIngredientsItems: AppThunk = (
  ingredients: TIngredientItem[]
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getBurgerData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredientItems: res.data,
        });
      })
      .catch((error) => {
        console.error("Error in getBurgerData", error);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};

export const getOrderDetails: AppThunk = (
  ingredientsId: string,
  token: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    createOrderApi(ingredientsId, token)
      .then((res) => {
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch((error) => {
        console.error("Error in createOrderApi", error);
        dispatch({
          type: GET_ORDER_DETAILS_FAILED,
        });
      });
  };
};
