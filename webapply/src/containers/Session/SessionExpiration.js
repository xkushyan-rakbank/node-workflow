import React, { useEffect, useState, memo } from "react";
import { useLocation } from "react-router-dom";

import { USER_IDLE_TIMEOUT, EXPIRY_INTERVAL } from "../../constants";
import Alert from "./components/Alert";
let reminderTimer = EXPIRY_INTERVAL;
export const SessionExpiration = memo(props => {
  const location = useLocation();
  const [isExpired, setExpiredStatus] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [expiryTime, setExpiryTime] = useState(reminderTimer);
  const [extendExpiryTime, setExtendExpiryTime] = useState(false);
  const [isAgent, setIsAgent] = useState(false);

  useEffect(() => {
    setExtendExpiryTime(true);
  }, [props.uploadDocuments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (props.authToken && typeof props.authToken !== "undefined") {
        startExpiryInterval();
      }
    }, USER_IDLE_TIMEOUT);

    let intervalRef = null;
    const startExpiryInterval = () => {
      reminderTimer = EXPIRY_INTERVAL;
      setShowReminder(true);
      intervalRef = setInterval(() => {
        if (reminderTimer > 0) {
          reminderTimer--;
          setExpiryTime(reminderTimer);
        } else {
          clearInterval(intervalRef);
          logout();
        }
      }, 1000);
    };
    if (extendExpiryTime) {
      setExtendExpiryTime(false);
      setShowReminder(false);
    }
    return () => {
      clearTimeout(timer);
      clearInterval(intervalRef);
    };
  }, [location.pathname, extendExpiryTime]);

  const logout = () => {
    setExpiredStatus(true);
    setShowReminder(false);
    props.setAccessToken("");
    if (props.isAuthenticated && props.authToken) {
      setIsAgent(true);
      props.logout();
    }
  };

  if (!isExpired && !showReminder) {
    return null;
  }

  if (showReminder) {
    return (
      <Alert
        type="PROGRESS"
        isOpen={true}
        handleConfirm={() => setExtendExpiryTime(true)}
        details={
          "Oops, looks like your session is about to expire. Would you like to continue on this page?"
        }
        percentage={(expiryTime / EXPIRY_INTERVAL) * 100}
        progressLabel={String(expiryTime)}
        isAgent={isAgent}
      />
    );
  }

  return (
    <Alert
      type="SUCCESS"
      isOpen={true}
      handleConfirm={() => window.location.reload()}
      details="Sorry, your session has expired. But don't worry, you can retrieve your application from where you left."
      isAgent={isAgent}
    />
  );
});

SessionExpiration.displayName = "SessionExpiration";
