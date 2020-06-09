import React, { createContext, useState } from "react";

import { Icon, ICONS } from "../../Icons";
import { useStyles } from "./styled";

export const MobileNotificationContext = createContext({});

export const MobileNotification = ({ children }) => {
  const classes = useStyles();
  const [isDisplayNotification, setDisplayNotification] = useState(true);

  return (
    <MobileNotificationContext.Provider value={isDisplayNotification}>
      <div className={classes.wrapper}>
        {/* previous code - <div className="show-on-mobile"> */}
        <div className="display-none">
          {isDisplayNotification && (
            <div className={classes.mobileNotification}>
              <p className={classes.paper}>
                Use the desktop to access all the services of Quick Apply
              </p>
              <div className={classes.closeIconWrapper}>
                <Icon
                  name={ICONS.closeWhite}
                  className={classes.closeIcon}
                  onClick={() => setDisplayNotification(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {children}
    </MobileNotificationContext.Provider>
  );
};
