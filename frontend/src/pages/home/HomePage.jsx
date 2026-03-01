import React from "react";
import "./home.css";
import PageTemplate from "../shared/PageTemplate";
import HomeSections from "./components/HomeSections";

function HomePage() {
  return <PageTemplate slug="home" SectionsComponent={HomeSections} />;
}

export default HomePage;
