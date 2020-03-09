import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NON_VISIBLE_FOR_CHAT_ROUTES, VISIBLE_FOR_CHAT_ROUTES } from "../constants";
import { agentBaseName } from "../../../routes";
import { formStepper, searchProspectStepper } from "../../../constants";
import { getIsEditableStatusSearchInfo } from "../../../store/selectors/searchProspect";

export const useSetUpChatAndNavigationStep = () => {
  const {
    location: { pathname }
  } = useHistory();
  const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  const isVisibleForChat = VISIBLE_FOR_CHAT_ROUTES.includes(pathname);
  const isChatVisible =
    !isApplyEditApplication &&
    isVisibleForChat &&
    pathname.indexOf(agentBaseName) === -1 &&
    !NON_VISIBLE_FOR_CHAT_ROUTES.includes(pathname);

  let navigationSteps;
  if (pathname.startsWith(agentBaseName)) {
    navigationSteps = searchProspectStepper;
  } else if (isChatVisible) {
    navigationSteps = formStepper;
  } else {
    navigationSteps = [];
  }

  return [isChatVisible, navigationSteps];
};
