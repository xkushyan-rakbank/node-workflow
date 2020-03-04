import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import { styled, withTheme } from "@material-ui/styles";

import { ContainedButton } from "./ContainedButton";

export const ButtonWrapper = styled(Grid)({
  margin: "42px 0 0"
});

export const Button = styled(withTheme(ContainedButton))(({ theme }) => ({
  width: "192px",
  fontWeight: 600,
  letterSpacing: "normal",

  "&:disabled": {
    color: theme.palette.common.white
  }
}));

export const Base = ({ justify, submitButtonClassName, ...rest }) => (
  <ButtonWrapper
    container
    direction="row"
    justify={justify}
    alignItems="center"
    className={submitButtonClassName}
  >
    <Button type="submit" withRightArrow {...rest} />
  </ButtonWrapper>
);

export const SubmitButton = memo(Base);
