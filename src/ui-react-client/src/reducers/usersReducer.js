import * as types from "../constants/usersConstants";

const initialState = {
  data: null,
  loading: false,
  error: null
};

const executeGetUsersData = (state, action) => {
    return {
      ...state,
      data: action.data
    }
}

const executeGetAdUserData = (state, action) => {
  return {
    ...state,
    data: action.data
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USERS:
      return executeGetUsersData(state, action);
    case types.GET_AD_USER:
      return executeGetAdUserData(state, action);
    default: 
      return state;
  }
}

export default reducer;