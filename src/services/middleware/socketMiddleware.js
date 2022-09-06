import { wsActions } from "../actions/wsActions.js";

const socketMiddleware = () => {
  return function (store) {
    let socket = null;

    return function (next) {
      return function (action) {
        const { dispatch } = store;
        const { type, payload } = action;
        const isWsConnectionStart = type === wsActions.wsStart;
        const isWsWithTokenConnectionStart =
          type === wsActions.wsWithTokenStart;

        if (isWsConnectionStart || isWsWithTokenConnectionStart) {
          // объект класса WebSocket
          socket = new WebSocket(payload);
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            dispatch({
              type: isWsConnectionStart
                ? wsActions.wsGetMessage
                : wsActions.wsWithTokenGetMessage,
              payload: data,
            });
          };
        }

        if (socket) {
          // функция, которая вызывается при открытии сокета
          socket.onopen = (event) => {
            dispatch({ type: wsActions.wsSuccess, payload: event });
          };
          socket.onerror = (event) => {
            dispatch({ type: wsActions.wsError, payload: event });
          };
          socket.onclose = (event) => {
            dispatch({ type: wsActions.wsClosed, payload: event });
          };
        }
        next(action);
      };
    };
  };
};

export default socketMiddleware;
