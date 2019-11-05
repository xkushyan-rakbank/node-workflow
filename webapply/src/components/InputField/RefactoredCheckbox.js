import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";
import { compose } from "recompose";
import { connect } from "react-redux";
import HelpTooltip from "../HelpTooltip";
import { defineDynamicInputId } from "../../constants";
import { updateProspect } from "../../store/actions/appConfig";
import { getGeneralInputProps } from "../../store/selectors/input";
import Check from "../../assets/icons/on.png";
import infoIc from "../../assets/icons/info.png";

const styles = {
  checkboxWrapper: {
    display: "flex",
    alignItems: "center"
  },
  checkboxContainer: {
    display: "inline-block",
    verticalAlign: "middle",
    marginTop: "5px"
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
    border: "solid 1px #373737",
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
  },
  doubleLabel: {
    marginLeft: "10px"
  },
  firstRow: {
    fontSize: "14px",
    lineHeight: 1.71,
    color: "#373737",
    "&.disabled": {
      color: "#00000061"
    }
  },
  secondRow: {
    fontSize: "12px",
    color: "#a4a4a4",
    display: "flex",
    marginTop: "5px",
    "& img": {
      width: "16px",
      height: "16px",
      marginRight: "5px"
    }
  },
  questionIcon: {
    marginLeft: "10px"
  },
  labelWrapper: {
    display: "flex"
  }
};

class CustomCheckbox extends React.Component {
  updateProspect = event => {
    event.stopPropagation();
    const value = event.target.checked;
    const { name, callback } = this.props;
    this.props.updateProspect({ [name]: value });
    if (callback) {
      callback(value);
    }
  };

  getDataAttr() {
    return {
      id: defineDynamicInputId(this.props.id, this.props.indexes)
    };
  }

  render() {
    const { config, classes, value = false, withQuestion, style, disabled } = this.props;
    return (
      <div style={{ ...style }}>
        <div className={classes.labelWrapper}>
          <label className={classes.checkboxWrapper}>
            <div className={classes.checkboxContainer}>
              <input
                {...this.getDataAttr()}
                type="checkbox"
                value={value}
                onChange={this.updateProspect}
                checked={value}
                className={classes.hiddenCheckbox}
                disabled={disabled}
              />
              <div className={classes.styledCheckbox}>
                {value && <img src={Check} alt="check icon" />}
              </div>
            </div>
            {config.title ? (
              <div className={classes.doubleLabel}>
                <div className={cx(classes.firstRow, { disabled })}>{config.label}</div>
              </div>
            ) : (
              <span className={classes.label}>{config.label}</span>
            )}
          </label>

          {withQuestion && (
            <HelpTooltip
              message={
                "Lorem ipsum dolor sit amet, consectet adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              }
            />
          )}
        </div>
        {config.title && (
          <div className={classes.secondRow}>
            <img src={infoIc} alt="info" />
            {config.title}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { id, indexes }) => ({
  ...getGeneralInputProps(state, id, indexes)
});

const mapDispatchToProps = {
  updateProspect
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CustomCheckbox);
