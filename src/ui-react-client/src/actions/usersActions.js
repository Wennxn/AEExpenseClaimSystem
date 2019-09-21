import * as types from "../constants/usersConstants";
import axios from 'axios';
import { getToken } from "../config/adalConfig";

const getUsersData = (data) => {
  return {
    type: types.GET_ALL_USERS,
    data: data
  }
}

const getAdUserData  = (data) => {
  return {
    type: types.GET_AD_USER,
    data: data
  }
}

const headers = { Authorization: `Bearer ${getToken()}`}

export const getUsers = () => {
  return(dispatch) => {
    axios.get(process.env.REACT_APP_SVC_ROOT + `users/all`, { headers })
    .then(response => {
      dispatch(getUsersData(response.data));
    })
    .catch(error => {
      // handle error
    })
  }
}

export const getAdUser = () => {
  return(dispatch) => {
    axios.get(process.env.REACT_APP_SVC_ROOT + `users/ad`, { headers })
    .then(response => {
      dispatch(getAdUserData(response.data));
    })
    .catch(error => {
      // handle error
    })
  }
}