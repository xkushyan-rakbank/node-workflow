import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  documents: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    height: "45px"
  },
  link: {
    fontSize: "14px",
    lineHeight: 1.33,
    height: "45px",
    cursor: "pointer",
    color: "blue"
  },
  title: {
    marginTop: "0px",
    color: "#373737",
    fontSize: "15px",
    alignItems: "center",
    fontWeight: "600"
  },
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
    padding: "24px 20px 19px 30px"
  },
  checkListData: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5,
    maxWidth: "50%",
    width: "50%",
    "&:first-child": {
      wordBreak: "break-all",
      paddingRight: "10px"
    },
    "&:nth-child(2)": {
      width: "20%"
    },
    "&:last-child": {
      width: "30%"
    }
  },
  heading: {
    fontWeight: 600,
    color: "#000"
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
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  }
});
