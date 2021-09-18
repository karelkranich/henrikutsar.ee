import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProjectView from "./components/ProjectView";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter basename="/">
      <HomePage />
      <AnimatePresence>
        <Switch>
          {/* <Route path="/" component={HomePage} exact></Route> */}
          <Route path={`/:slug`} component={ProjectView}></Route>
        </Switch>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
