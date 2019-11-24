import React from "react";
import { ICONS, iconComponents } from "./icons";
import { styled } from "@material-ui/styles";

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
