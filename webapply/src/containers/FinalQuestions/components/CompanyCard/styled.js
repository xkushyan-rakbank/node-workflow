import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  container: {
    position: "relative",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "15px",
    paddingRight: "32px"
  },
  companyIconWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "solid 1px #e9e9ed",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
  },
  companyIcon: {
    height: "unset",
    width: "20px"
  },
  contentBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  label: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: "#373737"
  },
  controlsBox: {
    display: "flex",
    alignItems: "center"
  }
});
