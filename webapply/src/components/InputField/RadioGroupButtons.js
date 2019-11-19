import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";

import RadioGroup from "@material-ui/core/RadioGroup";
import RadioButton from "../InputField/RadioButton";
import Subtitle from "../Subtitle";
import { ErrorMessage } from "./../Notifications";

import { updateProspect } from "../../store/actions/appConfig";
import { getValidationErrors } from "../../store/selectors/validationErrors";
import { getGeneralInputProps } from "../../store/selectors/input";
import { defineDynamicInputId } from "../../constants";

const styles = {
  radioGroup: {
    flexDirection: "initial"
  },
  gridGroup: {
    alignItems: "baseline",
    width: "100%"
  }
};

class RadioGroupButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedValue: ""
    };
  }

  onChange = e => {
    const { value } = e.target;

    this.setState({ selectedValue: value });
    this.props.updateProspect({ [this.props.name]: value });
  };

  render() {
    const {
      classes,
      id,
      indexes,
      config: { datalist = [], validationErrors = {}, required, label },
      errorList,
      helpMessage
    } = this.props;
    const { selectedValue } = this.state;
    const attrId = defineDynamicInputId(id, indexes);
    const hasValidError = errorList.some(err => err.id === attrId);

    return (
      <RadioGroup classes={{ root: classes.radioGroup }} onChange={this.onChange}>
        <Subtitle title={label} helpMessage={helpMessage} />

        <div className={cx("box-group-grid", classes.gridGroup)}>
          <input
            onChange={() => {}}
            value={this.props.value || ""}
            id={attrId}
            required={required}
            style={{ display: "none" }}
          />

          {datalist.map(({ code, key, value, displayText }) => (
            <RadioButton
              value={value}
              label={displayText}
              key={key}
              checked={value === this.props.value}
            />
          ))}

          {this.props.children}
        </div>

        {hasValidError && !selectedValue && <ErrorMessage error={validationErrors.required} />}
      </RadioGroup>
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
  )(RadioGroupButtons)
);
