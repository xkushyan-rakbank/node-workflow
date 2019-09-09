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
import { validate } from "./../../utils/validate";
import { updateField } from "../../store/actions/appConfig";
import combineNestingName from "../../utils/combineNestingName";
import { fieldAttr } from "../../constants";

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

  inputRef = React.createRef();

  inputProps = {
    ref: this.inputRef,
    pattern:
      "^(0[1-9]|1[0-2])\\/(((0|1)[0-9]|2[0-9]|3[0-1])\\/((19|20)\\d\\d))$"
  };

  resetFieldErrors = () => {
    this.setState({ fieldErrors: {} });
  };

  updateField = (dateValue, stringValue) => {
    const { name } = this.props;
    if (!dateValue || dateValue.toString() !== "Invalid Date") {
      this.props.updateField({ value: stringValue, name });
    }
  };

  fieldValidation = () => {
    this.setState({
      fieldErrors: validate(this.inputRef.current, this.props.config)
    });
  };

  handleFocus = () => {
    this.resetFieldErrors();
  };

  handleAccept = () => {
    this.resetFieldErrors();
  };

  handleBlur = () => {
    this.fieldValidation();
  };

  handleClose = () => {
    this.fieldValidation();
  };

  render() {
    const { value, classes, config, id } = this.props;
    const { fieldErrors } = this.state;
    const isError = !isEmpty(fieldErrors);
    const attrs = fieldAttr(id, config);
    return (
      <FormControl className="formControl">
        {config.label && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              name={config.name}
              label={config.label || ""}
              invalidDateMessage={""}
              disableToolbar
              margin="normal"
              variant="inline"
              format="MM/dd/yyyy"
              inputVariant="outlined"
              placeholder="__/__/____"
              mask="__/__/____"
              maskChar="_"
              className={classes.datePicker}
              value={value || null}
              onAccept={this.handleAccept}
              onFocus={this.handleFocus}
              onChange={this.updateField}
              onBlur={this.handleBlur}
              onClose={this.handleClose}
              error={isError}
              inputProps={this.inputProps}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              autoComplete="off"
              {...attrs}
            />
          </MuiPickersUtilsProvider>
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

const mapStateToProps = (state, { id, indexes }) => {
  const config = state.appConfig.uiConfig[id] || {};
  const name =
    config.name && config.name.search(/\*/)
      ? combineNestingName(config.name, indexes)
      : config.name;
  const value = get(state.appConfig, name);

  return {
    config,
    value,
    name
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
