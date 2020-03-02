import React from "react";
import { styled, withTheme } from "@material-ui/styles";

import { SubmitButton } from "./SubmitButton";

export const StyledSubmitButton = styled(withTheme(SubmitButton))(({ theme }) => ({
  padding: "15px 32px",
  borderRadius: "28px"
}));

export const NextStepButton = props => <StyledSubmitButton {...props} />;
