import { makeStyles } from "@material-ui/core/styles";

import { mobileResolution } from "../../../../constants";

export const useStyles = makeStyles({
  icon: {
    fontSize: "55px",
    color: "green"
  },
  firstGroup: {
    width: "100%",
    marginTop: 40
  },
  indent: {
    margin: "0 -10px 30px",
    paddingTop: 20
  },
  secondGroup: {
    height: "300px",
    width: "100%",
    display: "flex",
    "& span": {
      maxWidth: "380px"
    },
    "& img": {
      maxWidth: "100%"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "auto",
      flexWrap: "wrap"
    }
  },
  title: {
    color: "#373737",
    fontSize: 20,
    margin: "22px 0 0 0",
    fontWeight: "600"
  },
  info: {
    color: "#373737",
    fontSize: 18
  }
});
