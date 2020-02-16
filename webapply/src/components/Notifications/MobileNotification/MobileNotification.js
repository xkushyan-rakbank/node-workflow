import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { Icon, ICONS } from "../../Icons";
import { style } from "./styled";

const MobileNotification = ({ classes }) => {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className={classes.wrapper}>
      <div className="show-on-mobile">
        {showModal && (
          <div className={classes.mobileNotification}>
            <p className={classes.paper}>
              Use the desktop to access all the services of Quick Apply
            </p>
            <div className={classes.closeIconWrapper}>
              <Icon
                name={ICONS.closeWhite}
                className={classes.closeIcon}
                onClick={() => setShowModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(style)(MobileNotification);
