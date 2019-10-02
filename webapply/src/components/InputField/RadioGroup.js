import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import get from "lodash/get";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import InfoTitle from "../InfoTitle";
import CustomCheckbox from "./CustomCheckbox";
import { getGeneralInputProps } from "../../store/selectors/input";
import { updateField } from "../../store/actions/appConfig";

const style = {
  formControl: {
    display: "block"
  }
};

class RadiobuttonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: get(props.value, [])
    };
  }

  handleChange = event => {
    const { value, checked } = event.target;

    let newValue = this.props.value;
    if (!checked && newValue.includes(value)) {
      newValue.splice(newValue.indexOf(value), 1);
    }

    if (checked && !newValue.includes(value)) {
      newValue.push(value);
    }

    this.props.updateField({
      value: newValue,
      name: this.props.name
    });
  };

  render() {
    const {
      classes = {},
      config: { datalist = [], title, required, error }
    } = this.props;
    return (
      <FormControl
        error={error}
        component="fieldset"
        classes={{ root: classes.formControl }}
        required={required}
      >
        <div className={cx("box-group-grid", classes.checkboxesWrapper)}>
          {datalist.map(item => (
            <CustomCheckbox
              key={item.key}
              value={item.value}
              label={item.displayText}
              handleChange={this.handleChange}
              checked={this.props.value.includes(item.value)}
            />
          ))}
        </div>

        {!!title && <InfoTitle title={title} />}
      </FormControl>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateField
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(RadiobuttonGroup);
