import { AVAILABLE_ONLY, NONSTOP_ONLY, SET_TOKEN, SET_USER_INFO, PUSH_NOTIFICATION, CLEAR_NOTIFICATION } from "./actionTypes";

export const setAvailableOnly = (value) => {
  return {
    type: AVAILABLE_ONLY,
    value
  }
}

export const setNonstopOnly = (value) => {
  return {
    type: NONSTOP_ONLY,
    value
  }
}

export const setToken = (value) => {
  return {
    type: SET_TOKEN,
    value
  }
}

export const setUserInfo = (value) => {
  return {
    type: SET_USER_INFO,
    value
  }
}

export const pushNotification = (value) => {
  return {
    type: PUSH_NOTIFICATION,
    value
  }
}

export const clearNotification = (value) => {
  return {
    type: CLEAR_NOTIFICATION,
    value
  }
}
