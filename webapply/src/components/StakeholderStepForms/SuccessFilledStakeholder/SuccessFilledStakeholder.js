import React from "react";
import { withStyles } from "@material-ui/core";
import videoUrl from "../../../assets/videos/success_regular.mp4";
import styles from "./styled";

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
