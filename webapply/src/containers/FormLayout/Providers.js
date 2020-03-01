import React from "react";
import { NotificationsProvider } from "../../components/Notification";
import { VerticalPaginationProvider } from "../../components/VerticalPagination";

export const Providers = ({ children }) => (
  <NotificationsProvider>
    <VerticalPaginationProvider>{children}</VerticalPaginationProvider>
  </NotificationsProvider>
);
