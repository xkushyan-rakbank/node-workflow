import React from "react";

import { Icon, ICONS } from "../components/Icons";

export default {
  title: "Icons"
};

export const icons = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
      textAlign: "center"
    }}
  >
    {Object.keys(ICONS).map((icon, index) => {
      return (
        <div
          key={index}
          style={{
            border: "1px dashed",
            padding: "10px 5px",
            margin: "0 0 -1px -1px"
          }}
        >
          <pre style={{ fontSize: "13px", margin: 0 }}>{icon}</pre>
          <Icon name={ICONS[icon]} style={{ marginTop: "10px" }} />
        </div>
      );
    })}
  </div>
);

icons.story = {
  name: "Icons"
};
