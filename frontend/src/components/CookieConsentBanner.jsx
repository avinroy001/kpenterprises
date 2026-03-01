import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CONSENT_KEY = "kp_cookie_consent";
const VALID_CHOICES = new Set(["accepted", "declined"]);

function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const savedChoice = window.localStorage.getItem(CONSENT_KEY);
      if (!savedChoice || !VALID_CHOICES.has(savedChoice)) {
        // Recover from stale/invalid values and show banner again.
        window.localStorage.removeItem(CONSENT_KEY);
        setVisible(true);
      }
    } catch {
      // If storage is blocked, keep banner visible as fallback.
      setVisible(true);
    }
  }, []);

  const saveChoice = (choice) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      // No-op: still hide banner for current session.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-banner-inner">
        <p>
          We use cookies to improve your experience and understand site usage. You can accept all cookies or decline
          non-essential cookies.
        </p>
        <div className="cookie-banner-actions">
          <button type="button" className="btn btn-primary cookie-btn-accept" onClick={() => saveChoice("accepted")}>
            Accept All
          </button>
          <button type="button" className="cookie-btn-decline" onClick={() => saveChoice("declined")}>
            Decline
          </button>
          <Link to="/privacy-policy" className="cookie-link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default CookieConsentBanner;
