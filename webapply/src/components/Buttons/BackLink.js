import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/styles";

import { ReactComponent as Icon } from "./../../assets/icons/backArrow.svg";
import { theme } from "../../theme";

export const ArrowBack = styled(Icon)({
  width: "18px"
});

export const Root = styled(Link)({
  marginRight: "20px",
  display: "flex",
  alignItems: "center"
});

export const Text = styled("span")({
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "underline"
});

Text.defaultProps = {
  style: theme.palette.text
};

export const BackLink = ({ classeName = "", path }) => (
  <Root className={classeName} to={path}>
    <ArrowBack alt="back" />
    <Text>Go back</Text>
  </Root>
);
