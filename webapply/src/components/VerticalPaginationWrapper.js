import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

import VideoBackground from "./BackgroundVideoPlayer";
import { mobileResolution, normalScrollHeight } from "../constants";

const transitionDuration = 400;
const style = {
  paginationWrapper: {
    [`@media only screen and (min-width: ${mobileResolution + 1}px) 
    and (min-height: ${normalScrollHeight + 1}px)`]: {
      position: "relative",
      height: "100vh",
      overflowY: "hidden"
    }
  },
  paginationContent: {
    position: "absolute",
    left: 0,
    width: "100%",
    transition: `top ${transitionDuration}ms`,
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      position: "static",
      top: "0!important",
      paddingBottom: 15
    }
  },
  childWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "relative",
    paddingTop: "18vh",
    boxSizing: "border-box",
    padding: "0 26px",
    "@media only screen and (max-height: 900px)": {
      justifyContent: "center",
      paddingTop: "0px"
    },
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      height: "auto",
      padding: "40px 16px 0"
    }
  },
  childWrapperWithHeader: {
    paddingTop: "35px",
    "@media only screen and (max-height: 900px)": {
      justifyContent: "flex-start"
    }
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
    },
    [`@media only screen and (max-width: ${mobileResolution}px), 
    (max-height: ${normalScrollHeight}px)`]: {
      display: "none"
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

    this.prevTime = new Date().getTime();
    this.scrollings = [];
    this.isCanScroll = true;
    this.timeOutScroll = () => {};
  }

  componentDidMount() {
    document.body.classList.add("overflow-hidden");
  }

  componentWillUnmount() {
    document.body.classList.remove("overflow-hidden");
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

  getAverage(elements, number) {
    let sum = 0;
    const lastElements = elements.slice(Math.max(elements.length - number, 1));
    lastElements.map(element => (sum = sum + element));

    return Math.ceil(sum / number);
  }

  handleWheel = e => {
    const { currentElement } = this.state;
    const { children } = this.props;
    const offset = e.deltaY < 0 ? -1 : 1;
    const nextElementPosition = parseInt(currentElement) + offset;

    if (nextElementPosition < 0 || nextElementPosition > children.length - 1) {
      return;
    }

    const delta = -e.deltaY || -e.detail;
    const timeNow = new Date().getTime();

    if (this.scrollings.length > 149) this.scrollings.shift();

    this.scrollings.push(Math.abs(delta));

    const timeDiff = timeNow - this.prevTime;
    this.prevTime = timeNow;

    if (timeDiff > 200) this.scrollings = [];

    if (this.isCanScroll) {
      const averageEnd = this.getAverage(this.scrollings, 10);
      const averageMiddle = this.getAverage(this.scrollings, 70);
      const isAccelerating = averageEnd >= averageMiddle;

      if (isAccelerating) {
        this.scrollToPosition(nextElementPosition, nextElementPosition.toString());
      }
    }
  };

  scrollToPosition = (nextElementPosition, currentElement) => {
    const top = `calc(100vh *-${nextElementPosition})`;

    this.isCanScroll = false;

    clearTimeout(this.timeOutScroll);
    this.timeOutScroll = setTimeout(() => (this.isCanScroll = true), transitionDuration * 2);

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
    const {
      classes,
      children,
      showVideoOnMobile = false,
      scrollToSecondSection,
      video
    } = this.props;
    const { top, nextElementPosition } = this.state;
    const poster = (video && video.poster) || "";

    return (
      <>
        <div className={classes.paginationWrapper} onWheel={this.handleWheel}>
          {poster && (
            <VideoBackground
              video={video}
              videoWrapperClass={cx({ "hide-on-mobile": !showVideoOnMobile })}
              nextElementPosition={nextElementPosition}
              handleClick={this.handleClick}
              handleClickMobile={scrollToSecondSection}
            />
          )}

          <div style={{ top }} className={classes.paginationContent}>
            {React.Children.map(children, child => (
              <div
                className={cx(classes.childWrapper, {
                  [classes.childWrapperWithHeader]: child.props.withHeader
                })}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
        <div className={classes.paginationDots}>
          {poster
            ? nextElementPosition !== 0 && this.renderPagination(children)
            : this.renderPagination(children)}
        </div>
      </>
    );
  }
}

export default withStyles(style)(VerticalPaginationWrapper);
