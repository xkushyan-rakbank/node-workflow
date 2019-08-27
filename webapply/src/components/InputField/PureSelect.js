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
      borderColor: "rgba(194, 194, 194, 0.56)",
      "& + div": {
        paddingRight: "56px"
      }
    },
    "& svg": {
      position: "absolute",
      right: "20px"
    }
  }
};

class CustomSelect extends React.Component {
  state = {
    labelWidth: 0
  };

  inputLabel = React.createRef();

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
    const { config, value, id, options, classes } = this.props;

    return (
      <FormControl className="formControl" variant="outlined">
        <InputLabel ref={this.inputLabel} htmlFor={id}>
          {config.label}
        </InputLabel>
        <Select
          value={value}
          input={
            <OutlinedInput
              labelWidth={this.state.labelWidth}
              name={config.name}
              id={id}
            />
          }
          IconComponent={KeyboardArrowDownIcon}
          className={cx(classes.selectField, classes.selectFieldBasic)}
          onChange={this.updateField}
        >
          <MenuItem value=""></MenuItem>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
)(CustomSelect);
