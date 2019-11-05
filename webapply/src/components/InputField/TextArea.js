import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import cx from "classnames";
import { getValidationErrors } from "../../store/selectors/validationErrors";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";

import ErrorMessage from "../ErrorMessage";

const styles = {
  textArea: {
    resize: "none",
    width: "328px",
    padding: "16px",
    height: "80px",
    borderRadius: "8px",
    border: "solid 1px rgba(194, 194, 194, 0.56)",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "Open Sans",
    fontSize: "12px",
    color: "#000",
    "&::placeholder": {
      color: "#666"
    }
  },
  error: {
    borderColor: "red"
  }
};

class TextArea extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  handleChange = e => {
    this.props.updateProspect({ [this.props.name]: e.target.value });
  };

  render() {
    const {
      config: { required, maxlength, validationErrors = {}, placeholder },
      classes,
      id,
      errorList
    } = this.props;

    const hasValidError = errorList.some(err => err.id === id);

    return (
      <>
        <textarea
          className={cx(classes.textArea, { [classes.error]: hasValidError })}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={this.handleChange}
          required={required}
          id={id}
          autoFocus
          value={this.props.value}
        />

        {hasValidError && <ErrorMessage error={validationErrors.required} />}
      </>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes),
  errorList: getValidationErrors(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TextArea)
);
