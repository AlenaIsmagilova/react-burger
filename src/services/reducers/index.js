import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "../reducers/burgerIngredients";
import { burgerConstructorReducer } from "../reducers/burgerConstructor";
import { orderDetailsReducer } from "../reducers/orderDetails";
import { ingredientsItemReducer } from "../reducers/burgerIngredientsItem";
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
