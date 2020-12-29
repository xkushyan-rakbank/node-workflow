import React, { useCallback, useState } from "react";
import { InviteForm } from "./components/InviteForm";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { agentFormStepper } from "../../../constants";
import { NotificationsManager } from "../../../components/Notification";
import { ICONS } from "../../../components/Icons";

export const InviteCustomer = () => {
  useFormNavigation([false, false, agentFormStepper, true, true]);
  const [isLoading, setIsLoading] = useState(false);
  const sendInvitation = inviteData => {
    const successMessageContent = {
      message: "Invite has been sent!",
      title: "",
      icon: ICONS.info
    };
    NotificationsManager.add(successMessageContent);
  };

  const submitForm = useCallback(
    values => {
      let inviteData = { ...values };
      setIsLoading(true);
      return sendInvitation(inviteData).then(
        () => {
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );
    },
    [sendInvitation]
  );

  return <InviteForm isLoading={isLoading} submitForm={submitForm} />;
};
