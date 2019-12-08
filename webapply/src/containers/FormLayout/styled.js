import { makeStyles } from "@material-ui/core/styles";

import { routerToAddPaddingInSlider } from "../../constants/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  formLayout: {
    display: "flex",
    height: "100%",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      flexWrap: "wrap"
    }
  },
  formWrapper: {
    flexBasis: "0%",
    flex: "1 1 auto",
    minHeight: "0px",
    minWidth: "1px",
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "0",
      color: "#373737",
      "@media only screen and (max-width: 1100px)": {
        fontSize: "27px"
      }
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      paddingBottom: 40
    }
  },
  formInner: {
    display: "flex",
    height: "100%",
    "& nextButton": {
      margin: "42px 0 0 !important"
    },
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      overflowY: "auto"
    }
  },
  mainContainer: {
    width: "832px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: ({ pathname }) => (routerToAddPaddingInSlider.includes(pathname) ? "0" : "35px 0 0"),
    paddingTop: "35px"
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  }
});
