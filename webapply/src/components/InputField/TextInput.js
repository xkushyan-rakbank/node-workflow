import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { compose } from "recompose";
import get from "lodash/get";
import InfoTitle from "./../InfoTitle";
import ErrorMessage from "./../ErrorMessage";
import { updateField } from "../../store/actions/appConfig";
import { fieldAttr } from "./../../constants";
import validate from "./../../utils/validate";

const styles = {
  textField: {
    width: "100%",
    display: "flex !important",
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    }
  }
};

class Input extends React.Component {
  state = {
    fieldErrors: ""
  };

  updateField = event => {
    const value = event.target.value;
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
    const { id, config, classes, value } = this.props;
    const { fieldErrors } = this.state;
    const attrs = fieldAttr(id, config);

    if (id && config.label) {
      return (
        <FormControl className="formControl">
          <TextField
            variant="outlined"
            value={value}
            label={config.label}
            className={classes.textField}
            onChange={this.updateField}
            inputProps={attrs}
            onBlur={this.fieldValidation}
            error={!!fieldErrors}
          />
          {!!config.infoTitle && <InfoTitle title={config.infoTitle} />}

          {!!fieldErrors && (
            <ErrorMessage
              error={fieldErrors}
              multiLine="more errors will be here" // replace it from config
            />
          )}
        </FormControl>
      );
    }
    return null;
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
)(Input);
