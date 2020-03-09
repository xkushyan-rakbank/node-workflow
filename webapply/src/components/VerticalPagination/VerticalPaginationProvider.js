import React, { useState, useCallback, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import { useLocation } from "react-router";

import { transitionDuration } from "./styled";

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationProvider = ({ children }) => {
  // reset scroll params when location changes.
  const location = useLocation();
  const { initialPosition } = location;
  const [currentSectionIndex, setCurrentSectionIndex] = useState(initialPosition || 0);
  const [hasVideo, setHasVideo] = useState(false);
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);

  useEffect(() => {
    if (initialPosition) {
      setCurrentSectionIndex(initialPosition);
    }
  }, [initialPosition, setCurrentSectionIndex]);

  useLayoutEffect(() => {
    setCurrentSectionIndex(0);
    setHasVideo(false);
  }, [location]);

  const isCurrentSectionVideo = useMemo(() => {
    return hasVideo && currentSectionIndex === 0;
  }, [hasVideo, currentSectionIndex]);

  const scrollToSection = useCallback(
    sectionIndex => {
      isCanScroll.current = false;

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isCanScroll.current = true;
      }, transitionDuration * 2);

      setCurrentSectionIndex(sectionIndex);
    },
    [setCurrentSectionIndex, scrollTimeout]
  );

  const contextValue = useMemo(
    () => ({
      currentSectionIndex,
      isCanScroll,
      scrollToSection,
      isCurrentSectionVideo,
      setHasVideo
    }),
    [currentSectionIndex, isCanScroll, scrollToSection, isCurrentSectionVideo, setHasVideo]
  );

  return (
    <VerticalPaginationContext.Provider value={contextValue}>
      {children}
    </VerticalPaginationContext.Provider>
  );
};
