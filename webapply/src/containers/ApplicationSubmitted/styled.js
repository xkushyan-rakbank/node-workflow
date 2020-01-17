import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "& img": {
      width: 120,
      height: 126,
      marginBottom: "40px",
      "@media only screen and (max-width: 1300px)": {
        width: "85px",
        height: "auto",
        marginBottom: "20px"
      }
    }
  },
  accountsNumbers: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "space-between",
    "@media only screen and (max-width: 1420px)": {
      flexGrow: 1
    },
    "@media only screen and (max-width: 1300px)": {
      flexDirection: "column",
      alignItems: "center",
      marginTop: "10px",
      "& div + div": {
        marginTop: "20px"
      }
    }
  },
  accountsNumbersColumn: {
    flexDirection: "column",
    alignItems: "center",
    "& div + div": {
      marginTop: "20px",
      "@media only screen and (max-width: 991px)": {
        marginTop: "10px"
      }
    }
  },
  accountsNumbersRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    "& div + div": {
      "@media only screen and (max-width: 991px)": {
        marginTop: "10px"
      }
    }
  },
  accountNumber: {
    marginBottom: "6px",
    padding: "30px",
    width: "380px",
    borderRadius: "8px",
    boxShadow: "5px 5px 25px 0 rgba(0, 0, 0, 0.07)",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    "@media only screen and (max-width: 1420px)": {
      width: "calc(50% - 10px)"
    },
    "@media only screen and (max-width: 1300px)": {
      width: "320px",
      padding: "20px 30px"
    },
    "@media only screen and (max-width: 991px)": {
      width: "100%",
      padding: "15px 30px"
    },
    "& .info": {
      fontSize: "14px",
      color: "#373737"
    },
    "& .mainInfo": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    "& .number": {
      fontSize: "24px",
      color: "#373737"
    },
    "& .typeAccount": {
      fontSize: "12px",
      color: "#86868b"
    }
  },
  dottedBg: {
    position: "absolute",
    width: "100%",
    top: -10,
    left: 2,
    height: "auto",
    zIndex: "-1"
  },
  accountNumberColumn: {
    "@media only screen and (max-width: 991px)": {
      padding: "5px 30px",
      "& .number": {
        fontSize: "20px"
      }
    }
  },
  accountNumberRow: {
    "@media only screen and (max-width: 991px)": {
      padding: "5px 30px",
      "& .number": {
        fontSize: "20px"
      }
    }
  },
  infoBottom: {
    maxWidth: "443px",
    margin: "0 auto"
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(230, 230, 230, 0.5)",
    margin: "60px 0",
    "@media only screen and (max-width: 1300px)": {
      margin: "20px 0"
    }
  },
  result: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      width: "44px"
    }
  },
  resultNextStep: {
    fontSize: "20px",
    color: "#373737",
    fontWeight: "600",
    marginTop: "15px"
  },
  resultNextStepInfo: {
    fontSize: "20px",
    color: "#373737"
  },
  waitCallIcon: {
    marginBottom: 0,
    width: 40,
    height: 48
  }
});
