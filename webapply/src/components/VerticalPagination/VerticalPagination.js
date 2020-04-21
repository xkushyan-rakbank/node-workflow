import React, { useRef, useContext, useEffect, useCallback } from "react";
import cx from "classnames";

import { VerticalPaginationContext } from "./VerticalPaginationProvider";
import { MobileNotificationContext } from "../Notifications/MobileNotification/MobileNotification";
import { getAverage } from "./utils";
import { useStyles } from "./styled";

export const VerticalPaginationComponent = ({ children, scrollToSection }) => {
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const { currentSectionIndex, setCurrentSection, isCanScroll, counter } = useContext(
    VerticalPaginationContext
  );
  const classes = useStyles({ isMobileNotificationActive });
  const scrollings = useRef([]);
  const prevTime = useRef(new Date().getTime());
  const childrenCount = children.length;

  const handleKeyDown = useCallback(
    e => {
      if (e.keyCode === 38 || e.keyCode === 33) {
        setCurrentSection(Math.max(0, currentSectionIndex - 1));
      } else if (e.keyCode === 40 || e.keyCode === 34) {
        setCurrentSection(Math.min(childrenCount - 1, currentSectionIndex + 1));
      }
    },
    [setCurrentSection, childrenCount, currentSectionIndex]
  );

  useEffect(() => {
    scrollToSection(currentSectionIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollToSection, counter]);

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
        setCurrentSection(nextSectionIndex);
      }
    }
  };

  return (
    <>
      <div className={classes.paginationWrapper} onWheel={handleWheel}>
        {React.Children.map(children, (child, index) => (
          <div
            className={cx(
              classes.childWrapper,
              { [classes.videoWrapper]: index === 0 },
              child.props.className
            )}
          >
            {child}
          </div>
        ))}
      </div>
      {currentSectionIndex > 0 && (
        <div className={classes.paginationDots}>
          {new Array(childrenCount).fill(null).map((_, i) => (
            <button
              key={i}
              className={cx(classes.paginationDot, {
                [classes.current]: currentSectionIndex === i
              })}
              onClick={() => setCurrentSection(i)}
            />
          ))}
        </div>
      )}
    </>
  );
};
