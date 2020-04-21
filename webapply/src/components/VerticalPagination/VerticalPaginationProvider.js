import React, { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { transitionDuration } from "./styled";

export const VerticalPaginationContext = React.createContext({});

export const VerticalPaginationProvider = ({ children }) => {
  const location = useLocation();
  const [currentSection, setCurrentSectionValue] = useState({ index: 0, counter: 0 });
  const isCanScroll = useRef(true);
  const scrollTimeout = useRef(0);

  useEffect(() => {
    setCurrentSectionValue({ index: 0, counter: currentSection.counter });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
