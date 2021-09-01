import React, { useState } from "react";
import { useEffect } from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import Slider from "./components/Slider";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  },[isAuthenticated]);

  function checkAuthentication() {
    fetch("https://localhost:5001/api/account/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (response) => {
        if(response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setName(data.login);
          setRole(data.role);
          setIsLoading(false);
        }
        else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
  }

    return (
      <Router>
        <HeaderBar mode={isAuthenticated}/>
        
        <Switch>
        {isLoading ? <div>Loading...</div> : 
        <>
        <Route exact path="/">
        {!isAuthenticated ?
          <Slider />
          :  <>
          <NavBar />
          </>}
          </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <UnauthenticatedRoute path="/login" component={LoginForm} appProps={{isAuthenticated, setIsAuthenticated}}/>
        <AuthenticatedRoute path="/profile" component={Profile} appProps={{ isAuthenticated,name,role }}/>
        <Route path="/logout">
          <Logout setMode={setIsAuthenticated} setName={setName} setRole={setRole}/>
        </Route>
        </>
        }
        </Switch>
      </Router>
    );
}

export default App;
