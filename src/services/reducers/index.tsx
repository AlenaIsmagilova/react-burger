import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { orderDetailsReducer } from "./orderDetails";
import { ingredientsItemReducer } from "./burgerIngredientsItem";
import { userReducer } from "./user";
import wsReducer from "./wsReducer";

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  burgerConstructorReducer,
  orderDetailsReducer,
  ingredientsItemReducer,
  userReducer,
  wsReducer,
});
