import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from "../actions/authActions.js";

export const initialState = {
  isLoading: true,
  error: false,
  isLogedIn: false,
  accessToken: "",
  refreshToken: "",
  currentUser: {
    name: "",
    email: "",
  },
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: true,
        currentUser: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: true,
        currentUser: action.payload,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        accessToken: "",
        refreshToken: "",
        currentUser: {
          name: "",
          email: "",
        },
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: true,
        currentUser: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        isLoading: false,
        isLogedIn: false,
        error: true,
      };
    }
    default:
      return state;
  }
};
