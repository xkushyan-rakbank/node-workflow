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
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import isBoolean from "lodash/isBoolean";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

import { InfoTitle } from "./../Notifications";
import { updateProspect } from "../../store/actions/appConfig";
import { validate } from "../../utils/validate";
import { ErrorMessage } from "./../Notifications";
import { defineDynamicInputId } from "../../constants";
import { getGeneralInputProps } from "../../store/selectors/input";

const styles = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    },
    "& fieldset": {
      // borderRight: "1px solid #dddddd !important",
      "@media all and (-ms-high-contrast: active), (-ms-high-contrast: none)": {
        // target style IE11
        top: "0"
      }
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
      right: " 56px",
      top: 0,
      zIndex: "1"
    },
    "& > div:first-child": {
      paddingRight: "56px"
    },
    "& fieldset": {
      borderRadius: "8px !important",
      border: "solid 1px rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      position: "absolute",
      right: "20px"
    }
  },
  selectFieldCombined: {
    width: "93px !important",
    position: "absolute",
    zIndex: 1,
    "& label": {
      maxWidth: "unset"
    },
    "& fieldset": {
      borderColor: "transparent",
      borderRight: "1px solid #dddddd !important"
    },
    "& svg": {
      right: "10px"
    },
    "& input": {
      paddingLeft: 0
    },
    "& legend": {
      marginLeft: 0
    },
    "& .MuiSelect-select.Mui-disabled": {
      backgroundColor: "transparent !important"
    }
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
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
      this.props.updateProspect({ [this.props.name]: this.props.defaultValue });
    }
    this.isSelectRequired() ? this.setRequiredForInput() : this.unsetRequiredForInput();

    // uncomitted when PureSelect component will replace Select in project
    // window.addEventListener("resize", () => console.log(this.inputLabel));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!isUndefined(this.props.defaultValue) && !this.props.value) {
      this.props.updateProspect({ [this.props.name]: this.props.defaultValue });
    }
    if (isEmpty(prevProps.config) && !isEmpty(this.props.config)) {
      this.setState({ labelWidth: this.inputLabel.current.offsetWidth });
    }
    if (prevProps.required !== this.props.required && !this.props.required) {
      this.setState({ fieldErrors: {} });
    }
    this.isSelectRequired() ? this.setRequiredForInput() : this.unsetRequiredForInput();
  }

  isSelectRequired() {
    if (isBoolean(this.props.required)) {
      return this.props.required;
    }
    return get(this.props, "config.required", false);
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
    inputNode.focus = this.handleInputFocus;
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

  updateProspect = event => {
    const { name, updateProspect, callback } = this.props;
    this.setState({ fieldErrors: {} });
    updateProspect({ [name]: event.target.value });
    if (callback) {
      callback(event.target.value);
    }
  };

  handleBlur = () => this.checkInputValidity();

  composeInputProps() {
    return {};
  }

  renderValueForMultiple = selected => {
    return (
      <div className={this.props.classes.chips}>
        {selected.map(value => (
          <Chip key={value} label={value} className={this.props.classes.chip} />
        ))}
      </div>
    );
  };

  render() {
    const { fieldErrors } = this.state;
    const {
      config,
      value = "",
      classes,
      combinedSelect,
      disabled,
      id,
      resetValue,
      resetLabel = "",
      excludeValues = [],
      multiple,
      indexes,
      subOptions
    } = this.props;

    const attrId = defineDynamicInputId(id, indexes);
    const isError = !isEmpty(fieldErrors);
    const inputProps = this.composeInputProps();
    const className = combinedSelect ? classes.selectFieldCombined : classes.selectFieldBasic;
    const options = subOptions ? subOptions : config.datalist;

    return (
      <FormControl
        className={cx("formControl", {
          [classes.selectFieldCombined]: combinedSelect
        })}
        variant="outlined"
        error={isError}
      >
        <InputLabel ref={this.inputLabel} htmlFor={attrId}>
          {config.label}
        </InputLabel>

        <Select
          multiple={multiple}
          disabled={disabled}
          value={value || []}
          onBlur={this.handleBlur}
          onChange={this.updateProspect}
          IconComponent={KeyboardArrowDownIcon}
          className={cx(classes.selectField, className)}
          MenuProps={multiple && MenuProps}
          renderValue={multiple && this.renderValueForMultiple}
          input={
            <OutlinedInput
              inputRef={node => (this.inputRef = node)}
              labelWidth={this.state.labelWidth}
              id={attrId}
              inputProps={inputProps}
            />
          }
        >
          {!isNil(resetValue) && <MenuItem value={resetValue}>{resetLabel}</MenuItem>}

          {options &&
            options
              .filter(item => !excludeValues.includes(item.key))
              .map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {multiple ? (
                    <>
                      <ListItemText primary={option.displayText} />
                      <Checkbox checked={value.indexOf(option.key) > -1} />
                    </>
                  ) : (
                    option.displayText
                  )}
                </MenuItem>
              ))}
        </Select>

        {!!config.title && <InfoTitle title={config.title} />}

        {isError && (
          <ErrorMessage error={fieldErrors.error} multiLineError={fieldErrors.multiLineError} />
        )}
      </FormControl>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PureSelect)
);
