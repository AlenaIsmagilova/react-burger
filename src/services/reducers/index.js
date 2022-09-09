import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "../reducers/burgerIngredients.js";
import { burgerConstructorReducer } from "../reducers/burgerConstructor.js";
import { orderDetailsReducer } from "../reducers/orderDetails.js";
import { ingredientsItemReducer } from "../reducers/burgerIngredientsItem.js";
import { userReducer } from "./user.js";
import wsReducer from "./wsReducer.js";

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  burgerConstructorReducer,
  orderDetailsReducer,
  ingredientsItemReducer,
  userReducer,
  wsReducer,
});
