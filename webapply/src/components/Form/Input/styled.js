import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => {
  const light = theme.palette.type === "light";
  const placeholder = {
    color: "#86868b",
    opacity: light ? 0.42 : 0.5,
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: "0 !important"
  };
  const placeholderVisible = {
    opacity: light ? 0.42 : 0.5
  };

  return {
    textField: {
      backgroundColor: "#FFF",
      "& fieldset": {
        borderRadius: "8px ",
        border: "solid 1px rgba(194, 194, 194, 0.56)"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#373737"
      }
    },
    disabled: {
      "& fieldset": {
        backgroundColor: "#F2F2F2"
      }
    },
    inputGroupWrapper: {
      margin: "12px 0 20px"
    },
    ContactNumberWrapper: {
      display: "flex",
      margin: "12px 0 0",
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
        zIndex: 1,
        "& > div": {
          "@media all and (-ms-high-contrast: active), (-ms-high-contrast: none)": {
            height: "61px !important",
            marginTop: "-5.5px !important"
          }
        },
        "& fieldset": {
          borderRight: "1px solid #ffffff",
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
        "& fieldset": {
          borderTopLeftRadius: "0",
          borderBottomLeftRadius: "0"
        },
        "& label": {
          maxWidth: "unset"
        }
      }
    },
    selectCombined: {
      margin: "12px 0 0",
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
          transform: "translate(107px, 20px) scale(1)"
        },
        "& label.MuiInputLabel-filled.MuiInputLabel-shrink": {
          transform: "translate(107px, 10px) scale(0.75)"
        },
        "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
          transform: "translate(107px, -6px) scale(0.75)"
        },
        "& legend": {
          marginLeft: 95
        },
        "& input": {
          paddingLeft: 107
        },
        "& mark": {
          left: "106px"
        }
      }
    },
    formControlRoot: {
      margin: "12px 0 24px",
      width: "100%",
      display: "flex",
      "& label": {
        transform: "translate(16px, 20px) scale(1)"
      },
      "& label.MuiInputLabel-outlined.MuiInputLabel-shrink": {
        transform: "translate(16px, -6px) scale(0.75)",
        backgroundColor: "#fff"
      }
    },
    filledInput: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "22px",
      letterSpacing: "0.08px",
      color: "#2C2C2C",
      backgroundColor: "#FFF",
      borderRadius: "12px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#BCBDC0",
      "&:hover": {
        backgroundColor: "#FFF"
      },
      "&.Mui-focused": {
        backgroundColor: "#FFF"
      },
      "&.Mui-disabled": {
        backgroundColor: "#F2F2F2"
      }
    },
    input: {
      paddingLeft: 16,
      paddingRight: 16,
      backgroundColor: "#FFF",
      borderRadius: "12px",
      border: "none",
      height: "22px",
      "&::placeholder": placeholder,
      "&::-webkit-input-placeholder": placeholder,
      "&::-moz-placeholder": placeholder,
      "&:-ms-input-placeholder": placeholder,
      "&::-ms-input-placeholder": placeholder,
      "label[data-shrink=false] + .MuiInputBase-formControl &": {
        "&::-webkit-input-placeholder": placeholderHidden,
        "&::-moz-placeholder": placeholderHidden,
        "&:-ms-input-placeholder": placeholderHidden,
        "&::-ms-input-placeholder": placeholderHidden,
        "&:focus::-webkit-input-placeholder": placeholderVisible,
        "&:focus::-moz-placeholder": placeholderVisible,
        "&:focus:-ms-input-placeholder": placeholderVisible,
        "&:focus::-ms-input-placeholder": placeholderVisible
      },
      "&.Mui-disabled": {
        background: "#F2F2F2",
        color: "#9B9CA0"
      }
    },
    inputMultiline: {
      padding: 0,
      borderRadius: 0
    },
    iePlaceholder: {
      position: "absolute",
      color: "#86868b",
      top: "16px",
      left: "16px",
      backgroundColor: "transparent",
      opacity: "0.42",
      letterSpacing: "-0.7px"
    },
    filledInputError: {
      borderColor: "#ea2b1e"
    },
    filledLabel: {
      color: "#585A61",
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "22px",
      letterSpacing: "0.08px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    filledLabelShrink: {
      fontWeight: 500,
      fontSize: "0.875rem"
    }
  };
});
