import React from "react";
import cx from "classnames";
import get from "lodash/get";
import isUndefined from "lodash/isUndefined";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { withStyles } from "@material-ui/core/styles";
import InfoTitle from "../InfoTitle";
import { updateField } from "../../store/actions/appConfig";
import { compose } from "recompose";
import { connect } from "react-redux";
import combineNestingName from "../../utils/combineNestingName";
import { validate } from "../../utils/validate";
import isEmpty from "lodash/isEmpty";
import ErrorMessage from "../ErrorMessage";

const styles = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    }
  },
  selectFieldBasic: {
    position: "relative",
    "&::after": {
      content: "''",
      position: " absolute",
      width: " 1px",
      height: " 100%",
      backgroundColor: " #ddd",
      right: " 56px"
    },
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)",
      "& + div": {
        paddingRight: "56px"
      }
    },
    "& svg": {
      position: "absolute",
      right: "20px"
    }
  },
  selectFieldCombined: {
    width: "90px !important",
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      right: "10px"
    }
  }
};

class PureSelect extends React.Component {
  state = {
    labelWidth: 0,
    fieldErrors: {}
  };

  inputLabel = React.createRef();
  inputRef = {};

  componentDidMount() {
    this.setState({ labelWidth: this.inputLabel.current.offsetWidth });
    if (!isUndefined(this.props.defaultValue) && !this.props.value) {
      this.props.updateField({
        value: this.props.defaultValue,
        name: this.props.name
      });
    }
    if (this.isSelectRequired()) {
      this.setRequiredForInput();
    }

    // uncomitted when PureSelect component will replace Select in project
    // window.addEventListener("resize", () => console.log(this.inputLabel));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (isEmpty(prevProps.config) && !isEmpty(this.props.config)) {
      this.setState({ labelWidth: this.inputLabel.current.offsetWidth });
    }
    if (prevProps.required !== this.props.required) {
      this.setState({ fieldErrors: {} });
    }
    if (this.isSelectRequired()) {
      this.setRequiredForInput();
    } else {
      this.unsetRequiredForInput();
    }
  }

  isSelectRequired() {
    return this.props.required || get(this.props, "config.required", false);
  }

  setRequiredForInput() {
    const inputNode = this.inputRef.node;
    if (!inputNode) {
      return;
    }
    inputNode.required = true;
    inputNode.type = "text";
    inputNode.style.width = "1px";
    inputNode.style.height = "1px";
    inputNode.style.opacity = "0";
    inputNode.focus = this.handleInputFocus;
  }

  unsetRequiredForInput() {
    const inputNode = this.inputRef.node;
    if (!inputNode) {
      return;
    }
    inputNode.required = false;
    inputNode.type = "hidden";
    inputNode.style.width = "unset";
    inputNode.style.height = "unset";
    inputNode.style.opacity = "unset";
    inputNode.focus = () => {};
  }

  handleInputFocus = () => {
    this.checkInputValidity();
  };

  checkInputValidity = () => {
    if (!this.inputRef.node) {
      return;
    }
    const config = {
      ...this.props.config
    };

    if (this.props.required) {
      config.required = true;
    }

    this.setState({
      fieldErrors: validate(this.inputRef.node, config)
    });

    return this.inputRef.node.validity.valid;
  };

  updateField = event => {
    this.setState({ fieldErrors: {} });
    const { value } = event.target;
    const { name } = this.props;
    this.props.updateField({ value, name });
  };

  handleBlur = () => this.checkInputValidity();

  render() {
    const { fieldErrors } = this.state;
    const {
      config,
      value,
      id,
      classes,
      combinedSelect,
      disabled,
      name
    } = this.props;
    const isError = !isEmpty(fieldErrors);
    const className = combinedSelect
      ? classes.selectFieldCombined
      : classes.selectFieldBasic;

    return (
      <FormControl
        className={cx("formControl", {
          [classes.selectFieldCombined]: combinedSelect
        })}
        variant="outlined"
        error={isError}
      >
        <InputLabel ref={this.inputLabel} htmlFor={id}>
          {config.label}
        </InputLabel>
        <Select
          value={value}
          disabled={disabled}
          input={
            <OutlinedInput
              inputRef={node => (this.inputRef = node)}
              labelWidth={this.state.labelWidth}
              name={name}
              id={id}
            />
          }
          IconComponent={KeyboardArrowDownIcon}
          className={cx(classes.selectField, className)}
          onChange={this.updateField}
          onBlur={this.handleBlur}
        >
          {config.datalist &&
            config.datalist.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.displayText}
              </MenuItem>
            ))}
        </Select>
        {!!config.title && <InfoTitle title={config.title} />}
        {isError && (
          <ErrorMessage
            error={fieldErrors.error}
            multiLineError={fieldErrors.multiLineError}
          />
        )}
      </FormControl>
    );
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
)(PureSelect);
