import React, { Component } from "react";
//Import all needed Components
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import Users from './Users'
import Expenses from './Expenses'

class App extends Component {
  render() {
    return (
      <Router>
      <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
      </ul>
       {/*All our Routes goes here!*/}
       <Route exact path="/" component={Home} />
       <Route path="/users" component={Users}/>
       <Route path="/expenses" component={Expenses}/>
       </div>
      </Router>
    );
  }
}

export default App;