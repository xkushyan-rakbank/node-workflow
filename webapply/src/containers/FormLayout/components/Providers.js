import React from "react";
import { NotificationsProvider } from "../../../components/Notification";
import { VerticalPaginationProvider } from "../../../components/VerticalPagination";
import { FormNavigationProvider } from "../../../components/FormNavigation/FormNavigationProvider";
import { LayoutProvider } from "../LayoutProvider";
import { LogoTypeProvider } from "../LogoTypeProvider";

export const Providers = ({ children }) => (
  <NotificationsProvider>
    <LogoTypeProvider>
      <VerticalPaginationProvider>
        <FormNavigationProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </FormNavigationProvider>
      </VerticalPaginationProvider>
    </LogoTypeProvider>
  </NotificationsProvider>
);
