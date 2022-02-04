import React from "react";
import Header from "./Header";
import Grid from "./Grid";
import { Outlet } from "react-router";

export default function HomePage() {
  return (
    <div>
      <Header />
      <Grid />
      <Outlet />
    </div>
  );
}
