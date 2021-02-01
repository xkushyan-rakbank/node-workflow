import React, { useCallback, useState } from "react";
import { InviteForm } from "./components/InviteForm";
import { useFormNavigation } from "../../../components/FormNavigation/FormNavigationProvider";
import { agentFormStepper } from "../../../constants";
import { NotificationsManager } from "../../../components/Notification";
import { ICONS } from "../../../components/Icons";
import { useLayoutParams } from "../../FormLayout";

// ro-assist-brd3-1
export const InviteCustomer = ({ invite }) => {
  useFormNavigation([false, false, agentFormStepper, true, true]);
  useLayoutParams(true);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = useCallback(
    (values, { resetForm }) => {
      let inviteData = { ...values };
      setIsLoading(true);
      return invite(inviteData).then(
        () => {
          const successMessageContent = {
            message: "Invite has been sent!",
            title: "",
            icon: ICONS.info
          };
          NotificationsManager.add(successMessageContent);
          setIsLoading(false);
          //ro-assist-brd3-1
          resetForm({ values: "" });
        },
        err => {
          const errorMessageContent = {
            message: "Send Invite has failed. Please retry!",
            title: "",
            icon: ICONS.info
          };
          NotificationsManager.add(errorMessageContent);
          setIsLoading(false);
        }
      );
    },
    [invite]
  );

  return <InviteForm isLoading={isLoading} submitForm={submitForm} />;
};
