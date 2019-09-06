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
    "& label": {
      maxWidth: "unset"
    },
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
    attr: {}
  };
  state = {
    fieldErrors: {}
  };

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

    if (this.props.attr.required) {
      config.required = true;
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

  render() {
    const {
      id,
      config,
      classes,
      className,
      InputProps = {},
      attr = {},
      InputLabelProps,
      disabled,
      select
    } = this.props;

    const { fieldErrors } = this.state;
    const inputProps = {
      ...fieldAttr(id, config),
      ...attr,
      disabled
    };
    const isError = !isEmpty(fieldErrors);

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
              />

              {!!config.title && <InfoTitle title={config.title} />}
            </FormControl>
          </FormGroup>

          {isError && (
            <ErrorMessage
              error={fieldErrors.error}
              multiLineError={fieldErrors.multiLineError}
            />
          )}
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
