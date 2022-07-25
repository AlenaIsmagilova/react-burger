import { getBurgerData } from "../../utils/api/api";
import { createOrderApi } from "../../utils/api/apiOrders";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCES";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_CURRENT_INGREDIENT_IN_BURGER =
  "SET_CURRENT_INGREDIENT_IN_BURGER";

export const GET_ORDER_DETAILS_REQUEST = "GET_ORDER_DETAILS_REQUEST";
export const GET_ORDER_DETAILS_SUCCESS = "GET_ORDER_DETAILS_SUCCESS";
export const GET_ORDER_DETAILS_FAILED = "GET_ORDER_DETAILS_FAILED";
export const RESET_ORDER_DETAILS = "RESET_ORDER_DETAILS";

export const SET_INGREDIENTS_ITEM_IN_MODAL = "SET_INGREDIENTS_ITEM_IN_MODAL";
export const RESET_INGREDIENTS_ITEM_IN_MODAL =
  "RESET_INGREDIENTS_ITEM_IN_MODAL";

export const SET_NAV_INGREDIENTS = "SET_NAV_INGREDIENTS";

export const SET_MODAL_ACTIVE = "SET_MODAL_ACTIVE";
export const SET_MODAL_INACTIVE = "SET_MODAL_INACTIVE";

export const ADD_INGREDIENT_IN_BURGER = "ADD_INGREDIENT_IN_BURGER";
export const ADD_BUN_IN_BURGER = "ADD_BUN_IN_BURGER";

export const DELETE_INGREDIENT_IN_BURGER = "DELETE_INGREDIENT_IN_BURGER";

//санки(фишка санок в том, что он не возвращает объект экшенов, а возвращает функцию,
//в аргументе которой диспатч - это дает возможность диспатчить экшены(объекты) в разных местах. при запросе/ошибке/при ответе)
export const getBurgerIngredientsItems = (ingredients) => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    getBurgerData(ingredients)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredientItems: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
};

export const getOrderDetails = (ingredientsId) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST,
    });
    createOrderApi(ingredientsId)
      .then((res) => {
        console.log(res.order);
        dispatch({
          type: GET_ORDER_DETAILS_SUCCESS,
          payload: res.order.number,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_DETAILS_FAILED,
        });
      });
  };
};
