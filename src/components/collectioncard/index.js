import React from "react";
import Detail from "./detail";
import Default from "./default";

export default function CollectionCard({ isMobile, type, ...props }) {
  const Template = [
    {
      id: "default",
      component: Default,
    },
    {
      id: "detail",
      component: Detail,
    },
  ];
  return Template.filter((item) => item.id === type).map((style, idx) => (
    <style.component key={String(idx)} {...props}
    />
  ))
}

CollectionCard.defaultProps = {
  type: "default"
};
