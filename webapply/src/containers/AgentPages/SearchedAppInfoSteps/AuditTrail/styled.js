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
    padding: "24px 20px 19px 30px"
  },
  checkListData: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    marginTop: 5,
    flex: "0 0 50%"
  },
  heading: {
    fontWeight: 600,
    color: "#000"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  }
});
