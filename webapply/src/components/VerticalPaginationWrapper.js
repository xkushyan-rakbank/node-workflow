import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

import VideoBackground from "./BackgroundVideoPlayer";

const style = {
  paginationWrapper: {
    position: "relative",
    height: "100vh",
    overflow: "hidden"
  },
  paginationContent: {
    position: "absolute",
    left: 0,
    width: "100%",
    transition: "top 400ms",
    paddingTop: "171px"
  },
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "relative"
  },
  paginationDots: {
    position: "absolute",
    top: "50vh",
    right: "30px",
    width: "10px",
    zIndex: 2,
    transform: "translateY(-50%)",
    "@media only screen and (max-width: 1360px)": {
      right: "15px"
    }
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

  UNSAFE_componentWillReceiveProps(nextProps) {
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
    this.scrollToPosition(nextElementPosition, nextElementPosition.toString());
  };

  scrollToPosition = (nextElementPosition, currentElement) => {
    const top = `calc(100vh *-${nextElementPosition})`;
    this.setState({
      top,
      nextElementPosition,
      currentElement
    });
  };

  handleClick = e => {
    const nextElementPosition = parseInt(e.currentTarget.name);
    this.scrollToPosition(nextElementPosition, e.currentTarget.name);
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
