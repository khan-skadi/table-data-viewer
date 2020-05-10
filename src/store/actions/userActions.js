import axios from 'axios';
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR
} from './actionTypes.js';

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/users');

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_USERS_ERROR,
      payload: err.message
    });
  }
};

export const searchUsers = text => async dispatch => {
  try {
    const res = await axios.get(`/users?q=${text}`);
    console.log(text);
    console.log(res.data);

    dispatch({
      type: SEARCH_USERS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: SEARCH_USERS_ERROR,
      payload: err.message
    });
  }
};
