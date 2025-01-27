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
    input: {
      paddingLeft: 16,
      paddingRight: 16,
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
      }
    },
    inputMultiline: {
      padding: 0
    },
    iePlaceholder: {
      position: "absolute",
      color: "#86868b",
      top: "16px",
      left: "16px",
      backgroundColor: "transparent",
      opacity: "0.42",
      letterSpacing: "-0.7px"
    }
  };
});
