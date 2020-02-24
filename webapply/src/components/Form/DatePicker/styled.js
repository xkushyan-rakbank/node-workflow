import React from "react";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersBasePicker: {
      pickerView: {
        maxWidth: "257px",
        minWidth: "257px",
        justifyContent: "start",
        paddingTop: "20px",
        minHeight: "179px"
      }
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        display: "none"
      },
      dayLabel: {
        width: "26px"
      }
    },
    MuiPickersCalendar: {
      transitionContainer: {
        marginTop: 0,
        minHeight: 155
      }
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: "#f7f7f9"
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
        fontSize: "12px"
      }
    }
  }
});

export const BaseDatePicker = props => (
  <ThemeProvider theme={materialTheme}>
    <KeyboardDatePicker {...props} />
  </ThemeProvider>
);
