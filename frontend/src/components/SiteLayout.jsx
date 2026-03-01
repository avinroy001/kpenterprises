import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import CookieConsentBanner from "./CookieConsentBanner";
import { fetchSite } from "../services/pageApi";

function SiteLayout() {
  const [site, setSite] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchSite(controller.signal).then(setSite).catch(() => setSite(null));
    return () => controller.abort();
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader site={site || {}} />
      <main>
        <Outlet context={{ site }} />
      </main>
      <CookieConsentBanner />
      <SiteFooter site={site || {}} />
    </div>
  );
}

export default SiteLayout;
