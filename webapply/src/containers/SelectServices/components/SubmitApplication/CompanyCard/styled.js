import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles({
  card: {
    minHeight: "236px",
    margin: "auto auto 40px",
    padding: "40px 20px 42px 20px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 1px 16px 0 rgba(0, 0, 0, 0.1)",
    backgroundColor: "#ffffff",
    backgroundImage: "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0))"
  },
  icon: {
    width: "37px",
    height: "37px",
    border: "solid 1.5px #e9e9ed",
    borderRadius: "50%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&>svg": {
      fontSize: "20px"
    }
  },
  mainTitle: {
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#373737"
  },
  grayText: {
    fontSize: "14px",
    lineHeight: 1.29,
    color: "#86868b"
  },
  divider: {
    marginBottom: "24px"
  },
  indent: {
    marginBottom: "15px"
  },
  secondaryTitle: {
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: 1.29,
    color: "#263d4c"
  }
});
