import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  iconWrapper: {
    margin: "10px 0px 10px 10px",
    cursor: "pointer"
  },
  accordion: {
    color: "#444",
    cursor: "pointer",
    padding: "18px",
    width: "100%",
    border: "none",
    outline: "none",
    transition: "0.4s"
  },
  panel: {
    padding: "0 18px",
    maxHeight: "0",
    overflow: "hidden",
    transition: "max-height 0.25s ease-out"
  },
  smallIcon: {
    height: "25px",
    width: "25px"
  },
  expandIcon: {
    fill: "#BF0000",
    width: "20px",
    height: "10px"
  },
  success: {
    height: "11px",
    width: "14px",
    marginRight: "24px"
  }
});
