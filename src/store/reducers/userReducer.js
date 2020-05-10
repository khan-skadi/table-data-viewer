import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR
} from '../actions/actionTypes.js';

const initialState = {
  users: [],
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    case SEARCH_USERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
