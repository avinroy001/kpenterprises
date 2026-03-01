import React from "react";
import "./services.css";
import PageTemplate from "../shared/PageTemplate";
import ServicesSections from "./components/ServicesSections";

function ServicesPage() {
  return <PageTemplate slug="services" SectionsComponent={ServicesSections} />;
}

export default ServicesPage;
