import { withStyles } from "@material-ui/core/styles";

import { ContainedButton } from "../../../components/Buttons/ContainedButton";

export const WhiteContainedButton = withStyles(() => ({
  buttonStyle: {
    boxShadow: "none",
    border: "solid 1px #373737",
    backgroundColor: "#fff",
    width: 160,
    height: 32,
    padding: "0 10px",
    "@media only screen and (max-width: 991px)": {
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
    "@media only screen and (max-width: 991px)": {
      fontSize: 12
    }
  }
}))(ContainedButton);
