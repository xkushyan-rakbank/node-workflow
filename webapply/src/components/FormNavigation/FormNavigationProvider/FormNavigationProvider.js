import React, { useMemo } from "react";
import { useSetUpChatAndNavigationStep } from "./useSetUpChatAndNavigationStep";

export const FormNavigationContext = React.createContext({});

export const FormNavigationProvider = ({ children }) => {
  const [isChatVisible, navigationSteps] = useSetUpChatAndNavigationStep();
  const contextValue = useMemo(
    () => ({
      isChatVisible,
      navigationSteps
    }),
    [isChatVisible, navigationSteps]
  );

  return (
    <FormNavigationContext.Provider value={contextValue}>{children}</FormNavigationContext.Provider>
  );
};
