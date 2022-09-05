import {
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_OWN_ORDERS_CONNECTION_START,
  WS_GET_OWN_ORDERS_MESSAGE,
} from "../actions/wsActions.js";
import { wsOwnOrdersUrl, wsAllOrdersUrl } from "../../constants/constants.js";
import { getCookie } from "../../utils/helpers/index.js";

const socketMiddleware = () => {
  return function (store) {
    let socket = null;

    return function (next) {
      return function (action) {
        const { dispatch, getState } = store;
        const { type, payload } = action;
        if (type === WS_CONNECTION_START) {
          // объект класса WebSocket
          socket = new WebSocket(wsAllOrdersUrl);
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch({
              type: WS_GET_MESSAGE,
              payload: data,
            });
          };
        }

        if (type === WS_OWN_ORDERS_CONNECTION_START) {
          const clearToken = getCookie("accessToken").replace("Bearer ", "");
          socket = new WebSocket(`${wsOwnOrdersUrl}?token=${clearToken}`);
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch({
              type: WS_GET_OWN_ORDERS_MESSAGE,
              payload: data,
            });
          };
        }

        if (socket) {
          // функция, которая вызывается при открытии сокета
          socket.onopen = (event) => {
            dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
          };
          socket.onerror = (event) => {
            dispatch({ type: WS_CONNECTION_ERROR, payload: event });
          };
          socket.onclose = (event) => {
            dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
          };
          if (type === WS_SEND_MESSAGE) {
            const message = payload;
            socket.send(JSON.stringify(message));
          }
        }
        next(action);
      };
    };
  };
};

export default socketMiddleware;
