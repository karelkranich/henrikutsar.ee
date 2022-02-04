import React from "react";
import HomePage from "./components/HomePage";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import ProjectView from "./Pages/ProjectView";
// import Admin from "./components/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path={`:slug`} element={<ProjectView />} />
        </Route>
        {/* <Route path={`/admin`} element={<Admin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
