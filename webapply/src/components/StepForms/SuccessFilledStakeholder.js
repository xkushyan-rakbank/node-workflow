import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import doneIcon from "../../assets/images/done-icon.png";

const styles = {
  wrapper: {
    width: "100%",
    height: "275px",
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  placeholder: {
    marginBottom: "22px"
  },
  successTitle: {
    fontSize: "18px",
    textAlign: "center",
    color: "#373737"
  }
};

class SuccessFilledStakeholder extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push("/FinalQuestions");
    }, 5000);
  }

  render() {
    const { classes, name } = this.props;
    return (
      <div className={classes.wrapper}>
        <img src={doneIcon} alt="" className={classes.placeholder} />
        <div className={classes.successTitle}>
          You have successfully added
          <br /> <b>{name}</b> as a stakeholder
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(SuccessFilledStakeholder);
