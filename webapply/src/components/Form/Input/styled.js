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
      width: "auto",
      margin: "0 !important"
    },
    "& div::after": {
      opacity: 0
    },
    "& > div:first-child": {
      width: "90px",
      position: "absolute",
      zIndex: 1,
      "& fieldset": {
        borderColor: "transparent",
        borderRight: "1px solid #dddddd",
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0"
      },
      "& label": {
        maxWidth: "unset"
      },
      "& svg": {
        right: "10px"
      },
      "& input": {
        paddingLeft: 0
      },
      "& legend": {
        marginLeft: 0
      },
      "& .MuiSelect-select.Mui-disabled": {
        backgroundColor: "transparent"
      }
    },
    "& > div:last-child": {
      flex: 1,
      position: "relative",
      "& label": {
        transform: "translate(114px, 20px) scale(1)"
      },
      "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(114px, -6px) scale(0.75)"
      },
      "& legend": {
        marginLeft: 102
      },
      "& input": {
        paddingLeft: 107
      }
    }
  }
});
