import React, { createContext, useReducer, useCallback, useMemo, useContext } from "react";
import uniqueId from "lodash/uniqueId";
import { styled } from "@material-ui/core";

import { Notification } from "./Notification";

let NotificationsManager = {};
const NotificationsContext = createContext(NotificationsManager);
const notificationsReducer = (store, { op, notification }) => {
  switch (op) {
    case "add":
      return store.concat(notification);
    case "remove":
      return store.filter(item => item.id !== notification);
    default:
      return store;
  }
};

const NotificationsProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationsReducer, []);
  const remove = useCallback(notification => dispatch({ op: "remove", notification }), [dispatch]);
  const add = useCallback(
    (options = {}) => {
      const id = uniqueId("notification-");
      dispatch({ op: "add", notification: { ...options, id } });
      setTimeout(() => remove(id), options.delay || 5000);
    },
    [dispatch, remove]
  );
  NotificationsManager = useMemo(
    () => ({
      notifications,
      add,
      remove
    }),
    [notifications, add, remove]
  );
  return (
    <NotificationsContext.Provider value={NotificationsManager}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const NotificationsStyled = styled("div")({
  position: "fixed",
  top: "10px",
  right: "10px",
  zIndex: "10000",
  display: "flex",
  flexDirection: "column-reverse",
  "> div": {
    marginBottom: 0
  }
});

const Notifications = () => {
  const { notifications, remove } = useContext(NotificationsContext);

  return (
    <NotificationsStyled>
      {notifications.map(({ id, ...options }) => (
        <Notification key={id} {...options} onClose={() => remove(id)} />
      ))}
    </NotificationsStyled>
  );
};

export { NotificationsContext, NotificationsProvider, Notifications, NotificationsManager };
