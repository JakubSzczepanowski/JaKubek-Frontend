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
import FilesList from "./components/FilesList";
import Logout from "./components/Logout";
import UserFiles from "./components/UserFiles";
import EditFile from "./components/EditFile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect')
    checkAuthentication();
  },[isAuthenticated]);

  async function checkAuthentication() {
    await fetch("https://localhost:5001/api/account/user", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(async (response) => {
        if(response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setName(data.login);
          setRole(data.role);
        }
        else {
          setIsAuthenticated(false);
        }
      })
      .catch((error) => {
        setIsAuthenticated(false);
      });
      setIsLoading(false);
      console.log('Zmieniono loading czyli powinny się wyrenderować routey')
  }

  function RenderRouter() {
    return (
      <Router>
        <HeaderBar mode={isAuthenticated}/>
        
        <Switch>
        
        <Route exact path="/">
        {!isAuthenticated ?
          <Slider />
          :  <>
          <NavBar />
          <FilesList />
          </>}
          </Route>
        <UnauthenticatedRoute path="/register" component={RegisterForm} appProps={{isAuthenticated}} />
        <UnauthenticatedRoute path="/login" component={LoginForm} appProps={{isAuthenticated, setIsAuthenticated}}/>
        <AuthenticatedRoute path="/profile" component={Profile} appProps={{ isAuthenticated,name,role }}/>
        <AuthenticatedRoute path="/myfiles" component={UserFiles} appProps={{ isAuthenticated, name }}/>
        <Route path="/logout">
          <Logout setMode={setIsAuthenticated} setName={setName} setRole={setRole}/>
        </Route>
        
        </Switch>
      </Router>
    );
  }

    return (<>
      {isLoading ? <div>Loading...</div> : 
      RenderRouter()
    }</>
    );
}

export default App;
