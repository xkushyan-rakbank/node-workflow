import React, { useState, useRef, useContext } from "react";
import cx from "classnames";

import { BackgroundVideoPlayer } from "../BackgroundVideoPlayer";
import { useStyles, transitionDuration } from "./styled";
import { getAverage } from "./utils";
import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationComponent = ({
  children,
  showVideoOnMobile = false,
  scrollToSecondSection,
  video
}) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const classes = useStyles({ isMobileNotificationActive, currentSectionIndex });
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);
  const scrollings = useRef([]);
  const prevTime = useRef(new Date().getTime());
  const poster = (video && video.poster) || "";
  const childrenCount = children.length + (poster ? 1 : 0);

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

  const scrollToSection = sectionIndex => {
    isCanScroll.current = false;

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isCanScroll.current = true;
    }, transitionDuration * 2);

    setCurrentSectionIndex(sectionIndex);
  };

  const handleClick = e => {
    scrollToSection(parseInt(e.currentTarget.name));
  };

  return (
    <VerticalPaginationContext.Provider
      value={{
        currentSectionIndex,
        scrollToSection
      }}
    >
      <div className={classes.paginationWrapper} onWheel={handleWheel}>
        <div className={classes.paginationContent}>
          {poster && (
            <div className={cx(classes.videoWrapper, { "hide-on-mobile": !showVideoOnMobile })}>
              <BackgroundVideoPlayer
                video={video}
                videoWrapperClass={cx({ "hide-on-mobile": !showVideoOnMobile })}
                scrollToSection={scrollToSection}
                handleClick={handleClick}
                handleClickMobile={scrollToSecondSection}
                currentSectionIndex={currentSectionIndex}
              />
            </div>
          )}
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
      {(poster && currentSectionIndex === 0) || (
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
    </VerticalPaginationContext.Provider>
  );
};
