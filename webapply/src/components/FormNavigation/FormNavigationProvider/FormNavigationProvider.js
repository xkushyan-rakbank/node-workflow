import React, { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { agentBaseName } from "../../../routes";
import { getIsEditableStatusSearchInfo } from "../../../store/selectors/searchProspect";
import { setNavigationStep } from "./setNavigationStep";

export const FormNavigationContext = React.createContext({});

export const FormNavigationProvider = ({ children }) => {
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  const {
    location: { pathname }
  } = useHistory();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isFormStepper, setSideBar] = useState(false);

  const setChatVisibility = useCallback(
    isChatDisplaying => {
      if (!isApplyEditApplication && pathname.indexOf(agentBaseName) === -1) {
        setIsChatVisible(isChatDisplaying);
      }
    },
    [isChatVisible, setIsChatVisible, pathname]
  );

  const setFormStepper = useCallback(
    isFormStepperDisplaying => {
      setSideBar(isFormStepperDisplaying);
    },
    [setSideBar]
  );

  const navigationSteps = setNavigationStep(
    pathname.startsWith(agentBaseName),
    isFormStepper || isChatVisible
  );

  const contextValue = useMemo(
    () => ({
      isChatVisible,
      setChatVisibility,
      navigationSteps,
      setFormStepper
    }),
    [isChatVisible, navigationSteps, setChatVisibility, setFormStepper]
  );

  return (
    <FormNavigationContext.Provider value={contextValue}>{children}</FormNavigationContext.Provider>
  );
};
