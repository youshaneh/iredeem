import { AVAILABLE_ONLY, NONSTOP_ONLY, SET_TOKEN, SET_USER_INFO, PUSH_NOTIFICATION, CLEAR_NOTIFICATION } from "./actionTypes";
import { getJwtPayload } from "../utils/utils.js";

const initialState = {
  availableOnly: true,
  nonstopOnly: false,
  token: null,
  userId: null,
  userInfo: null,
  toasts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AVAILABLE_ONLY:
      return { ...state, availableOnly: action.value };
    case NONSTOP_ONLY:
      return { ...state, nonstopOnly: action.value };
    case SET_TOKEN:
      const token = action.value;
      if (token) {
        window.localStorage.token = token;
      }
      else {
        delete window.localStorage.token;
      }
      const userId = token && getJwtPayload(token)?.userId;
      if (token) {
        window.localStorage.userId = userId;
      }
      else {
        delete window.localStorage.userId;
      }
      return { ...state, token, userId };
    case SET_USER_INFO:
      const userInfo = action.value;
      if (userInfo) {
        window.localStorage.userInfo = JSON.stringify(userInfo);;
      }
      else {
        delete window.localStorage.userInfo;
      }
      return { ...state, userInfo };
    case PUSH_NOTIFICATION: {
      let newToastId = (state.toasts.length === 0) ? 0 : state.toasts[state.toasts.length - 1].id + 1;
      let newToasts = [...state.toasts, {
        id: newToastId,
        header: action.value.header,
        body: action.value.body
      }]
      return { ...state, toasts: newToasts };
    }
    case CLEAR_NOTIFICATION: {
      let newToasts = state.toasts.flatMap(toast => (toast.id === action.value) ? [] : [toast]);
      return { ...state, toasts: newToasts };
    }
    default:
      return state;
  }
}
