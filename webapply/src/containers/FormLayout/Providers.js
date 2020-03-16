import React from "react";
import { NotificationsProvider } from "../../components/Notification";
import { UpdatedFullNameProvider } from "../../components/UpdatedFullNameContext";
import { VerticalPaginationProvider } from "../../components/VerticalPagination";
import { FormNavigationProvider } from "../../components/FormNavigation/FormNavigationProvider";

export const Providers = ({ children }) => (
  <NotificationsProvider>
    <VerticalPaginationProvider>
      <FormNavigationProvider>
        <UpdatedFullNameProvider>{children}</UpdatedFullNameProvider>
      </FormNavigationProvider>
    </VerticalPaginationProvider>
  </NotificationsProvider>
);
