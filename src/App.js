import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import Slider from "./components/Slider";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <HeaderBar />
        <Switch>
          <Route exact path="/">
            <Slider />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
