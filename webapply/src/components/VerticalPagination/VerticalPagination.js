import React, { useRef, useContext, useEffect } from "react";
import cx from "classnames";

import { BackgroundVideoPlayer } from "../BackgroundVideoPlayer";
import { VerticalPaginationContext } from "./VerticalPaginationProvider";
import { useStyles } from "./styled";
import { getAverage } from "./utils";

export const VerticalPaginationComponent = ({
  children,
  showVideoOnMobile = false,
  hasVideo = false,
  scrollToSecondSection,
  video
}) => {
  const { currentSectionIndex, scrollToSection, isCanScroll, setHasVideo } = useContext(
    VerticalPaginationContext
  );
  const classes = useStyles({ currentSectionIndex });
  const scrollings = useRef([]);
  const prevTime = useRef(new Date().getTime());
  const poster = (video && video.poster) || "";

  useEffect(() => {
    setHasVideo(hasVideo);
  }, [setHasVideo, hasVideo]);

  const handleWheel = e => {
    const offset = e.deltaY < 0 ? -1 : 1;
    const nextSectionIndex = currentSectionIndex + offset;

    if (nextSectionIndex < 0 || nextSectionIndex > children.length - 1) {
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
        <div className={classes.paginationContent}>
          {poster && (
            <BackgroundVideoPlayer
              video={video}
              videoWrapperClass={cx({ "hide-on-mobile": !showVideoOnMobile })}
              scrollToSection={scrollToSection}
              handleClick={handleClick}
              handleClickMobile={scrollToSecondSection}
              currentSectionIndex={currentSectionIndex}
            />
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
          {React.Children.toArray(children).map((_, i) => (
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
