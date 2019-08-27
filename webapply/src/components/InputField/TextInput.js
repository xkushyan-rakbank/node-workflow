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
    const {
      config: { label = "", placeholder = "" },
      type,
      infoTitle,
      classes,
      value
    } = this.props;
    if (label) {
      return (
        <FormControl className="formControl">
          <TextField
            variant="outlined"
            value={value}
            label={label}
            placeholder={placeholder}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
              required: !!get(this.props.config, "validationErrors.required")
            }}
            type={type}
            onChange={this.updateField}
          />
          {!!infoTitle && <InfoTitle title={infoTitle} />}
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
