import React, { useState, useCallback, useMemo, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import { transitionDuration } from "./styled";

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationProvider = ({ children }) => {
  // reset scroll params when location changes.
  const location = useLocation();
  const [currentSection, setCurrentSectionValue] = useState({ index: 0, counter: 0 });
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);

  useLayoutEffect(() => {
    setCurrentSectionValue({ index: 0, counter: 0 });
  }, [location]);

  const setCurrentSection = useCallback(
    sectionIndex => {
      isCanScroll.current = false;

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isCanScroll.current = true;
      }, transitionDuration * 2);

      setCurrentSectionValue({ index: sectionIndex, counter: currentSection.counter + 1 });
    },
    [setCurrentSectionValue, scrollTimeout, currentSection]
  );

  const contextValue = useMemo(
    () => ({
      currentSectionIndex: currentSection.index,
      counter: currentSection.counter,
      isCanScroll,
      setCurrentSection
    }),
    [currentSection, isCanScroll, setCurrentSection]
  );

  return (
    <VerticalPaginationContext.Provider value={contextValue}>
      {children}
    </VerticalPaginationContext.Provider>
  );
};
