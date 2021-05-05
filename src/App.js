import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

//Import components
import Home from "./containers/Home";
import Offer from "./containers/Offer";

//Import components end

function App() {
  return (
    <Router>
      <div className="container">
        {/* <h1>
          <Link to="/">Home</Link>
        </h1>
        <h1>
          <Link to="/offer">Offer</Link>
        </h1> */}

        <Switch>
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
