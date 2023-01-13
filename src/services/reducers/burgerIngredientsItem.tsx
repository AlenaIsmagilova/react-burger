import {
  SET_INGREDIENTS_ITEM_IN_MODAL,
  RESET_INGREDIENTS_ITEM_IN_MODAL,
  TActions,
} from "../actions/actions";
import { TIngredientItem } from "../../components/BurgerIngredients/types";

export type TState = {
  currentIngredient: TIngredientItem;
};

const initialState: TState = {
  currentIngredient: {} as TIngredientItem,
};

export const ingredientsItemReducer = (
  state = initialState,
  action: TActions
): TState => {
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
        currentIngredient: {} as TIngredientItem,
      };
    }
    default:
      return state;
  }
};
