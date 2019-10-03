import React from "react";
import isEmpty from "lodash/isEmpty";
import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import InfoTitle from "./../InfoTitle";
import ErrorMessage from "./../ErrorMessage";
import { validate } from "./../../utils/validate";
import { updateProspect } from "../../store/actions/appConfig";
import { fieldAttr } from "../../constants";
import { getGeneralInputProps } from "../../store/selectors/input";

const styles = {
  datePicker: {
    position: "relative",
    "&::after": {
      content: "''",
      display: "block",
      position: "absolute",
      width: "1px",
      height: "100%",
      backgroundColor: "#ddd",
      right: "56px",
      zIndex: "-1"
    },
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      fill: "#373737",
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
    ref: this.inputRef
  };

  resetFieldErrors = () => {
    this.setState({ fieldErrors: {} });
  };

  updateProspect = dateValue => {
    const { name } = this.props;
    this.props.updateProspect({ [name]: dateValue, name });
  };

  composeInputProps() {
    return {
      ...this.inputProps
    };
  }

  fieldValidation = () => {
    this.setState({
      fieldErrors: validate(this.inputRef.current, this.props.config)
    });
  };

  handleFocus = () => {
    this.resetFieldErrors();
  };

  handleAccept = date => {
    this.resetFieldErrors();
  };

  handleBlur = () => {
    this.fieldValidation();
  };

  render() {
    const {
      value,
      classes,
      config,
      id,
      indexes,
      disableFuture,
      disabled,
      minDate = new Date("01-01-1000")
    } = this.props;
    const { fieldErrors } = this.state;
    const isError = !isEmpty(fieldErrors);
    const attrs = fieldAttr(id, config, indexes);
    const inputProps = this.composeInputProps();

    return (
      <FormControl className="formControl">
        {config.label && (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              autoOk
              minDate={minDate}
              disableFuture={disableFuture}
              disabled={disabled}
              name={config.name}
              label={config.label || ""}
              disableToolbar
              margin="normal"
              variant="inline"
              format="dd/MM/yyyy"
              inputVariant="outlined"
              placeholder="__/__/____"
              mask="__/__/____"
              maskChar="_"
              className={classes.datePicker}
              value={value || null}
              onAccept={this.handleAccept}
              onFocus={this.handleFocus}
              onChange={this.updateProspect}
              onBlur={this.handleBlur}
              error={isError}
              inputProps={inputProps}
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
          <ErrorMessage error={fieldErrors.error} multiLineError={fieldErrors.multiLineError} />
        )}
      </FormControl>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DatePicker);
