export const WS_CONNECTION_START = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE"; //при получении сообщения от сервера
export const WS_SEND_MESSAGE = "WS_SEND_MESSAGE"; //для отправки сообщений на сервер

export const WS_OWN_ORDERS_CONNECTION_START = "WS_OWN_ORDERS_CONNECTION_START";
export const WS_GET_OWN_ORDERS_MESSAGE = "WS_GET_OWN_ORDERS_MESSAGE";

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsError: WS_CONNECTION_ERROR,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsClosed: WS_CONNECTION_CLOSED,
  wsGetMessage: WS_GET_MESSAGE,
  wsSendMessage: WS_SEND_MESSAGE,
  wsWithTokenStart: WS_OWN_ORDERS_CONNECTION_START,
  wsWithTokenGetMessage: WS_GET_OWN_ORDERS_MESSAGE,
};