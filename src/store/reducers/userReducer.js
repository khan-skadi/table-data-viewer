import { FETCH_USERS } from '../actions/actionTypes.js';

const initialState = {
  users: [],
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
