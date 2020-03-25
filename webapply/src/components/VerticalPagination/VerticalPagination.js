import React, { useRef, useContext, useEffect, useCallback } from "react";
import cx from "classnames";

import { BackgroundVideoPlayer } from "../BackgroundVideoPlayer";
import { VerticalPaginationContext } from "./VerticalPaginationProvider";
import { getAverage, scrollToDOMNode } from "./utils";
import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { useStyles } from "./styled";

export const VerticalPaginationComponent = ({
  children,
  showVideoOnMobile = false,
  scrollToSecondSection = () => {},
  scrollToThirdSection = () => {},
  video
}) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const { currentSectionIndex, scrollToSection, isCanScroll } = useContext(
    VerticalPaginationContext
  );
  const classes = useStyles({ isMobileNotificationActive });
  const scrollings = useRef([]);
  const firstSection = useRef(null);
  const prevTime = useRef(new Date().getTime());
  const childrenCount = children.length + 1;

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 38 || e.keyCode === 33) {
        scrollToSection(currentIndex => (currentIndex <= 0 ? currentIndex : currentIndex - 1));
      } else if (e.keyCode === 40 || e.keyCode === 34) {
        scrollToSection(currentIndex =>
          currentIndex === childrenCount - 1 ? currentIndex : currentIndex + 1
        );
      }
    },
    [scrollToSection, childrenCount]
  );

  useEffect(() => {
    if (currentSectionIndex === 0) {
      scrollToDOMNode(firstSection);
    } else if (currentSectionIndex === 1) {
      scrollToSecondSection();
    } else if (currentSectionIndex === 2) {
      scrollToThirdSection();
    }
  }, [currentSectionIndex, scrollToSecondSection, firstSection.current]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleWheel = e => {
    const offset = e.deltaY < 0 ? -1 : 1;
    const nextSectionIndex = currentSectionIndex + offset;

    if (nextSectionIndex < 0 || nextSectionIndex > childrenCount - 1) {
      return;
    }

    const delta = -e.deltaY || -e.detail;
    const timeNow = new Date().getTime();

    if (scrollings.current.length > 149) scrollings.current.shift();

    scrollings.current.push(Math.abs(delta));

    const timeDiff = timeNow - prevTime.current;
    prevTime.current = timeNow;

    if (timeDiff > 200) scrollings.current = [];

    if (isCanScroll.current) {
      const averageEnd = getAverage(scrollings.current, 10);
      const averageMiddle = getAverage(scrollings.current, 70);
      const isAccelerating = averageEnd >= averageMiddle;

      if (isAccelerating) {
        scrollToSection(nextSectionIndex);
      }
    }
  };

  const handleClick = e => {
    scrollToSection(parseInt(e.currentTarget.name));
  };

  return (
    <>
      <div className={classes.paginationWrapper} onWheel={handleWheel}>
        <div
          ref={firstSection}
          className={cx(classes.videoWrapper, { "hide-on-mobile": !showVideoOnMobile })}
        >
          <BackgroundVideoPlayer
            video={video}
            videoWrapperClass={cx({ "hide-on-mobile": !showVideoOnMobile })}
            scrollToSection={scrollToSection}
            handleClick={handleClick}
            handleClickMobile={scrollToSecondSection}
            currentSectionIndex={currentSectionIndex}
          />
        </div>
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
      {currentSectionIndex !== 0 && (
        <div className={classes.paginationDots}>
          {new Array(childrenCount).fill(null).map((_, i) => (
            <button
              key={i}
              className={cx(classes.paginationDot, {
                [classes.current]: currentSectionIndex === i
              })}
              onClick={() => scrollToSection(i)}
            />
          ))}
        </div>
      )}
    </>
  );
};
