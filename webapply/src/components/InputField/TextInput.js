import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import isNumber from "lodash/isNumber";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
import isBoolean from "lodash/isBoolean";
import isNil from "lodash/isNil";
import InfoTitle from "./../InfoTitle";
import ErrorMessage from "./../ErrorMessage";
import { updateField } from "../../store/actions/appConfig";
import { fieldAttr } from "./../../constants";
import { validate } from "./../../utils/validate";
import { getGeneralInputProps } from "../../store/selectors/input";

const styles = {
  textField: {
    width: "100%",
    display: "flex !important",
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    }
  },
  disabled: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
  },
  selectCombined: {
    flexDirection: "row !important",
    alignItems: "flex-start",
    margin: "12px 0 24px !important",
    "& > div": {
      margin: "0 !important",
      "&:first-child": {
        "& fieldset": {
          borderRight: 0,
          borderTopRightRadius: " 0 !important",
          borderBottomRightRadius: " 0 !important",
          borderTopLeftRadius: " 8px !important",
          borderBottomLeftRadius: " 8px !important"
        }
      },
      "&:last-child": {
        flex: "1",
        "& fieldset": {
          borderTopLeftRadius: "0 !important",
          borderBottomLeftRadius: "0 !important"
        }
      }
    }
  },
  selectCombinedError: {
    margin: "12px 0 10px !important",
    "& fieldset": {
      borderColor: " #f44336"
    }
  },
  selectCombinedWrapper: {
    marginBottom: "24px"
  },
  regularWrapper: {
    margin: "12px 0 20px !important",
    "& .formControl": {
      margin: "0 !important"
    }
  }
};

class Input extends React.Component {
  static defaultProps = {
    customValidationMessage: () => null
  };

  state = {
    value: this.getInitValue(),
    fieldErrors: {},
    isFocused: false,
    isDirty: false
  };

  getInitValue() {
    if (this.props.value || isNumber(this.props.value)) {
      return this.props.value;
    }
    if (this.props.defaultValue || isNumber(this.props.defaultValue)) {
      return this.props.defaultValue;
    }
    return "";
  }

  inputRef = React.createRef();

  componentDidMount() {
    if (
      !isUndefined(this.props.defaultValue) &&
      (isUndefined(this.state.value) || this.state.value === "")
    ) {
      this.props.updateField({
        value: this.props.defaultValue,
        name: this.props.name
      });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  resetErrorState() {
    this.setState({ fieldErrors: {} });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.required !== this.props.required) {
      this.resetErrorState();
    }
    if (prevProps.value !== this.props.value && !isNil(this.props.value)) {
      this.setState(() => ({ value: this.props.value }));
      if (this.state.isDirty) {
        this.fieldValidation();
      }
    }
    if (this.isPropAttrChanged(prevProps) && this.state.isDirty) {
      this.fieldValidation();
    }
  }

  isPropAttrChanged(prevProps) {
    return ["max", "min", "required", "disabled"].some(
      attr => prevProps[attr] !== this.props[attr]
    );
  }

  updateField = () => {
    const { name } = this.props;
    const value = this.state.value;
    if (value !== this.props.value) {
      this.props.updateField({ value, name });
    }
  };

  fieldValidation = () => {
    const field = this.inputRef.current;
    const config = {
      ...this.props.config
    };

    this.setState({
      fieldErrors: validate(field, config)
    });

    return field.validity.valid;
  };

  handleOnBlur = () => {
    this.setState({
      isFocused: false,
      isDirty: true
    });

    if (this.fieldValidation()) {
      this.updateField();
    }
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
    this.resetErrorState();
  };

  composeFieldAttrWithPropAttr(inputProps) {
    const { disabled, required, max, min } = this.props;
    const props = {
      ...inputProps,
      ref: this.inputRef
    };

    if (isBoolean(disabled)) {
      props.disabled = disabled;
    }
    if (isBoolean(required)) {
      props.required = required;
    }
    if (!isUndefined(max)) {
      props.max = max;
    }
    if (!isUndefined(min)) {
      props.min = min;
    }

    return props;
  }

  getCustomValidationMessage() {
    return this.inputRef.current
      ? this.props.customValidationMessage({
          inputRef: this.inputRef.current,
          fieldErrors: this.state.fieldErrors,
          fieldConfig: this.props.config,
          fieldName: this.props.name,
          isFocused: this.state.isFocused,
          isDirty: this.state.isDirty
        })
      : null;
  }

  isLabelShrink() {
    return (
      this.state.isFocused || !!this.state.value || isNumber(this.state.value)
    );
  }

  render() {
    const {
      id,
      indexes,
      config,
      classes,
      className,
      InputProps = {},
      InputLabelProps,
      disabled,
      placeholder,
      serverValidation,
      select
    } = this.props;

    const { fieldErrors } = this.state;
    const inputProps = this.composeFieldAttrWithPropAttr(
      fieldAttr(id, config, indexes)
    );

    const isError = !isEmpty(fieldErrors);
    const customValidationMessage = this.getCustomValidationMessage();

    if (id && config.label) {
      return (
        <div
          className={cx({
            [classes.selectCombinedWrapper]: select,
            [classes.regularWrapper]: !select
          })}
        >
          <FormGroup
            className={cx({
              [classes.selectCombined]: select,
              [classes.selectCombinedError]: isError
            })}
          >
            {select}
            <FormControl className="formControl">
              <TextField
                value={this.state.value}
                onChange={this.handleChange}
                InputProps={{
                  ...InputProps,
                  inputProps
                }}
                placeholder={placeholder}
                InputLabelProps={{
                  shrink: this.isLabelShrink(),
                  ...InputLabelProps
                }}
                disabled={disabled}
                variant="outlined"
                label={config.label}
                className={cx(classes.textField, className, {
                  [classes.disabled]: disabled
                })}
                onBlur={this.handleOnBlur}
                error={isError}
                onFocus={this.handleFocus}
              />

              {!!config.title && <InfoTitle title={config.title} />}
            </FormControl>
          </FormGroup>

          {isError && !customValidationMessage && (
            <ErrorMessage
              error={fieldErrors.error}
              multiLineError={fieldErrors.multiLineError}
            />
          )}
          {!isNil(serverValidation) && serverValidation.message && (
            <ErrorMessage error={serverValidation.message} />
          )}
          {customValidationMessage}
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateField
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Input)
);
