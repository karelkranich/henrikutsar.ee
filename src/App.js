import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProjectView from "./components/ProjectView";
import Header from "./components/Header";
import Grid from "./components/Grid";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter basename="/">
      <Header />
      <Grid />
      <AnimatePresence>
        <Switch>
          <Route path="/" component={HomePage} exact></Route>
          <Route path={`/:slug`} component={ProjectView}></Route>
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
