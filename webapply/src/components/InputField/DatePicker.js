import React from "react";
import get from "lodash/get";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InfoTitle from "./../InfoTitle";
import { updateField } from "../../store/actions/appConfig";

const styles = {
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
  const updateField = value => {
    const { name } = props.config;
    props.updateField({ value, name });
  };

  const { value, classes, config } = props;

  return (
    <FormControl className="formControl">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          autoOk
          name={config.name}
          label={config.label}
          disableToolbar
          margin="normal"
          variant="inline"
          format="MM/dd/yyyy"
          inputVariant="outlined"
          placeholder="__/__/____"
          className={classes.datePicker}
          value={value}
          onChange={updateField}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
      {!!config.title && <InfoTitle title={config.title} />}
    </FormControl>
  );
};

const mapStateToProps = (state, { id }) => {
  const config = state.appConfig.uiConfig[id] || {};
  const value = get(state.appConfig, config.name);

  return {
    config,
    value
  };
};

const mapDispatchToProps = {
  updateField
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DatePicker);
