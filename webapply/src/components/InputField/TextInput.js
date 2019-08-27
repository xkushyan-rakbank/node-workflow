import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { compose } from "recompose";
import get from "lodash/get";
import InfoTitle from "./../InfoTitle";
import { updateField } from "../../store/actions/appConfig";

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
  updateField = event => {
    const value = event.target.value;
    const { name } = this.props.config;
    this.props.updateField({ value, name });
  };

  render() {
    const { id, config, classes, value } = this.props;

    if (id && config.label) {
      return (
        <FormControl className="formControl">
          <TextField
            variant="outlined"
            value={value}
            label={config.label}
            placeholder={config.placeholder}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              required: !!get(config, "validationErrors.required")
            }}
            onChange={this.updateField}
          />
          {!!config.title && <InfoTitle title={config.title} />}
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
