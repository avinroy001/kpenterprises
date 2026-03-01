import React from "react";
import { Link } from "react-router-dom";

function shouldShowEyebrow(text) {
  const value = String(text || "").trim();
  if (!value) return false;
  return !/(kp\s*enterprises|kpenterprises)/i.test(value);
}

function ActionLink({ action, variant }) {
  if (!action) return null;
  const isExternal = action.path?.startsWith("mailto:") || action.path?.startsWith("tel:");
  if (isExternal) {
    return (
      <a className={`btn ${variant}`} href={action.path}>
        {action.label}
      </a>
    );
  }
  return (
    <Link className={`btn ${variant}`} to={action.path || "/"}>
      {action.label}
    </Link>
  );
}

function HeroSection({ hero }) {
  if (!hero) return null;
  const showEyebrow = shouldShowEyebrow(hero.eyebrow);

  if (hero.layout === "cover") {
    const coverClassName = `hero-cover${hero.variant ? ` hero-cover-${hero.variant}` : ""}`;

    return (
      <section className={coverClassName} style={{ backgroundImage: `url(${hero.imageUrl || ""})` }}>
        <div className="hero-cover-overlay">
          <div className="container hero-cover-inner">
            {showEyebrow ? <p className="eyebrow">{hero.eyebrow}</p> : null}
            <h1>{hero.heading}</h1>
            {hero.primaryCta ? (
              <ActionLink
                action={hero.primaryCta}
                variant={hero.primaryCtaStyle === "yellow" ? "btn-yellow" : "btn-primary"}
              />
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  const hasImage = Boolean(hero.imageUrl);

  return (
    <section className={`hero ${hasImage ? "hero-split" : ""}`}>
      <div className={hasImage ? "hero-split-inner" : "container hero-inner"}>
        <div className="hero-copy">
          {showEyebrow ? <p className="eyebrow">{hero.eyebrow}</p> : null}
          <h1>{hero.heading}</h1>
          <p className="hero-subtext">{hero.subheading}</p>
          <div className="hero-actions">
            <ActionLink action={hero.primaryCta} variant="btn-primary" />
            {!hasImage ? <ActionLink action={hero.secondaryCta} variant="btn-secondary" /> : null}
          </div>
        </div>
        {hasImage ? (
          <div className="hero-image-wrap">
            <img src={hero.imageUrl} alt={hero.heading || "Hero"} className="hero-image" />
          </div>
        ) : null}
      </div>
      {hasImage ? (
        <div className="container hero-mobile-actions">
          <ActionLink action={hero.secondaryCta} variant="btn-secondary" />
        </div>
      ) : null}
    </section>
  );
}

export default HeroSection;
