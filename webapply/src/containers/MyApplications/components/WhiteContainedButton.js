import { withStyles } from "@material-ui/core/styles";

import { ContainedButton } from "../../../components/Buttons/ContainedButton";

export const WhiteContainedButton = withStyles(theme => ({
  buttonStyle: {
    boxShadow: "none",
    border: "solid 1px #373737",
    backgroundColor: "#fff",
    width: 160,
    height: 32,
    padding: "0 10px",
    [theme.breakpoints.only("sm")]: {
      width: "130px"
    },
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  labelStyle: {
    color: "#373737",
    fontSize: 14,
    justifyContent: "center",
    [theme.breakpoints.only("sm")]: {
      fontSize: 12
    }
  }
}))(ContainedButton);
