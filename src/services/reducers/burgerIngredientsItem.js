import {
  SET_INGREDIENTS_ITEM_IN_MODAL,
  RESET_INGREDIENTS_ITEM_IN_MODAL,
} from "../actions/actions.js";

const initialState = {
  currentIngredient: {},
};

export const ingredientsItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS_ITEM_IN_MODAL: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case RESET_INGREDIENTS_ITEM_IN_MODAL: {
      return {
        ...state,
        currentIngredient: {},
      };
    }
    default:
      return state;
  }
};
