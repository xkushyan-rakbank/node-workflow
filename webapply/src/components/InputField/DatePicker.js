import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
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
import ErrorMessage from "./../ErrorMessage";
import validate from "./../../utils/validate";
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
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
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

class DatePicker extends React.Component {
  state = {
    fieldErrors: {}
  };

  updateField = value => {
    console.log(value);
    const { name } = this.props.config;
    this.props.updateField({ value, name });
  };

  fieldValidation = event => {
    const field = event.target;
    const fieldConfig = this.props.config;
    const errors = validate(field, fieldConfig);
    this.setState({
      fieldErrors: errors
    });
  };

  render() {
    const { value, classes, config } = this.props;
    const { fieldErrors } = this.state;
    const isError = !isEmpty(fieldErrors);

    return (
      <FormControl className="formControl">
        {config.label ? (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              name={config.name}
              label={config.label || ""}
              disableToolbar
              margin="normal"
              variant="inline"
              format="MM/dd/yyyy"
              inputVariant="outlined"
              placeholder="__/__/____"
              className={classes.datePicker}
              value={value}
              onChange={this.updateField}
              onBlur={this.fieldValidation}
              error={isError}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        ) : (
          ""
        )}

        {!!config.title && <InfoTitle title={config.title} />}

        {isError && (
          <ErrorMessage
            error={fieldErrors.error}
            multiLineError={fieldErrors.multiLineError}
          />
        )}
      </FormControl>
    );
  }
}

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
