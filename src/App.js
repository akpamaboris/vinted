import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useState } from "react";

import Cookies from "js-cookie";

import "./App.css";

//Import components
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Header from "./containers/Header";
import Publish from "./containers/Publish";

//Import components end
import Login from "./containers/Login";
import Register from "./containers/Register";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("tokenVinted"));

  const setUser = (token) => {
    if (token) {
      Cookies.set("tokenVinted", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  return (
    <Router>
      <Header userToken={userToken} setUser={setUser} />

      <div className="container">
        <Switch>
          <Route path="/publish">
            <Publish userToken={userToken} setUser={setUser} />
          </Route>
          <Route path="/login">
            <Login userToken={userToken} setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
