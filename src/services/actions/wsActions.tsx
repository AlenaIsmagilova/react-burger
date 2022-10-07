import { TWsResponse } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START"; //для создания объекта класса WebSocket
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE"; //при получении сообщения от сервера
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE"; //для отправки сообщений на сервер

export const WS_OWN_ORDERS_CONNECTION_START: "WS_OWN_ORDERS_CONNECTION_START" =
  "WS_OWN_ORDERS_CONNECTION_START";
export const WS_GET_OWN_ORDERS_MESSAGE: "WS_GET_OWN_ORDERS_MESSAGE" =
  "WS_GET_OWN_ORDERS_MESSAGE";

interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TWsResponse;
}

interface IWsOwnOrdersConnectionStart {
  readonly type: typeof WS_OWN_ORDERS_CONNECTION_START;
}

interface IWsGetOwnOrdersMessage {
  readonly type: typeof WS_GET_OWN_ORDERS_MESSAGE;
  readonly payload: TWsResponse;
}

export const wsActions = {
  wsStart: WS_CONNECTION_START,
  wsError: WS_CONNECTION_ERROR,
  wsSuccess: WS_CONNECTION_SUCCESS,
  wsClosed: WS_CONNECTION_CLOSED,
  wsGetMessage: WS_GET_MESSAGE,
  wsWithTokenStart: WS_OWN_ORDERS_CONNECTION_START,
  wsWithTokenGetMessage: WS_GET_OWN_ORDERS_MESSAGE,
};

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage
  | IWsOwnOrdersConnectionStart
  | IWsGetOwnOrdersMessage;
