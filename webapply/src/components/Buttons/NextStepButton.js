import { styled } from "@material-ui/styles";

import { SubmitButton } from "./SubmitButton";

export const NextStepButton = styled(SubmitButton)(({ theme }) => ({
  padding: "10px 40px",
  borderRadius: "100px",
  [theme.breakpoints.up("lg")]: {
    fontSize: "1.25rem",
    padding: "12px 45px"
  }
}));
