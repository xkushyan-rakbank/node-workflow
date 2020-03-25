import React, { useState, useCallback, useMemo, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { transitionDuration } from "./styled";

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationProvider = ({ children }) => {
  // reset scroll params when location changes.
  const location = useLocation();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);

  useLayoutEffect(() => {
    setCurrentSectionIndex(0);
  }, [location]);

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
      isCurrentSectionVideo: currentSectionIndex === 0
    }),
    [currentSectionIndex, isCanScroll, scrollToSection]
  );

  return (
    <VerticalPaginationContext.Provider value={contextValue}>
      {children}
    </VerticalPaginationContext.Provider>
  );
};
