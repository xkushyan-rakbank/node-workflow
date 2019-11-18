import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  textField: {
    width: "100%",
    display: "flex ",
    "& fieldset": {
      borderRadius: "8px ",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#373737"
    }
  },
  disabled: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
  },
  selectCombined: {
    margin: "12px 0 20px",
    position: "relative",
    "& > div": {
      width: "auto"
    },
    "& div::after": {
      opacity: 0
    },
    "& > div:first-child": {
      width: "90px",
      "& fieldset": {
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        borderRight: " 0"
      }
    },
    "& > div:last-child": {
      flex: 1,
      "& fieldset": {
        borderTopLeftRadius: "0",
        borderBottomLeftRadius: "0"
      }
    }
  }
});
