import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution, tabletResolution } from "../../../../constants";

import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles({
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    margin: "20px -26px -25px",
    padding: "0 16px 25px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    },
    [`@media only screen and
     (max-width: ${tabletResolution}px) and
     (min-width: ${mobileResolution}px)`]: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: "space-around"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 0,
      paddingRight: 0,
      overflowX: "auto"
    }
  },
  cardsContainerItem: {
    padding: "0 10px",
    width: "33.333%",
    [`@media only screen and
     (max-width: ${tabletResolution}px) and
     (min-width: ${mobileResolution}px)`]: {
      padding: "0 8px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: "min-content",
      "&:first-child": {
        paddingLeft: 16
      },
      "&:last-child": {
        paddingRight: 16
      }
    }
  }
});
