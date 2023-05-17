import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

import { ReactComponent as CalenderIcon } from "../../../assets/icons/calendar.svg";

const keyboardDatePickerTheme = createMuiTheme({
  overrides: {
    MuiPopover: {
      paper: {
        marginTop: "6px",
        borderRadius: "8px",
        boxShadow: "0 10px 18px 0 #00000019"
      }
    },
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: "257px",
        minWidth: "257px",
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
    MuiPickersCalendarHeader: {
      switchHeader: {
        display: "none"
      },
      dayLabel: {
        width: "26px",
        fontWeight: "600",
        color: "#3b3a3a"
      },
      daysHeader: {
        "& span:first-child": {
          color: "#707070"
        }
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
        height: 56,
        "&.Mui-disabled": {
          backgroundColor: "rgba(242, 242, 242, 0.5)"
        }
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
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "12px"
      }
    }
  }
});

export const StyledKeyboardDatePicker = props => (
  <ThemeProvider theme={keyboardDatePickerTheme}>
    <KeyboardDatePicker keyboardIcon={<CalenderIcon />} {...props} />
  </ThemeProvider>
);
