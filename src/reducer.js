import { combineReducers } from 'redux'

const availableOnly = (state = true, action) => {
  switch (action.type) {
    case 'AVAILABLE_ONLY':
      return action.value;
    default:
      return state;
  }
}

const nonstopOnly = (state = false, action) => {
  switch (action.type) {
    case 'NONSTOP_ONLY':
      return action.value;
    default:
      return state;
  }
}

export default combineReducers({
  nonstopOnly,
  availableOnly
})