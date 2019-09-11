import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { compose } from "recompose";
import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import isEmpty from "lodash/isEmpty";
import isBoolean from "lodash/isBoolean";
import InfoTitle from "./../InfoTitle";
import ErrorMessage from "./../ErrorMessage";
import { updateField } from "../../store/actions/appConfig";
import { fieldAttr } from "./../../constants";
import { validate } from "./../../utils/validate";
import combineNestingName from "../../utils/combineNestingName";

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
    alignItems: "baseline",
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
    margin: "12px 0 24px !important",
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
    fieldErrors: {}
  };

  inputRef = React.createRef();

  componentDidMount() {
    if (
      !isUndefined(this.props.defaultValue) &&
      (isUndefined(this.props.value) || this.props.value === "")
    ) {
      this.props.updateField({
        value: this.props.defaultValue,
        name: this.props.name
      });
    }
  }

  setInputValue(value) {
    if (this.inputRef.current) {
      this.inputRef.current.value = value;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.required !== this.props.required) {
      this.setState({ fieldErrors: {} });
    }
    if (prevProps.value !== this.props.value) {
      this.setInputValue(this.props.value);
    }
  }

  updateField = event => {
    const { name } = this.props;
    const value = event.target.value.trim();
    if (value !== this.props.value) {
      this.props.updateField({ value, name });
    }
  };

  fieldValidation = event => {
    const field = event.target;
    const config = {
      ...this.props.config
    };

    if (isBoolean(this.props.required)) {
      config.required = this.props.required;
    }

    this.setState({
      fieldErrors: validate(field, config)
    });

    return field.validity.valid;
  };

  handleOnBlur = event => {
    const isValid = this.fieldValidation(event);

    if (isValid) {
      this.updateField(event);
    }
  };

  composeFieldAttrWithPropAttr(inputProps) {
    const props = {
      ...inputProps,
      ref: this.inputRef
    };

    const { disabled, required, max, min } = this.props;

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
      ? this.props.customValidationMessage(
          this.inputRef.current,
          this.state.fieldErrors,
          this.props.config,
          this.props.name
        )
      : null;
  }

  render() {
    const {
      id,
      name,
      config,
      classes,
      className,
      InputProps = {},
      InputLabelProps,
      disabled,
      placeholder,
      select
    } = this.props;

    const { fieldErrors } = this.state;
    const inputProps = this.composeFieldAttrWithPropAttr(
      fieldAttr(id, config, name)
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
                InputProps={{
                  ...InputProps,
                  inputProps
                }}
                placeholder={placeholder}
                InputLabelProps={InputLabelProps}
                disabled={disabled}
                defaultValue={this.props.defaultValue || this.props.value}
                variant="outlined"
                label={config.label}
                className={cx(classes.textField, className, {
                  [classes.disabled]: disabled
                })}
                onBlur={this.handleOnBlur}
                error={isError}
                onFocus={() => this.setState({ fieldErrors: {} })}
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
          {customValidationMessage}
        </div>
      );
    }
    return null;
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
)(Input);
