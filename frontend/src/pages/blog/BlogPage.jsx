import React from "react";
import "./blog.css";
import PageTemplate from "../shared/PageTemplate";
import BlogSections from "./components/BlogSections";

function BlogPage() {
  return <PageTemplate slug="blog" SectionsComponent={BlogSections} />;
}

export default BlogPage;
