import React, { useState, useRef } from "react";
import { createGlobalStyle } from "styled-components";
import cx from "classnames";

import VideoBackground from "../BackgroundVideoPlayer";
import { useStyles, transitionDuration } from "./styled";

const PreventOverscrolling = createGlobalStyle`
body {
  @media (min-width: 956px) and (min-height: 741px) {
      overflow: hidden;
    }
}`;

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationComponent = ({
  children,
  showVideoOnMobile = false,
  scrollToSecondSection,
  video
}) => {
  const classes = useStyles();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);
  const scrollings = useRef([]);
  const prevTime = useRef(new Date().getTime());
  const poster = (video && video.poster) || "";

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

  const getAverage = (elements, number) => {
    let sum = 0;
    const lastElements = elements.slice(Math.max(elements.length - number, 1));
    lastElements.map(element => (sum = sum + element));

    return Math.ceil(sum / number);
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
      <PreventOverscrolling />
      <div className={classes.paginationWrapper} onWheel={handleWheel}>
        {poster && (
          <VideoBackground
            video={video}
            nextElementPosition={currentSectionIndex}
            videoWrapperClass={cx({ "hide-on-mobile": !showVideoOnMobile })}
            scrollToSection={scrollToSection}
            handleClick={handleClick}
            handleClickMobile={scrollToSecondSection}
          />
        )}
        <div
          className={classes.paginationContent}
          style={{ transform: `translateY(-${100 * currentSectionIndex}vh)` }}
        >
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
          {children.map((_, i) => (
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
