import { makeStyles } from "@material-ui/core/styles";
import { theme } from "../../../../theme";

export const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: "55px",
    color: "green"
  },
  firstGroup: {
    width: "100%",
    marginTop: 15
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
      maxWidth: "100%",
      objectFit: "contain",
      [theme.breakpoints.only("sm")]: {
        width: 440
      }
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      flexDirection: "column-reverse",
      "& img": {
        margin: "20px auto 0"
      }
    }
  },
  secondGroupText: {
    marginRight: -110,
    zIndex: 1,
    [theme.breakpoints.only("xs")]: {
      marginRight: 0
    }
  },
  note: {
    // marginBottom: "15px",
    fontSize: "12px",
    textAlign: "left",
    color: "#888888",
    [theme.breakpoints.up("sm")]: {
      // marginBottom: "40px"
    },
    "& p": {
      color: "#334E8D",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "20px",
      margin: 0,
      "& sup": {
        marginRight: "6px"
      }
    }
  },
  title: {
    color: "#373737",
    fontSize: "1rem",
    lineHeight: "26px",
    margin: "22px 0 0 0",
    fontWeight: "600",
    [theme.breakpoints.between("sm", "lg")]: {
      fontSize: "1.125rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem"
    }
  },
  info: {
    color: "#373737",
    fontSize: 20,
    lineHeight: "26px"
  },
  divider: {
    height: "1px",
    background: "#E6E6E6"
  },
  infoDesc: {
    color: "#757575",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "28px",
    margin: 0,
    marginBottom: "16px",
    [theme.breakpoints.between("sm", "lg")]: {
      fontSize: "1.125rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.25rem"
    }
  },
  cardsWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    alignSelf: "stretch",
    [theme.breakpoints.only("sm")]: {
      flexDirection: "row",
      margin: "24px 0",
      flexWrap: "wrap",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      margin: "24px 0"
    }
  },
  cards: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px 30px",
    borderRadius: "20px",
    border: "2px solid #E9E9E9",
    width: "240px",
    [theme.breakpoints.up("md")]: {
      minWidth: "0px",
      flex: "1 1 0",
      padding: "24px 18px",
    }
  },
  cardDesc: {
    color: "#000",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "22.4px",
    margin: 0,
    "& sup": {
      marginLeft: "6px"
    }
  },
  asteriskText: {
    fontSize: "0.75rem",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "24px",
    backgroundColor: "#EB151D",
    backgroundImage: "linear-gradient(210deg, #EB151D 38.54%, #FF007A 100%)",
    backgroundSize: "100%",
    "-webkit-background-clip": "text",
    "-moz-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    "-moz-text-fill-color": "transparent"
  }
}));
