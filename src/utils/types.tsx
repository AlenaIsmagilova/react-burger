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
import { Location } from "history";

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly __v: number;
  onlyFrontId?: number;
  dragIndex: number;
  hoverIndex: number;
};

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
  background: Location;
  from: string;
}

export interface IHistoryLocation {
  action: string;
  goBack: () => void;
}

export interface IRegisterForm {
  email: string;
  password: string;
}

export interface ISignUpForm extends IRegisterForm {
  name: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export type TWsSocketMiddlewareActions = {
  wsStart: string;
  wsError: string;
  wsSuccess: string;
  wsClosed: string;
  wsGetMessage: string;
  wsWithTokenStart: string;
  wsWithTokenGetMessage: string;
};
