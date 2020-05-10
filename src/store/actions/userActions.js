import axios from 'axios';
import {
  FETCH_USERS,
  SEARCH_USERS_SUCCESS,
  SEARCH_USERS_ERROR
} from './actionTypes.js';

export const fetchTenUsers = () => async dispatch => {
  try {
    const res = await axios.get('/users');
    const data = res.data.slice(0, 10);
    console.log(res);

    dispatch({
      type: FETCH_USERS,
      payload: data
    });
  } catch (err) {
    console.log(err);
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
