import React from "react";
import get from "lodash/get";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { connect } from "react-redux";
import Check from "./../../assets/images/on.svg";
import { updateField } from "../../store/actions/appConfig";
import combineNestingName from "../../utils/combineNestingName";
import { DATA_ATTRIBUTES } from "../../constants";

const styles = {
  checkboxWrapper: {
    display: "flex"
  },
  checkboxContainer: {
    display: "inline-block",
    verticalAlign: "middle"
  },
  icon: {
    fill: "none",
    stroke: "white",
    strokeWidth: "2px"
  },
  hiddenCheckbox: {
    border: "0",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
    "&:focus + &": {
      boxShadow: "0 0 0 3px pink"
    }
  },
  styledCheckbox: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "solid 2px #16216a",
    borderRadius: "8px",
    transition: "all 150ms",
    position: "relative",
    "& img": {
      position: "absolute",
      top: "-2px",
      left: "-2px",
      bottom: "0"
    }
  },
  label: {
    marginLeft: "8px",
    color: "#373737",
    userSelect: "none",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "400"
  }
};

class CustomCheckbox extends React.Component {
  updateField = event => {
    const value = event.target.checked;
    const { name } = this.props;
    this.props.updateField({ value, name });
  };

  getDataAttr() {
    return {
      [DATA_ATTRIBUTES.INPUT_ID]: this.props.id
    };
  }

  render() {
    const { config, classes, value = false, id, name } = this.props;
    return (
      <label className={classes.checkboxWrapper}>
        <div className={classes.checkboxContainer}>
          <input
            {...this.getDataAttr()}
            id={name}
            type="checkbox"
            value={value}
            name={name}
            onChange={this.updateField}
            checked={value}
            className={classes.hiddenCheckbox}
          />
          <div className={classes.styledCheckbox}>
            {value && <img src={Check} alt="check icon" />}
          </div>
        </div>
        <span className={classes.label}>{config.label}</span>
      </label>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => {
  const config = state.appConfig.uiConfig[id] || {};
  const hasNesting = config.name && config.name.search(/\*/);
  const name = hasNesting
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
)(CustomCheckbox);
