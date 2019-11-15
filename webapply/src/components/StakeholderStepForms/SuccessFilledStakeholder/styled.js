import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    width: "100%",
    height: "275px",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginBottom: "24px"
  },
  placeholder: {
    marginBottom: "22px",
    width: "135px"
  },
  successTitle: {
    fontSize: "18px",
    textAlign: "center",
    color: "#373737",
    marginTop: "10px"
  }
});
