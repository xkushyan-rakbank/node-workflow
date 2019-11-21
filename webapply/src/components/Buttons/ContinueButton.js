import { styled } from "@material-ui/core/styles";
import { ContainedButton } from "./ContainedButton";

export const ContinueButton = styled(ContainedButton)({
  width: "180px",
  height: "40px",
  borderRadius: "21px ",
  backgroundColor: "#000",
  fontFamily: "Open Sans, sans-serif",
  fontSize: "18px",
  lineHeight: "normal",
  letterSpacing: "normal",
  "& span": {
    justifyContent: "center"
  }
});

ContainedButton.defaultProps = {
  label: "Continue"
};
