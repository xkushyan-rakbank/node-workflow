import { makeStyles } from "@material-ui/core/styles";

import { routerToAddPaddingInSlider } from "../../constants/styles";
import { mobileResolution } from "../../constants";

export const useStyles = makeStyles({
  formLayout: {
    position: "relative",
    display: "flex",
    height: "100%",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      flexWrap: "wrap"
    },
    "@media only screen and (min-width: 1920px)": {
      maxWidth: "1920px"
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
    padding: "0 15px",
    "& nextButton": {
      margin: "42px 0 0 !important"
    },
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      overflowY: "auto"
    }
  },
  mainContainer: {
    width: "832px",
    minWidth: "40vw",
    maxWidth: "100%",
    margin: "0 auto",
    padding: ({ pathname }) => (routerToAddPaddingInSlider.includes(pathname) ? "0" : "35px 0 0"),
    paddingTop: "35px",
    "@media only screen and (min-width: 1920px)": {
      minWidth: "auto"
    }
  },
  mainContainerFullHeight: {
    padding: "0 50px 0"
  }
});
