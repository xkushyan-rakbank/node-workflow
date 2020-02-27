import { makeStyles } from "@material-ui/core/styles";
import { portraitOrientationQueryIPads } from "../../../../constants/styles";

export const useStyles = makeStyles(theme => ({
  cardsContainer: {
    display: "flex",
    flexWrap: "nowrap",
    overflow: "hidden",
    margin: "20px -26px 0",
    padding: "0 16px 25px",
    [portraitOrientationQueryIPads]: {
      flexDirection: "column"
    },
    [theme.breakpoints.only("sm")]: {
      marginLeft: 0,
      marginRight: 0,
      paddingLeft: 0,
      paddingRight: 0,
      justifyContent: "space-around"
    },
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
      marginLeft: -16,
      marginRight: -16,
      marginBottom: -25,
      paddingLeft: 0,
      paddingRight: 0,
      overflowX: "auto"
    }
  },
  cardsContainerItem: {
    padding: "0 10px",
    width: "33.333%",
    [theme.breakpoints.only("sm")]: {
      padding: "0 8px"
    },
    [theme.breakpoints.only("xs")]: {
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
