import { makeStyles } from "@material-ui/core/styles";
import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    margin: "20px -26px -25px",
    padding: "0 16px 25px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    },
    [theme.breakpoints.only("md")]: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: "space-around"
    },
    [theme.breakpoints.only("sm")]: {
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
    [theme.breakpoints.only("md")]: {
      padding: "0 8px"
    },
    [theme.breakpoints.only("sm")]: {
      minWidth: "min-content",
      "&:first-child": {
        paddingLeft: 16
      },
      "&:last-child": {
        paddingRight: 16
      }
    }
  }
}));
