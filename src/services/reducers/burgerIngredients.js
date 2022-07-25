import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SET_NAV_INGREDIENTS,
  SET_MODAL_ACTIVE,
  SET_MODAL_INACTIVE,
} from "../actions/actions.js";

//начальное состояние
export const initialState = {
  ingredientItems: [],
  isLoading: false,
  error: false,
  currentIngredients: "Булки",
  isOpen: false,
};

// редьюсер, который возвращает обновленный стейт, принимая на вход стейт и экшн
export const burgerIngredientsReducer = (state = initialState, action) => {
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
    case SET_MODAL_ACTIVE: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case SET_MODAL_INACTIVE: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
};
