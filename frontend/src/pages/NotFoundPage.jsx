import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="container section">
      <h1>Page not found</h1>
      <p>The requested page is not available in local site content.</p>
      <Link className="btn btn-primary" to="/">
        Go Home
      </Link>
    </section>
  );
}

export default NotFoundPage;
