import React from "react";
import SectionRenderer from "../../../components/sections/SectionRenderer";

function ServicesSections({ sections }) {
  return (
    <>
      {(sections || []).map((section, idx) => (
        <SectionRenderer key={`${section.type}-${idx}`} section={section} />
      ))}
    </>
  );
}

export default ServicesSections;
