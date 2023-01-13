import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
  RESET_ORDER_DETAILS,
  TActions,
} from "../actions/actions";

export type TState = {
  orderNumber: number;
  isLoading: boolean;
  error: boolean;
};

const initialState: TState = {
  orderNumber: 0,
  isLoading: false,
  error: false,
};

export const orderDetailsReducer = (
  state = initialState,
  action: TActions
): TState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        isLoading: false,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        error: true,
        isLoading: false,
      };
    }
    case RESET_ORDER_DETAILS: {
      return {
        ...state,
        orderNumber: 0,
      };
    }
    default:
      return state;
  }
};
