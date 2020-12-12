import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductDB from "./container/ProductDB";
import Chat from "./container/Chat";
import Admin from "./container/Admin"

function App() {

  return (
    // <ProductDB />

    <Router>
      <Switch>
        <Route exact path={"/"}>
          <Chat />
        </Route>
        <Route exact path={"/admin"}>
          <Admin />
        </Route>
        {/* <Route exact path="/books/:id">
            <Detail />
          </Route> */}
        {/* <Route>
      <NoMatch />
    </Route> */}
      </Switch>
    </Router >


  );
}

export default App;


