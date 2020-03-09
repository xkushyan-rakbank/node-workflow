import React from "react";
import { NotificationsProvider } from "../../components/Notification";
import { VerticalPaginationProvider } from "../../components/VerticalPagination";
import { FormNavigationProvider } from "../../components/FormNavigation/FormNavigationProvider/FormNavigationProvider";

export const Providers = ({ children }) => (
  <NotificationsProvider>
    <VerticalPaginationProvider>
      <FormNavigationProvider>{children}</FormNavigationProvider>
    </VerticalPaginationProvider>
  </NotificationsProvider>
);
