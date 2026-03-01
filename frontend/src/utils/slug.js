export function pathnameToSlug(pathname) {
  const cleaned = String(pathname || "/")
    .replace(/\/+$/g, "")
    .replace(/^\//, "");

  const normalized = cleaned === "" ? "home" : cleaned;

  const aliases = {
    "onpage-seo": "onpage-seo-services",
    "on-page-seo": "onpage-seo-services",
    "on-page-seo-services": "onpage-seo-services",
    "off-page-seo-service": "offpage-seo-service",
    "offpage-seo": "offpage-seo-service"
  };

  return aliases[normalized] || normalized;
}

export function slugToPath(slug) {
  return slug === "home" ? "/" : `/${slug}`;
}
