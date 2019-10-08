import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import { connect } from "react-redux";
import Check from "../../assets/icons/on.png";
import { updateProspect } from "../../store/actions/appConfig";
import { defineDynamicInputId } from "../../constants";
import { getGeneralInputProps } from "../../store/selectors/input";
import questionMark from "../../assets/icons/question_mark_grey.png";

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
    border: "solid 2px #373737",
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
    marginLeft: "17px"
  },
  firstRow: {
    fontSize: "14px",
    lineHeight: 1.71,
    color: "#373737"
  },
  secondRow: {
    fontSize: "12px",
    color: "#a4a4a4"
  },
  questionIcon: {
    marginLeft: "10px"
  }
};

class CustomCheckbox extends React.Component {
  updateProspect = event => {
    const value = event.target.checked;
    const { name, callback } = this.props;
    this.props.updateProspect({ [name]: value /*, "prospect.signatoryInfo[0].firstName": "" */ });
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
    const { config, classes, value = false, withQuestion } = this.props;
    return (
      <label className={classes.checkboxWrapper}>
        <div className={classes.checkboxContainer}>
          <input
            {...this.getDataAttr()}
            type="checkbox"
            value={value}
            onChange={this.updateProspect}
            checked={value}
            className={classes.hiddenCheckbox}
          />
          <div className={classes.styledCheckbox}>
            {value && <img src={Check} alt="check icon" />}
          </div>
        </div>
        {config.title ? (
          <div className={classes.doubleLabel}>
            <div className={classes.firstRow}>{config.label}</div>
            <div className={classes.secondRow}>{config.title}</div>
          </div>
        ) : (
          <span className={classes.label}>{config.label}</span>
        )}
        {withQuestion && <img src={questionMark} alt="" className={classes.questionIcon} />}
      </label>
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
