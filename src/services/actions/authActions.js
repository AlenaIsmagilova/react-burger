import {
  signInApi,
  signUpApi,
  logOutApi,
  getUser,
  updateTokenApi,
  updateUserApi,
} from "../../utils/api/api";
import { deleteCookie, getCookie, setCookie } from "../../utils/helpers";

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

export const signIn = (form) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    return signInApi(form)
      .then((res) => dispatch({ type: LOGIN_SUCCESS, payload: res }))
      .catch((error) => {
        console.error("Error in sighInApi", error);
        return dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const signUp = (form) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    return signUpApi(form)
      .then((res) => {
        dispatch({ type: REGISTER_SUCCESS, payload: res.user });
      })
      .catch((error) => {
        console.error("Error in sighUpApi", error);
        return dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
};

export const logOut = (refreshToken) => {
  return function (dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    return logOutApi(refreshToken)
      .then((res) => {
        return dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((error) => {
        console.error("Error in logOutApi", error);
        return dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
};

export const authUser = () => {
  return function (dispatch) {
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
        console.error("Error in getUserApi", error);
        const JWT_expired = "jwt expired";
        if (error.message === JWT_expired) {
          return updateTokenApi().then((res) => {
            setCookie("accessToken", res.accessToken);
            setCookie("refreshToken", res.refreshToken);
            return getUser().then((res) => {
              return dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                  user: res.user,
                  accessToken: getCookie("accessToken"),
                  refreshToken: getCookie("refreshToken"),
                },
              });
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

export const updateUser = (form) => {
  return function (dispatch) {
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
