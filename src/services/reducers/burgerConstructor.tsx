import {
  DELETE_INGREDIENT_IN_BURGER,
  ADD_INGREDIENT_IN_BURGER,
  ADD_BUN_IN_BURGER,
  MOVE_INGREDIENTS,
  RESET_CONSTRUCTOR_AFTER_ORDER,
} from "../actions/actions";
import { TActions } from "../actions/actions";
import { TIngredient } from "../../components/BurgerConstructor/types";

export type TState = {
  currentIngredientIntoBurgerItems: ReadonlyArray<TIngredient>;
  bunInrgedientsOnly: TIngredient;
  readonly count: number;
};

//начальное состояние
export const initialState: TState = {
  currentIngredientIntoBurgerItems: [],
  bunInrgedientsOnly: {} as TIngredient,
  count: 0,
};

// редьюсер, который возвращает обновленный стейт, принимая на вход стейт и экшн
export const burgerConstructorReducer = (
  state = initialState,
  action: TActions
): TState => {
  // action = { type:SET_CURRENT_INGREDIENT_IN_BURGER, payload: res.data }
  switch (action.type) {
    case ADD_INGREDIENT_IN_BURGER: {
      return {
        ...state,
        currentIngredientIntoBurgerItems: [
          ...state.currentIngredientIntoBurgerItems,
          action.payload,
        ],
        count: [action.payload].reduce((sum, current) => {
          return sum + current.price;
        }, 0),
      };
    }
    case ADD_BUN_IN_BURGER: {
      return {
        ...state,
        bunInrgedientsOnly: action.payload,
      };
    }
    case DELETE_INGREDIENT_IN_BURGER: {
      return {
        ...state,
        currentIngredientIntoBurgerItems:
          state.currentIngredientIntoBurgerItems.filter((ingredient) => {
            return ingredient.onlyFrontId !== action.payload.onlyFrontId;
          }),
      };
    }
    case MOVE_INGREDIENTS: {
      const dragConstructor = [...state.currentIngredientIntoBurgerItems];
      dragConstructor.splice(
        action.payload.dragIndex,
        0,
        dragConstructor.splice(action.payload.hoverIndex, 1)[0]
      );

      return {
        ...state,
        currentIngredientIntoBurgerItems: dragConstructor,
      };
    }
    case RESET_CONSTRUCTOR_AFTER_ORDER: {
      return initialState;
    }
    default:
      return state;
  }
};
