import React from "react";
import "./generic.css";
import PageTemplate from "../shared/PageTemplate";
import GenericSections from "./components/GenericSections";

function GenericPage({ slug }) {
  return <PageTemplate slug={slug} SectionsComponent={GenericSections} />;
}

export default GenericPage;
