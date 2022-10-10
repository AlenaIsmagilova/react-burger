import PropTypes from "prop-types";
import { store } from "../index";
import { ThunkAction } from "redux-thunk";
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import { Action, ActionCreator } from "redux";
import { TWsActions } from "../services/actions/wsActions";
import { TActions } from "../services/actions/actions";
import { TAuthActions } from "../services/actions/authActions";

const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export default ingredientType;

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TLoginUser = {
  readonly user: TUser;
  readonly refreshToken: string | undefined;
  readonly accessToken: string | undefined;
};

export type TWsOrder = {
  readonly createdAt: string;
  readonly ingredients: string[];
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
};

export type TWsResponse = {
  orders: TWsOrder[];
  success: string;
  total: number;
  totalToday: number;
};

export type TAllActions = TWsActions | TActions | TAuthActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAllActions>
>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

export interface ILocation {
  background: string | undefined;
}

export interface IHistoryLocation {
  action: string;
  goBack: () => void;
}

// export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();
