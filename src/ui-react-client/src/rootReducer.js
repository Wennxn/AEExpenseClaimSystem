import { combineReducers } from "redux";
import users from "./reducers/usersReducer";
import expenses from "./reducers/expensesReducer";

export default combineReducers({
  users,
  expenses
});