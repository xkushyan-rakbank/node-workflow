import React from "react";
import { styled } from "@material-ui/styles";

const Button = styled("button")({
  position: "absolute",
  top: "30px",
  right: "-90px",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 600,
  color: "#263d4c",
  border: "none",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  padding: "0",
  outline: "none",
  "&[disabled]": {
    opacity: "0.5"
  },
  "@media only screen and (max-width: 959px)": {
    top: "80px",
    right: "12px"
  }
});

const Text = styled("span")({
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#86868b",
  fontWeight: 600,
  fontStyle: "normal",
  fontStretch: "normal",
  textDecoration: "underline"
});

export const RemoveButton = ({ className = "", title = "Remove", ...rest }) => (
  <Button className={className} type="button" {...rest}>
    <Text>{title}</Text>
  </Button>
);
