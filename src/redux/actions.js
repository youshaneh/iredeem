import { AVAILABLE_ONLY, NONSTOP_ONLY } from "./actionTypes";

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
