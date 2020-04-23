import React from "react";
import { NotificationsProvider } from "../../../components/Notification";
import { VerticalPaginationProvider } from "../../../components/VerticalPagination";
import { FormNavigationProvider } from "../../../components/FormNavigation/FormNavigationProvider";
import { LayoutProvider } from "../LayoutProvider";

export const Providers = ({ children }) => (
  <NotificationsProvider>
    <VerticalPaginationProvider>
      <FormNavigationProvider>
        <LayoutProvider>{children}</LayoutProvider>
      </FormNavigationProvider>
    </VerticalPaginationProvider>
  </NotificationsProvider>
);
