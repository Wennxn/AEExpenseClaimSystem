import * as types from "../constants/expensesConstants";

const initialState = {
  data: null,
  loading: false,
  error: null
};

const executeGetExpensesData = (state, action) => {
    return {
        ...state,
        data: action.data
    }
}
 
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_EXPENSES:
      return executeGetExpensesData(state, action);
    default: 
      return state;
  }
}

export default reducer;