import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InfoTitle from "./../InfoTitle";
import { withStyles } from "@material-ui/core/styles";

const style = {
  datePicker: {
    position: "relative",
    "&::after": {
      content: "''",
      position: " absolute",
      width: " 1px",
      height: " 100%",
      backgroundColor: " #ddd",
      right: " 56px",
      zIndex: " -1"
    },
    "& svg": {
      fill: "#16216a",
      fontSize: "16px"
    },
    "& button": {
      left: "4px",
      outline: "none"
    }
  }
};

const DatePicker = props => {
  const {
    classes,
    field: { value, name },
    form: { setFieldValue },
    form,
    label,
    field,
    infoTitle,
    ...rest
  } = props;

  return (
    <FormControl className="formControl">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          {...rest}
          {...field}
          autoOk
          name={name}
          label={label}
          disableToolbar
          margin="normal"
          variant="inline"
          format="MM/dd/yyyy"
          inputVariant="outlined"
          placeholder="__/__/____"
          className={classes.datePicker}
          onChange={value => form.setFieldValue(name, value, true)}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
      {!!infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

export default withStyles(style)(DatePicker);
