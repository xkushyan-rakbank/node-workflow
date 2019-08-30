import React from "react";
import cx from "classnames";
import get from "lodash/get";
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
    labelWidth: 0
  };

  inputLabel = React.createRef();

  componentDidMount() {
    this.setState({ labelWidth: this.inputLabel.current.offsetWidth });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.config.name && this.props.config.name) {
      this.setState({ labelWidth: this.inputLabel.current.offsetWidth });
    }
  }

  updateField = event => {
    const { value } = event.target;
    const { name } = this.props.config;
    this.props.updateField({ value, name });
  };

  render() {
    console.log("run");
    const { config, value, id, classes, combinedSelect, disabled } = this.props;

    const className = combinedSelect
      ? classes.selectFieldCombined
      : classes.selectFieldBasic;

    return (
      <FormControl
        className={cx(
          "formControl",
          combinedSelect ? classes.selectFieldCombined : ""
        )}
        variant="outlined"
      >
        <InputLabel ref={this.inputLabel} htmlFor={id}>
          {config.label}
        </InputLabel>
        <Select
          value={value || ""}
          disabled={disabled}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={config.name}
              id={id}
            />
          }
          IconComponent={KeyboardArrowDownIcon}
          className={cx(classes.selectField, className)}
          onChange={this.updateField}
        >
          {config.datalist &&
            config.datalist.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.displayText}
              </MenuItem>
            ))}
        </Select>
        {!!config.title && <InfoTitle title={config.title} />}
      </FormControl>
    );
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
)(PureSelect);
