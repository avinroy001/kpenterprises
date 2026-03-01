import React from "react";
import { useLocation } from "react-router-dom";
import HomePage from "./home/HomePage";
import ContactPage from "./contact/ContactPage";
import ServicesPage from "./services/ServicesPage";
import AboutPage from "./about/AboutPage";
import BlogPage from "./blog/BlogPage";
import GenericPage from "./generic/GenericPage";
import { pathnameToSlug } from "../utils/slug";

function PageResolver() {
  const location = useLocation();
  const slug = pathnameToSlug(location.pathname);

  if (slug === "home") return <HomePage />;
  if (slug === "contact") return <ContactPage />;
  if (slug === "services") return <ServicesPage />;
  if (slug === "about-us") return <AboutPage />;
  if (slug === "blog") return <BlogPage />;

  return <GenericPage slug={slug} />;
}

export default PageResolver;
