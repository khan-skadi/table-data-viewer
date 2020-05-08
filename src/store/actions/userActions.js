import axios from 'axios';
import { FETCH_USERS } from './actionTypes.js';

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
