import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";
import get from "lodash/get";
import { compose } from "recompose";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import { defineDynamicInputId } from "../../constants";
import { getGeneralInputProps } from "../../store/selectors/input";
import { getValidationErrors } from "../../store/selectors/validationErrors";
import { updateProspect } from "../../store/actions/appConfig";
import ErrorMessage from "../ErrorMessage";
import CustomCheckbox from "./CustomCheckbox";
import InfoTitle from "../InfoTitle";

const style = {
  formControl: {
    display: "block"
  }
};

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: get(props.value, []),
      isChanged: false
    };
  }

  handleChange = event => {
    const { value, checked } = event.target;

    this.setState({ isChanged: true });

    let newValue = this.props.value;
    if (!checked && newValue.includes(value)) {
      newValue.splice(newValue.indexOf(value), 1);
    }

    if (checked && !newValue.includes(value)) {
      newValue.push(value);
    }
    this.props.updateProspect({ [this.props.name]: newValue });
  };

  render() {
    const {
      classes = {},
      config: { datalist = [], title, required, error, validationErrors = {} },
      value = [],
      id,
      indexes,
      errorList
    } = this.props;

    const attrId = defineDynamicInputId(id, indexes);
    const hasValidError = errorList.some(err => err.id === attrId);

    return (
      <FormControl
        error={error}
        component="fieldset"
        classes={{ root: classes.formControl }}
        required={required}
      >
        <div className={cx("box-group-grid", classes.checkboxesWrapper)}>
          <CustomCheckbox checked={!!value.length} id={attrId} style={{ display: "none" }} />

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

        {(value.length && this.state.isChanged) ||
          (hasValidError && <ErrorMessage error={validationErrors.required} />)}
        {!!title && <InfoTitle title={title} />}
      </FormControl>
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

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(style)
)(CheckboxGroup);
