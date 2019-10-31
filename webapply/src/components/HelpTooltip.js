import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover from "./Popover";
import questionMark from "../assets/icons/question_mark_grey.png";

const styles = {
  wrapper: {
    marginLeft: "12px",
    position: "relative",
    display: "flex",
    alignItems: "center"
  },
  questionIcon: {
    cursor: "pointer"
  }
};

class HelpTooltip extends React.Component {
  state = {
    isOpenPopover: false
  };

  togglePopover = () => {
    if (!this.state.isOpenPopover) {
      document.addEventListener("click", this.togglePopover, false);
    } else {
      document.removeEventListener("click", this.togglePopover, false);
    }

    this.setState(prevState => ({
      isOpenPopover: !prevState.isOpenPopover
    }));
  };

  render() {
    const { classes, message } = this.props;
    return (
      <div className={classes.wrapper}>
        <img
          alt=""
          src={questionMark}
          className={classes.questionIcon}
          onClick={this.togglePopover}
        />
        {this.state.isOpenPopover && <Popover message={message} />}
      </div>
    );
  }
}

export default withStyles(styles)(HelpTooltip);
