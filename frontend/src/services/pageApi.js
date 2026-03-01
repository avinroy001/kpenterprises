import siteContent from "../data/site-content.json";

function withAbort(signal, producer) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      const error = new DOMException("Aborted", "AbortError");
      reject(error);
      return;
    }

    const onAbort = () => {
      const error = new DOMException("Aborted", "AbortError");
      reject(error);
    };

    signal?.addEventListener("abort", onAbort, { once: true });

    try {
      const value = producer();
      resolve(value);
    } catch (err) {
      reject(err);
    } finally {
      signal?.removeEventListener("abort", onAbort);
    }
  });
}

function normalizeSlug(slug) {
  const normalized = String(slug || "").replace(/^\/+|\/+$/g, "") || "home";

  const aliases = {
    "onpage-seo": "onpage-seo-services",
    "on-page-seo": "onpage-seo-services",
    "on-page-seo-services": "onpage-seo-services",
    "off-page-seo-service": "offpage-seo-service",
    "offpage-seo": "offpage-seo-service",
  };

  return aliases[normalized] || normalized;
}

export function fetchSite(signal) {
  return withAbort(signal, () => siteContent.site || {});
}

export function fetchPages(signal) {
  return withAbort(signal, () =>
    (siteContent.pages || []).map((page) => ({
      slug: page.slug,
      path: page.path,
      title: page.title,
      seoTitle: page.seoTitle,
    }))
  );
}

export function fetchPageBySlug(slug, signal) {
  return withAbort(signal, () => {
    const target = normalizeSlug(slug);
    const page = (siteContent.pages || []).find((x) => x.slug === target);
    if (!page) {
      const error = new Error("Request failed with status 404");
      error.status = 404;
      throw error;
    }
    return page;
  });
}
