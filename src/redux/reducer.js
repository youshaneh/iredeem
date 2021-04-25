import { AVAILABLE_ONLY, NONSTOP_ONLY } from "./actionTypes";

const initialState = {
  availableOnly: true,
  nonstopOnly: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AVAILABLE_ONLY:
      return { ...state, availableOnly: action.value };
    case NONSTOP_ONLY:
      return { ...state, nonstopOnly: action.value };
    default:
      return state;
  }
}