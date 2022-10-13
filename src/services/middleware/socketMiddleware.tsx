import { Dispatch } from "react";
import { Middleware, MiddlewareAPI } from "redux";
import {
  AppDispatch,
  RootState,
  TWsSocketMiddlewareActions,
} from "../../utils/types";
import { TWsActions } from "../actions/wsActions";

const socketMiddleware = (
  wsActions: TWsSocketMiddlewareActions
): Middleware => {
  return function (store: MiddlewareAPI) {
    let socket: WebSocket | null = null;

    return function (next: Dispatch<TWsActions>) {
      return function (action: any) {
        const { dispatch } = store;
        const { type, payload } = action;
        const {
          wsStart,
          wsError,
          wsSuccess,
          wsClosed,
          wsGetMessage,
          wsWithTokenStart,
          wsWithTokenGetMessage,
        } = wsActions;
        const isWsConnectionStart = type === wsStart;
        const isWsWithTokenConnectionStart = type === wsWithTokenStart;

        if (isWsConnectionStart || isWsWithTokenConnectionStart) {
          // объект класса WebSocket
          socket = new WebSocket(payload);
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch({
              type: isWsConnectionStart ? wsGetMessage : wsWithTokenGetMessage,
              payload: data,
            });
          };
        }

        if (socket) {
          // функция, которая вызывается при открытии сокета
          socket.onopen = (event) => {
            dispatch({ type: wsSuccess, payload: event });
          };
          socket.onerror = (event) => {
            dispatch({ type: wsError, payload: event });
          };
          socket.onclose = (event) => {
            dispatch({ type: wsClosed, payload: event });
          };
        }
        next(action);
      };
    };
  };
};

export default socketMiddleware;
