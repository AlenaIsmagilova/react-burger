import { TWsOrder, TWsResponse } from "../../utils/types";
import {
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_GET_OWN_ORDERS_MESSAGE,
  TWsActions,
} from "../actions/wsActions";

export type TState = {
  isConnected: boolean;
  isLoading: boolean;
  messages: TWsOrder[];
  ownMessages: TWsOrder[];
  error: undefined | string;
  total: null | number;
  totalToday: null | number;
};

const initialState: TState = {
  isConnected: false,
  isLoading: true,
  messages: [],
  ownMessages: [],
  error: undefined,
  total: null,
  totalToday: null,
};

const wsReducer = (state = initialState, action: TWsActions): TState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        isConnected: true,
        isLoading: true,
        error: undefined,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        isConnected: false,
        isLoading: false,
        error: action.payload,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        isConnected: false,
        isLoading: false,
        error: undefined,
        // messages: [],
        // ownMessages: [],
      };
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        messages: action.payload.orders,
        ownMessages: [],
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case WS_GET_OWN_ORDERS_MESSAGE:
      return {
        ...state,
        error: undefined,
        isLoading: false,
        messages: [],
        ownMessages: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};

export default wsReducer;
