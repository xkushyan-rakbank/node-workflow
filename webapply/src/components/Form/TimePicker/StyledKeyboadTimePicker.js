import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { KeyboardTimePicker } from "@material-ui/pickers";
import { ReactComponent as CalenderIcon } from "../../../assets/icons/calendar.svg";

const keyboardTimePickerTheme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        marginTop: "6px",
        borderRadius: "8px",
        boxShadow: "0 10px 18px 0 #00000019"
      }
    },
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#3b3a3a" }
    },
    MuiPickersClock: {
      pin: { backgroundColor: "#3b3a3a" }
    },
    MuiPickersClockPointer: {
      pointer: { backgroundColor: "#3b3a3a" },
      thumb: { backgroundColor: "#3b3a3a !important", border: "14px solid #3b3a3a" }
    },

    MuiPickersBasePicker: {
      pickerView: {
        justifyContent: "start",
        paddingTop: "20px",
        minHeight: "204px",
        border: "solid 1px #c2c2c28f",
        borderTop: "none",
        borderRadius: "0 0 8px 8px"
      },
      containerLandscape: {
        flexDirection: "column"
      },
      pickerViewLandscape: {
        padding: "10px 0 0 0"
      }
    },

    MuiPickersCalendar: {
      transitionContainer: {
        marginTop: 0,
        minHeight: 155
      }
    },
    MuiInputBase: {
      root: {
        height: 56
      }
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: "#f7f7f9"
        }
      }
    },
    MuiInputAdornment: {
      root: {
        display: "block",
        boxSizing: "border-box",
        marginLeft: -8,
        padding: "5px 8px 3px 3px",
        height: "100%",
        maxHeight: "none"
      }
    },
    MuiInputLabel: {
      outlined: {
        "&$shrink": {
          transform: "translate(13px, -6px) scale(0.75)"
        }
      }
    },
    MuiPickersDay: {
      day: {
        color: "#3b3a3a",
        width: "31px",
        height: "31px",
        margin: "0",
        borderRadius: 6
      },
      daySelected: {
        width: 28,
        height: 28,
        borderRadius: 6,
        backgroundColor: "#3b3a3a",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#3b3a3a"
        }
      },
      current: {
        color: "#3b3a3a"
      }
    },
    MuiTypography: {
      colorInherit: {
        fontSize: "12px",
        fontWeight: "600"
      }
    }
  }
});

export const StyledKeyboardTimePicker = props => (
  <ThemeProvider theme={keyboardTimePickerTheme}>
    <KeyboardTimePicker keyboardIcon={<CalenderIcon />} {...props} />
  </ThemeProvider>
);
