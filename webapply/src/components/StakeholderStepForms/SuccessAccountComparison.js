import React from "react";
import { withStyles } from "@material-ui/core";
import doneIcon from "../../assets/images/done_icon.png";

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
    marginBottom: "22px",
    width: "135px"
  },
  successTitle: {
    fontSize: "18px",
    textAlign: "center",
    color: "#373737"
  }
};

class SuccessFilledStakeholder extends React.Component {
  componentDidMount() {
    // setTimeout(() => {
    //   this.props.hideForm();
    // }, 5000);
  }

  render() {
    const { classes, name } = this.props;
    return (
      <div className={classes.wrapper}>
        <img src={doneIcon} alt="" className={classes.placeholder} />
        <div className={classes.successTitle}>
          Congrats! You have added
          <br /> <b>{name}</b> as a stakeholder
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SuccessFilledStakeholder);
