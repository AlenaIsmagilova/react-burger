import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_NAV_INGREDIENTS,
  SET_ORDER_MODAL_ACTIVE,
  SET_INGREDIENTS_MODAL_ACTIVE,
  SET_ORDER_MODAL_INACTIVE,
  SET_INGREDIENTS_MODAL_INACTIVE,
  TActions,
} from "../actions/actions";
import { TIngredientItem } from "../../components/BurgerIngredients/types";
import { TIngredient } from "../../utils/types";

export type TState = {
  ingredientItems: TIngredientItem[];
  isLoading: boolean;
  error: boolean;
  currentIngredients: string;
  isOrderModalOpen: boolean;
  isIngredientsModalOpen: boolean;
};

//начальное состояние
export const initialState: TState = {
  ingredientItems: [],
  isLoading: false,
  error: false,
  currentIngredients: "Булки",
  isOrderModalOpen: false,
  isIngredientsModalOpen: false,
};

// редьюсер, который возвращает обновленный стейт, принимая на вход стейт и экшн
export const burgerIngredientsReducer = (
  state = initialState,
  action: TActions
): TState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredientItems: action.ingredientItems,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case SET_NAV_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: action.payload,
      };
    }
    case SET_ORDER_MODAL_ACTIVE: {
      return {
        ...state,
        isOrderModalOpen: true,
      };
    }
    case SET_INGREDIENTS_MODAL_ACTIVE: {
      return {
        ...state,
        isIngredientsModalOpen: true,
      };
    }
    case SET_ORDER_MODAL_INACTIVE: {
      return {
        ...state,
        isOrderModalOpen: false,
      };
    }
    case SET_INGREDIENTS_MODAL_INACTIVE: {
      return {
        ...state,
        isIngredientsModalOpen: false,
      };
    }
    default:
      return state;
  }
};
