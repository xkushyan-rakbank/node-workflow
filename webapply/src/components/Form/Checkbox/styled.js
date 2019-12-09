import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  checkbox: {
    "&[aria-disabled='true']": {
      opacity: 0.5
    }
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center"
  },
  checkboxContainer: {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: "5px"
  },
  hiddenCheckbox: {
    border: "0",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
    "&:focus + &": {
      boxShadow: "0 0 0 3px pink"
    }
  },
  styledCheckbox: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "solid 1px #373737",
    borderRadius: "8px",
    transition: "all 150ms",
    position: "relative",
    "& img": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      bottom: "0"
    }
  },
  label: {
    marginLeft: "8px",
    color: "#373737",
    userSelect: "none",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "400"
  },
  doubleLabel: {
    marginLeft: "10px"
  },
  firstRow: {
    fontSize: "14px",
    lineHeight: 1.71,
    color: "#373737",
    "&.disabled": {
      color: "#00000061"
    }
  },
  secondRow: {
    fontSize: "12px",
    color: "#a4a4a4",
    display: "flex",
    marginTop: "5px",
    "& img": {
      width: "16px",
      height: "16px",
      marginRight: "5px"
    }
  },
  questionIcon: {
    marginLeft: "10px"
  },
  labelWrapper: {
    display: "flex"
  }
});
