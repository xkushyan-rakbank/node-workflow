import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    marginTop: "24px",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    marginBottom: "20px"
  },
  applicationRow: {
    borderBottom: "1px solid #e6e6e6",
    "&:last-of-type": {
      border: "none"
    },
    display: "flex",
    alignItems: "center",
    padding: "24px 20px 19px 30px",
    justifyContent: "space-between",
    "@media (max-width: 500px)": {
      padding: "15px 5px"
    }
  },
  checkListData: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5,
    wordBreak: "break-word",
    flex: "0 0 33%",
    "@media (max-width: 500px)": {
      fontSize: "13px"
    }
  },
  heading: {
    fontWeight: 600,
    color: "#000",
    flex: "0 0 33%"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  },
  title: {
    marginTop: "0px",
    color: "#373737",
    fontSize: "15px",
    alignItems: "center",
    fontWeight: "600"
  },
  errorMsgInsideTable: {
    fontSize: "16px",
    fontWeight: 600,
    marginBottom: "0px",
    padding: "20px 20px 20px 30px"
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    height: "62px",
    margin: "20px 35px 20px 25px"
  },
  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "0 16px"
  }
});