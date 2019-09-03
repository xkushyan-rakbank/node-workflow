import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { compose } from "recompose";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import InfoTitle from "./../InfoTitle";
import PureSelect from "./PureSelect";
import ErrorMessage from "./../ErrorMessage";
import { updateField } from "../../store/actions/appConfig";
import { fieldAttr } from "./../../constants";
import validate from "./../../utils/validate";
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
  state = {
    fieldErrors: {}
  };

  updateField = event => {
    const value = event.target.value;
    const { name } = this.props;
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
    const {
      id,
      config,
      classes,
      className,
      value,
      InputProps,
      disabled,
      withSelect,
      selectId,
      indexes
    } = this.props;

    const { fieldErrors } = this.state;
    const attrs = fieldAttr(id, config);
    const isError = !isEmpty(fieldErrors);

    if (id && config.label) {
      return (
        <div
          className={cx({
            [classes.selectCombinedWrapper]: withSelect,
            [classes.regularWrapper]: !withSelect
          })}
        >
          <FormGroup
            className={cx({
              [classes.selectCombined]: withSelect,
              [classes.selectCombinedError]: isError
            })}
          >
            {!!withSelect && (
              <PureSelect id={selectId} indexes={indexes} combinedSelect />
            )}
            <FormControl className="formControl">
              <TextField
                disabled={disabled}
                variant="outlined"
                value={value || ""}
                label={config.label}
                className={cx(classes.textField, className, {
                  [classes.disabled]: disabled
                })}
                onChange={this.updateField}
                inputProps={{
                  ...attrs,
                  disabled: disabled
                }}
                onBlur={this.fieldValidation}
                error={isError}
                InputProps={InputProps}
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
