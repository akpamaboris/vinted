import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
