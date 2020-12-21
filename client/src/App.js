import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ProductDB from "./container/ProductDB";
import Chat from "./container/Chat";
import Admin from "./container/Admin"
import Buy from "./pages/Buy"
import Search from "./pages/Search"
import Add from "./pages/Add"
import View from "./pages/View"
import Manage from "./pages/Manage"
import Edit from "./pages/Edit"

import Alert from './components/SnackBar/SnackBar'

import AppBar from './components/AppBar/AppBar'

function App() {

  return (
    <Router>
      <AppBar />
      <div className={'Container'}>
        <Switch>
          <Route exact path={"/"}>
            <Buy />
          </Route>
          <Route exact path={"/search/:id"}>
            <Search />
          </Route>
          <Route exact path={"/sell"}>
            <Manage />
          </Route>
          <Route exact path={"/sell/add"}>
            <Add />
          </Route>
          <Route exact path={"/edit/:id"}>
            <Edit />
          </Route>
          <Route exact path={"/product/:id"}>
            <View />
          </Route>
          <Route exact path={"/offers"}>
            <Alert />
          </Route>
          {/* <Route>
      <NoMatch />
    </Route> */}
        </Switch>
      </div>
    </Router >
  );
}

export default App;


