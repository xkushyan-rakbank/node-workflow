import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import { styled, withTheme } from "@material-ui/styles";

import { ContainedButton } from "./ContainedButton";

export const ButtonWrapper = styled(Grid)({
  margin: "42px 0 0"
});
//using this button in KFS Dialog
export const Button = styled(withTheme(ContainedButton))(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "normal",

  "&:disabled": {
    color: theme.palette.common.white
  }
}));

export const SubmitButtonBase = ({ justify, submitButtonClassName, type = "submit", ...rest }) => (
  <ButtonWrapper
    container
    direction="row"
    justify={justify}
    alignItems="center"
    className={submitButtonClassName}
  >
    <Button type={type} withRightArrow {...rest} />
  </ButtonWrapper>
);

export const SubmitButton = memo(SubmitButtonBase);
