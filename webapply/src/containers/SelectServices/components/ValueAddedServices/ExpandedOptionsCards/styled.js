import { makeStyles } from "@material-ui/core/styles";
import { mobileResolutionMD, desktopResolution, mobileResolution } from "../../../../../constants";

export const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    minWidth: "270px",
    padding: "40px 30px 25px 30px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    marginRight: "20px",
    flex: "0 0 calc(50% - 10px)",
    boxSizing: "border-box",
    [`@media only screen and (max-width: ${mobileResolutionMD}px)`]: {
      margin: 20
    },
    "&:last-child": {
      marginRight: 0,
      [`@media only screen and (max-width: ${mobileResolutionMD}px)`]: {
        margin: 20
      }
    }
  },
  title: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "30px"
  },
  icon: {
    display: "flex",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px",
    "& img": {
      width: "80px",
      height: "auto"
    }
  },
  name: {
    fontWeight: 600,
    textAlign: "center"
  },
  cost: {
    paddingTop: "25px",
    paddingBottom: "15px",
    fontSize: "14px",
    fontWeight: 600,
    textAlign: "center",
    "& span": {
      marginLeft: "5px"
    }
  },
  options: {
    paddingLeft: "25px",
    fontSize: "16px",
    "& li": {
      position: "relative",
      listStyleType: "none"
    },
    "& > li:not(:last-child)": {
      marginBottom: "20px"
    }
  },
  listIcon: {
    position: "absolute",
    top: "3px",
    left: "-25px"
  },
  nestedOptions: {
    paddingLeft: "20px",
    fontSize: "14px",
    "& li": {
      marginBottom: "5px"
    },
    "& li::before": {
      content: "'–'",
      marginRight: "4px"
    }
  },
  link: {
    fontSize: "14px",
    color: "#373737",
    textDecoration: "underline"
  },
  linkWrapper: {
    paddingBottom: "40px",
    borderBottom: "solid 1px #e8e8e8",
    fontWeight: "600"
  },
  upgrade: {
    paddingTop: "5px",
    fontSize: "14px",
    fontStyle: "italic",
    textAlign: "center",
    color: "#86868b"
  },
  indent: {
    marginBottom: "6px",
    "& strong": {
      fontWeight: "600"
    }
  },
  button: {
    fontSize: "16px",
    width: "200px",
    height: "40px",
    borderRadius: "21px",
    padding: "0 5px",
    margin: "auto",
    "&>span": {
      justifyContent: "center"
    }
  },

  cardRoot: {
    position: "relative",
    display: "flex",
    flex: "1 1",
    flexDirection: "column",
    minWidth: "270px",
    maxHeight: "340px",
    margin: "10px",
    padding: "40px 20px 25px 20px",
    border: "solid 1px #e8e8e8",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    color: "#373737",
    "&:hover": {
      borderColor: "#000"
    },
    "&:hover $closeButton": {
      display: "block"
    },
    [`@media only screen and (max-width: ${desktopResolution}px)`]: {
      maxHeight: "220px",
      padding: "10px 20px 10px 20px"
    }
  },
  cardTitle: {
    fontSize: "20px",
    borderBottom: "solid 1px #e8e8e8",
    paddingBottom: "20px",
    [`@media only screen and (max-width: ${desktopResolution}px)`]: {
      paddingBottom: "10px"
    }
  },
  cardName: {
    fontWeight: 600,
    textAlign: "center"
  },
  value: {
    position: "relative",
    display: "inline-block",
    marginLeft: "16px",
    padding: "3px 10px",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#ea2925",
    boxShadow: "0 2px 6px 0 rgba(0, 0, 0, 0.15)",
    "&::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      left: "-6px",
      width: 0,
      height: 0,
      transform: "translateY(-50%)",
      borderStyle: "solid",
      borderWidth: "8px 12px 8px 0",
      borderColor: "transparent #ea2925 transparent transparent"
    }
  },
  cardCost: {
    paddingTop: "10px",
    fontSize: "14px",
    color: "#c6c6cc",
    textAlign: "center",
    "& span": {
      marginLeft: "5px"
    }
  },
  cardOptions: {
    paddingLeft: "20px",
    fontSize: "20px",
    [`@media only screen and (max-width: ${desktopResolution}px)`]: {
      "& li": {
        fontSize: "16px"
      },
      margin: "5px 0"
    },
    "& li:not(:last-child)": {
      marginBottom: "20px",
      [`@media only screen and (max-width: ${desktopResolution}px)`]: {
        marginBottom: "5px"
      }
    }
  },
  cardLink: {
    fontSize: "14px",
    color: "#c6c6cc",
    textDecoration: "underline"
  },
  cardLinkWrapper: {
    marginBottom: "40px",
    [`@media only screen and (max-width: ${desktopResolution}px)`]: {
      marginBottom: "10px"
    }
  },
  included: {
    fontSize: "16px",
    textAlign: "center"
  },
  applyButton: {
    textAlign: "center"
  },
  closeButton: {
    position: "absolute",
    top: "-19px",
    right: "-19px",
    display: "none",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    boxShadow: "0 5px 10px 0 rgba(158, 158, 158, 0.5)",
    cursor: "pointer",
    "&::after, &::before": {
      content: "''",
      position: "absolute",
      top: "19px",
      left: "7px",
      width: "25px",
      height: "2px",
      backgroundColor: "#000"
    },
    "&::after": {
      transform: "rotate(45deg)"
    },
    "&::before": {
      transform: "rotate(-45deg)"
    }
  },
  cardsRoot: {
    display: "flex",
    width: "100%",
    flexWrap: "nowrap",
    justifyContent: "center",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      justifyContent: "flex-start",
      overflowX: "auto",
      paddingBottom: "15px"
    }
  }
});

export const ContainedButtonStyles = {
  buttonStyle: {
    height: "auto",
    padding: "3px 0",
    border: "1px solid #373737",
    boxShadow: "none",
    backgroundColor: "#fff",
    "&:hover": {
      backgroundColor: "#000",
      "& span": {
        color: "#fff"
      }
    }
  },
  labelStyle: {
    display: "block",
    color: "#373737",
    fontSize: "14px",
    textAlign: "center"
  }
};
