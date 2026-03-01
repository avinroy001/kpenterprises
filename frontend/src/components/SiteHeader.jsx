import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function SiteHeader({ site }) {
  const location = useLocation();
  const navItems = site?.nav || [];
  const quoteCta = site?.quoteCta;
  const [openMenu, setOpenMenu] = useState("");
  const [activeServicesItem, setActiveServicesItem] = useState("SEO Services");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  const openByHover = (label) => {
    setOpenMenu(label);
    if (label === "Services") {
      setActiveServicesItem("SEO Services");
    }
  };
  const closeHover = () => setOpenMenu("");
  const toggleMenu = (label) =>
    setOpenMenu((current) => {
      const next = current === label ? "" : label;
      if (next === "Services") {
        setActiveServicesItem("SEO Services");
      }
      return next;
    });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenMenu("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setOpenMenu("");
    setActiveServicesItem("SEO Services");
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isScrollingDown = currentY > lastScrollY.current;

      if (currentY <= 10) {
        setIsHeaderVisible(true);
      } else if (isScrollingDown && currentY > 120) {
        setIsHeaderVisible(false);
        setOpenMenu("");
      } else {
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${isHeaderVisible ? "header-visible" : "header-hidden"}`}
      onMouseLeave={closeHover}
    >
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="KP Enterprises Home">
          {site?.logoRectangle ? (
            <img
              src={site.logoRectangle}
              alt={`${site?.brandText || "KP Enterprises"} logo`}
              className="brand-logo-rect"
            />
          ) : (
            <span className="brand-text">{site?.brandText || "KP Enterprises"}</span>
          )}
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="nav-item-wrap"
              onMouseEnter={() => {
                if (item.dropdown) openByHover(item.label);
              }}
              onFocusCapture={() => {
                if (item.dropdown) openByHover(item.label);
              }}
            >
              {item.dropdown ? (
                <button
                  type="button"
                  className="nav-main-btn"
                  aria-expanded={openMenu === item.label}
                  aria-controls={`menu-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => toggleMenu(item.label)}
                >
                  <span>{item.label}</span>
                  <span className="nav-arrow">▾</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {item.label}
                </NavLink>
              )}
              {item.dropdown && openMenu === item.label ? (
                (() => {
                  const columns = item.dropdown.columns || [];
                  const isServicesMenu = item.label === "Services" && columns.length >= 2;

                  if (!isServicesMenu) {
                    return (
                      <div
                        id={`menu-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                        className={`mega-menu ${item.dropdown.columns?.length === 1 ? "single-col" : ""}`}
                        role="menu"
                      >
                        {columns.map((column) => (
                          <div className="mega-col" key={column.title || column.items?.[0]?.label}>
                            {column.title ? <h4>{column.title}</h4> : null}
                            <ul>
                              {(column.items || []).map((sub) => (
                                <li key={sub.path}>
                                  <Link to={sub.path} role="menuitem" onClick={closeHover}>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    );
                  }

                  const primaryColumn = columns[0] || {};
                  const secondaryColumn = columns[1] || {};
                  const shouldShowSecondary = activeServicesItem === "SEO Services";

                  return (
                    <div
                      id={`menu-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                      className="mega-menu"
                      role="menu"
                    >
                      <div className="mega-col">
                        {primaryColumn.title ? <h4>{primaryColumn.title}</h4> : null}
                        <ul>
                          {(primaryColumn.items || []).map((sub) => {
                            const isActivePrimary = activeServicesItem === sub.label;
                            const isSeoTrigger = sub.label === "SEO Services" || sub.path === "/services";
                            return (
                              <li key={sub.path}>
                                {isSeoTrigger ? (
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onMouseEnter={() => setActiveServicesItem(sub.label)}
                                    onFocus={() => setActiveServicesItem(sub.label)}
                                    className={`mega-link mega-link-button ${isActivePrimary ? "submenu-active" : ""}`}
                                  >
                                    <span>{sub.label}</span>
                                  </button>
                                ) : (
                                  <Link
                                    to={sub.path}
                                    role="menuitem"
                                    onClick={closeHover}
                                    onMouseEnter={() => setActiveServicesItem(sub.label)}
                                    onFocus={() => setActiveServicesItem(sub.label)}
                                    className={`mega-link ${isActivePrimary ? "submenu-active" : ""}`}
                                  >
                                    <span>{sub.label}</span>
                                  </Link>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="mega-col">
                        {shouldShowSecondary ? (
                          <>
                            {secondaryColumn.title ? <h4>{secondaryColumn.title}</h4> : null}
                            <ul>
                              {(secondaryColumn.items || []).map((sub) => (
                                <li key={sub.path}>
                                  <Link to={sub.path} role="menuitem" onClick={closeHover}>
                                    {sub.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        ) : null}
                      </div>
                    </div>
                  );
                })()
              ) : null}
            </div>
          ))}
        </nav>
        <div className="header-actions">
          {quoteCta ? (
            <Link className="quote-btn" to={quoteCta.path}>
              {quoteCta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
