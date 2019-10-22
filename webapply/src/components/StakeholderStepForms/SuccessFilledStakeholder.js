import React from "react";
import { withStyles } from "@material-ui/core";
import videoUrl from "../../assets/videos/success_regular.mp4";

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
    color: "#373737",
    marginTop: "10px"
  }
};

class SuccessFilledStakeholder extends React.Component {
  componentDidMount() {
    this.intervalId = setInterval(this.props.hideForm, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { classes, name } = this.props;
    return (
      <div className={classes.wrapper}>
        <video autoPlay>
          <source src={videoUrl} />
        </video>
        <div className={classes.successTitle}>
          Congrats! You have added
          <br /> <b>{name}</b> as a stakeholder
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SuccessFilledStakeholder);
