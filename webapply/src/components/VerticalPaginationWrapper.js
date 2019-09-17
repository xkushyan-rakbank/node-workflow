import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

// Parent wrapper component total vertical padding. Temporary solution. In the future should be fixed
const parentOffset = 140;

const style = {
  paginationWrapper: {
    position: "relative",
    height: `calc(100vh - ${parentOffset}px)`,
    overflow: "hidden"
  },
  paginationContent: {
    position: "absolute",
    left: 0,
    width: "100%",
    transition: "top 400ms"
  },
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: `calc(100vh - ${parentOffset}px)`,
    "&:not(:last-child)": {
      marginBottom: "50px"
    }
  },
  paginationDots: {
    position: "absolute",
    top: "50vh",
    right: "30px",
    width: "10px",
    transform: "translateY(-50%)"
  },
  paginationDot: {
    width: "10px",
    height: "10px",
    "& + &": {
      marginTop: "15px"
    },
    "&:focus": {
      outline: "none"
    },
    border: 0,
    padding: 0,
    borderRadius: "50%",
    backgroundColor: "rgba(0,0,0, .2)",
    cursor: "pointer"
  },
  current: {
    backgroundColor: "#020f21",
    cursor: "auto"
  }
};

class VerticalPaginationWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      top: "0",
      currentElement: "0"
    };
    this.timeStamp = new Date();
  }

  renderPagination = children => {
    const { classes } = this.props;
    const { currentElement } = this.state;
    const buttons = [];
    for (let i = 0; i < children.length; i++) {
      buttons.push(
        <button
          key={i}
          name={i}
          className={cx(classes.paginationDot, {
            [classes.current]: currentElement === i.toString()
          })}
          onClick={e => this.handleClick(e)}
        />
      );
    }
    return buttons;
  };

  handleWheel = e => {
    const { currentElement } = this.state;
    const { children } = this.props;
    const now = new Date();
    const offset = e.deltaY < 0 ? -1 : 1;
    const nextElementPosition = parseInt(currentElement) + offset;

    if (
      now - this.timeStamp < 500 ||
      nextElementPosition < 0 ||
      nextElementPosition > children.length - 1
    ) {
      return;
    }

    this.timeStamp = now;
    const top = `calc((100vh - ${parentOffset}px)*-${nextElementPosition})`;
    this.setState({
      top,
      currentElement: nextElementPosition.toString()
    });
  };

  handleClick = e => {
    const top = `calc((100vh - ${parentOffset}px)*-${parseInt(
      e.currentTarget.name
    )})`;
    this.setState({
      top,
      currentElement: e.currentTarget.name
    });
  };

  render() {
    const { classes, children } = this.props;
    const { top } = this.state;
    return (
      <>
        <div className={classes.paginationWrapper} onWheel={this.handleWheel}>
          <div style={{ top }} className={classes.paginationContent}>
            {React.Children.map(children, child => (
              <div className={classes.childWrapper}>{child}</div>
            ))}
          </div>
        </div>
        <div className={classes.paginationDots}>
          {this.renderPagination(children)}
        </div>
      </>
    );
  }
}

export default withStyles(style)(VerticalPaginationWrapper);
