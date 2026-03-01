import React from "react";
import { Link } from "react-router-dom";

function SiteFooter({ site }) {
  const footer = site?.footer || {};
  const quickLinks = footer.quickLinks || [];
  const serviceLinks = footer.serviceLinks || [];
  const emails = Array.isArray(footer.emails)
    ? footer.emails
    : footer.email
      ? [footer.email]
      : [];

  return (
    <footer className="site-footer">
      <div className="container footer-grid footer-grid-4">
        <div className="footer-brand-col">
          {footer.logoUrl ? <img src={footer.logoUrl} alt="KP Enterprises" className="footer-logo" /> : null}
          <p>{footer.description}</p>
          <p className="footer-rights">© All Rights Reserved. {footer.companyName}</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul className="footer-list">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Our Services</h4>
          <ul className="footer-list">
            {serviceLinks.map((item) => (
              <li key={item.path}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Get In Touch</h4>
          <p>{footer.phone}</p>
          {emails.map((email) => (
            <p key={email}>{email}</p>
          ))}
          <p>{footer.address}</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
