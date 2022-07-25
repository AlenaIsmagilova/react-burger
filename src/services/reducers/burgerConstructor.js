import {
  DELETE_INGREDIENT_IN_BURGER,
  ADD_INGREDIENT_IN_BURGER,
  ADD_BUN_IN_BURGER,
} from "../actions/actions.js";

//начальное состояние
export const initialState = {
  currentIngredientIntoBurgerItems: [],
  bunInrgedientsOnly: {},
};

// редьюсер, который возвращает обновленный стейт, принимая на вход стейт и экшн
export const burgerConstructorReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
