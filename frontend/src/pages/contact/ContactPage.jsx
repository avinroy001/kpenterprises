import React from "react";
import "./contact.css";
import PageTemplate from "../shared/PageTemplate";
import ContactSections from "./components/ContactSections";

function ContactPage() {
  return <PageTemplate slug="contact" SectionsComponent={ContactSections} />;
}

export default ContactPage;
