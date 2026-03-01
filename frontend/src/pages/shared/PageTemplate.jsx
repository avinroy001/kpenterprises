import React, { useEffect } from "react";
import HeroSection from "../../components/sections/HeroSection";
import SectionRenderer from "../../components/sections/SectionRenderer";
import NotFoundPage from "../NotFoundPage";
import { usePageContent } from "../../hooks/usePageContent";

function slugToReadableTitle(slug) {
  if (!slug || slug === "home") return "KP Enterprises";
  return String(slug)
    .split("/")
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function DefaultSections({ sections }) {
  return (
    <>
      {(sections || []).map((section, idx) => (
        <SectionRenderer key={`${section.type}-${idx}`} section={section} />
      ))}
    </>
  );
}

function PageTemplate({ slug, SectionsComponent = DefaultSections }) {
  const { page, loading, error } = usePageContent(slug);

  useEffect(() => {
    document.title = `${slugToReadableTitle(slug)} - KP Enterprises`;
  }, [slug]);

  useEffect(() => {
    if (page?.seoTitle) {
      document.title = page.seoTitle;
    } else if (page?.title) {
      document.title = page.title;
    } else {
      document.title = "KP Enterprises";
    }
  }, [page]);

  if (loading) return <p className="container status">Loading...</p>;
  if (error === "not_found") return <NotFoundPage />;
  if (error) return <p className="container status error">{error}</p>;
  if (!page) return <NotFoundPage />;

  return (
    <>
      <HeroSection hero={page.hero} />
      <SectionsComponent sections={page.sections || []} />
    </>
  );
}

export default PageTemplate;
