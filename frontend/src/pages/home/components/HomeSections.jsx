import React from "react";
import SectionRenderer from "../../../components/sections/SectionRenderer";

function HomeSections({ sections }) {
  return (
    <>
      {(sections || []).map((section, idx) => (
        <SectionRenderer key={`${section.type}-${idx}`} section={section} />
      ))}
    </>
  );
}

export default HomeSections;
