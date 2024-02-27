import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import { styled, withTheme } from "@material-ui/styles";

import { ContainedButton } from "./ContainedButton";

export const ButtonWrapper = styled(Grid)({
  margin: "42px 0 0"
});
//using this button in KFS Dialog
export const Button = styled(withTheme(ContainedButton))(({ theme }) => ({
  fontWeight: 500,
  letterSpacing: "normal",
  minWidth: "130px",
  borderRadius: "100px",
  [theme.breakpoints.only("md")]: {
    fontSize: "1.125rem",
    height: "unset",
    minHeight: "auto",
    padding: "12px 30px",
    lineHeight: "20px"
  },

  "&:disabled": {
    color: theme.palette.common.white
  }
}));

export const SubmitButtonBase = ({
  justify,
  submitButtonClassName,
  type = "submit",
  isSearchApplicant = false,
  ...rest
}) => (
  <ButtonWrapper
    container
    direction="row"
    justifyContent={justify}
    alignItems="center"
    className={submitButtonClassName}
  >
    <Button type={type} isSearchApplicant={isSearchApplicant} withRightArrow {...rest} />
  </ButtonWrapper>
);

export const SubmitButton = memo(SubmitButtonBase);
