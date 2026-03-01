import React from "react";
import "./about.css";
import PageTemplate from "../shared/PageTemplate";
import AboutSections from "./components/AboutSections";

function AboutPage() {
  return <PageTemplate slug="about-us" SectionsComponent={AboutSections} />;
}

export default AboutPage;
