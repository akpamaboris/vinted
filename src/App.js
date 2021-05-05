import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";

//Import components
import Home from "./containers/Home";
import Offer from "./containers/Offer";

//Import components end

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/offer/:id">
            <Offer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found!</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};
export default App;
