import { makeStyles } from "@material-ui/core/styles";
import { mobileResolution } from "../../../../constants";

import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles({
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "auto",
    margin: "20px -26px -25px",
    padding: "0 16px 25px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      marginLeft: -16,
      marginRight: -16,
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  cardsContainerItem: {
    padding: "0 10px",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      "&:first-child": {
        paddingLeft: 16
      },
      "&:last-child": {
        paddingRight: 16
      }
    }
  }
});
