import React from "react";
import { action } from "@storybook/addon-actions";
import { MuiThemeProvider, Button } from "@material-ui/core";

import { ConfirmDialog } from "../components/Modals";
import {
  NotificationsProvider,
  Notifications,
  NotificationsManager
} from "../components/Notifications";
import { theme } from "../theme";

export default {
  title: "Modals"
};

export const confirmDialog = () => (
  <MuiThemeProvider theme={theme}>
    <ConfirmDialog
      title={"Are you sure?"}
      message="test message"
      isOpen={true}
      handleClose={action("closed")}
      handleConfirm={action("confirmed")}
      handleReject={action("rejected")}
    />
  </MuiThemeProvider>
);

confirmDialog.story = {
  name: "Confirm Dialog"
};

export const notification = () => (
  <MuiThemeProvider theme={theme}>
    <NotificationsProvider>
      <Notifications />
      <Button
        variant="contained"
        onClick={() =>
          NotificationsManager.add({
            title: "Test Title",
            message: "Test Message"
          })
        }
      >
        Notify me!
      </Button>
    </NotificationsProvider>
  </MuiThemeProvider>
);

notification.story = {
  name: "Notification"
};
