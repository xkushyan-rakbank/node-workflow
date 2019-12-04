import React from "react";
import { styled } from "@material-ui/styles";

import { ICONS, iconComponents } from "./icons";

const Icon = ({ className, name, ...props }) => {
  const IconComponent = iconComponents[name];
  if (!IconComponent) {
    return null;
  }
  const IconStyled = styled(IconComponent)({
    display: "inline-block"
  });
  return <IconStyled className={className} {...props} />;
};

export { Icon, ICONS };
