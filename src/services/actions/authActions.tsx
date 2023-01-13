import {
  AppDispatch,
  AppThunk,
  IRegisterForm,
  ISignUpForm,
  TLoginUser,
  TUser,
} from "../../utils/types";
import {
  signInApi,
  signUpApi,
  logOutApi,
  getUser,
  updateTokenApi,
  updateUserApi,
} from "../../utils/api/api";
// import { getOwnOrdersApi } from "../../utils/api/apiOrders";
import { deleteCookie, getCookie, setCookie } from "../../utils/helpers";
import { WS_CONNECTION_SUCCESS } from "./wsActions";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly payload: TLoginUser;
}

interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  readonly payload: TUser;
}

interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TLoginUser;
}

interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TAuthActions =
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterFailed
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed;

export const signIn: AppThunk = (form: IRegisterForm) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return signInApi(form)
      .then((res) => {
        dispatch({ type: LOGIN_SUCCESS, payload: res });
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((error) => {
        console.error("Error in signInApi", error);
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const signUp: AppThunk = (form: ISignUpForm) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    return signUpApi(form)
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.user });
      })
      .catch((error) => {
        console.error("Error in signUpApi", error);
        return dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
};

export const logOut: AppThunk = (refreshToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    return logOutApi(refreshToken)
      .then((res) => {
        dispatch({ type: LOGOUT_SUCCESS });
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
      })
      .catch((error) => {
        console.error("Error in logOutApi", error);
        return dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
};

export const authUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return getUser()
      .then((res) => {
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            user: res.user,
            accessToken: getCookie("accessToken"),
            refreshToken: getCookie("refreshToken"),
          },
        });
      })
      .catch((error) => {
        console.error("Error in authUser", error);
        const JWT_expired = "jwt expired";
        if (error.message === JWT_expired) {
          return updateTokenApi()
            .then((res) => {
              setCookie("accessToken", res.accessToken);
              setCookie("refreshToken", res.refreshToken);
              return getUser()
                .then((res) => {
                  return dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                      user: res.user,
                      accessToken: getCookie("accessToken"),
                      refreshToken: getCookie("refreshToken"),
                    },
                  });
                })
                .catch(() => {
                  return dispatch({ type: LOGOUT_FAILED });
                });
            })
            .catch(() => {
              return dispatch({
                type: LOGIN_FAILED,
              });
            });
        } else {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
        }
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const updateUser: AppThunk = (form: ISignUpForm) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    return updateUserApi(form)
      .then((res) =>
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: {
            user: res.user,
            accessToken: getCookie("accessToken"),
            refreshToken: getCookie("refreshToken"),
          },
        })
      )
      .catch((error) => {
        console.error("Error in updateUserApi", error);
        return dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};
