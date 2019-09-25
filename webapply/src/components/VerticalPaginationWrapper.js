import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

import VideoBackground from "./BackgroundVideoPlayer";

// Parent wrapper component total vertical padding.
//Temporary solution. In the future should be fixed
const parentTotalOffset = 140;
const parentBottomOffset = 50;

const style = {
  paginationWrapper: {
    position: "relative",
    height: `calc(100vh - ${parentTotalOffset}px)`,
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
    justifyContent: "center",
    height: `calc(100vh - ${parentTotalOffset}px)`,
    overflow: "hidden",
    "&:not(:last-child)": {
      marginBottom: "50px"
    }
  },
  paginationDots: {
    position: "absolute",
    top: "50vh",
    right: "30px",
    width: "10px",
    zIndex: 2,
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
      nextElementPosition: 0,
      currentElement: "0"
    };
    this.timeStamp = new Date();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.indexScrollToSection) {
      this.handleClick(nextProps.indexScrollToSection);
    }
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
    const correctedPadding = nextElementPosition ? `${parentBottomOffset}px` : "0px";
    const top = `
          calc((100vh -
          ${parentTotalOffset}px)*-${nextElementPosition} -
          ${correctedPadding}*${nextElementPosition})`;
    this.setState({
      top,
      nextElementPosition,
      currentElement: nextElementPosition.toString()
    });
  };

  handleClick = e => {
    // todo instead of e.currentTarget.name use index
    const nextElementPosition = parseInt(e.currentTarget.name);
    const correctedPadding = nextElementPosition ? `${parentBottomOffset}px` : "0px";
    const top = `
          calc((100vh -
          ${parentTotalOffset}px)*-${nextElementPosition} -
          ${correctedPadding}*${nextElementPosition})`;
    this.setState({
      top,
      nextElementPosition,
      currentElement: e.currentTarget.name
    });
  };

  render() {
    const { classes, children, videoUrl } = this.props;
    const { top, nextElementPosition } = this.state;

    return (
      <>
        <div className={classes.paginationWrapper} onWheel={this.handleWheel}>
          {videoUrl && (
            <VideoBackground
              nextElementPosition={nextElementPosition}
              videoUrl={videoUrl}
              handleClick={this.handleClick}
            />
          )}
          <div style={{ top }} className={classes.paginationContent}>
            {React.Children.map(children, child => (
              <div className={classes.childWrapper}>{child}</div>
            ))}
          </div>
        </div>
        <div className={classes.paginationDots}>
          {videoUrl
            ? nextElementPosition !== 0 && this.renderPagination(children)
            : this.renderPagination(children)}
        </div>
      </>
    );
  }
}

export default withStyles(style)(VerticalPaginationWrapper);
