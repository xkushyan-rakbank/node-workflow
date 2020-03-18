import { makeStyles } from "@material-ui/styles";

export const useStyles = makeStyles({
  errorAlert: {
    width: "450px",
    height: "86px",
    borderRadius: "6px",
    boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.08)",
    border: "solid 1px #efefef",
    backgroundColor: "#ffffff",
    display: "flex",
    color: "#373737",
    transition: "all 0.4s ease"
  },
  icon: {
    width: "86px",
    height: "85px",
    flex: "0 0 86px",
    backgroundColor: "#000",
    borderTopLeftRadius: "6px",
    borderBottomLeftRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      width: "24px",
      stroke: "#fff",
      fill: "#fff"
    }
  },
  errorMessage: {
    paddingLeft: "17px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
    paddingRight: 45,
    overflow: "hidden"
  },
  errorReason: {
    margin: "0 0 3px 0",
    fontSize: "14px",
    fontWeight: "600"
  },
  errorDescription: {
    margin: "0",
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#86868b",
    overflow: "scroll"
  },
  closeIcon: {
    width: 24,
    right: 20,
    top: 20,
    cursor: "pointer"
  },
  closeIconWrapper: {
    flex: "0 0 auto",
    padding: "23px 20px 0 0",
    display: "flex",
    alignItems: "flex-start"
  }
});
