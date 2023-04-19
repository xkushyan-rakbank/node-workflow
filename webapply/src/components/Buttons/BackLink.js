import React, { memo } from "react";
import { Link } from "react-router-dom";
import { styled } from "@material-ui/styles";

import { theme } from "../../theme";

import { ReactComponent as Icon } from "./../../assets/icons/backArrow.svg";

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

const BackLinkBase = ({ text = "Back", className = "", path, ...props }) => (
  <Root className={className} to={path} replace {...props}>
    <ArrowBack alt="back" />
    <Text>{text}</Text>
  </Root>
);

const areEqual = (prevProps, nextProps) =>
  prevProps.text === nextProps.text &&
  JSON.stringify(prevProps.path) === JSON.stringify(nextProps.path);

export const BackLink = memo(BackLinkBase, areEqual);
