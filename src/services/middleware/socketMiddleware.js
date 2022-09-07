const socketMiddleware = (wsActions) => {
  return function (store) {
    let socket = null;

    return function (next) {
      return function (action) {
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
