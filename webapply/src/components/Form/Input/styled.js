export const styles = {
  textField: {
    width: "100%",
    display: "flex !important",
    "& fieldset": {
      borderRadius: "8px !important",
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
    flexDirection: "row !important",
    margin: "12px 0 20px !important",
    position: "relative",
    "& > div": {
      margin: "0 !important",
      "&:first-child": {
        "& fieldset": {
          border: 0,
          borderTopRightRadius: " 0 !important",
          borderBottomRightRadius: " 0 !important"
        }
      },
      "&:last-child": {
        flex: "1"
      }
    },
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
  },
  selectCombinedError: {
    margin: "12px 0 10px !important",
    "& fieldset": {
      borderColor: " #f44336"
    }
  },
  selectCombinedWrapper: {
    marginBottom: "20px"
  },
  regularWrapper: {
    margin: "12px 0 20px !important",
    "& .formControl": {
      margin: "0 !important"
    }
  }
};
