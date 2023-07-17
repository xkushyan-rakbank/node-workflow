import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import routes, { smeBaseName } from "../../../../routes";
import { MobileNotificationContext } from "../../../../components/Notifications/MobileNotification/MobileNotification";
import { ExpandMoreButton } from "./ExpandMoreButton";
import { sendGoogleAnalyticsMetrics } from "../../../../store/actions/googleAnalytics";
import { GA_EVENTS } from "../../../../utils/ga";

import { useStyles } from "./styled";

export const LandingVideoPlayer = ({ video: { mp4, webm, poster }, ...rest }) => {
  const dispatch = useDispatch();
  const isMobileNotificationActive = useContext(MobileNotificationContext);
  const classes = useStyles({ isMobileNotificationActive, ...rest });

  const queryParams = useLocation().search;

  const redirectInToFinance = url => {
    dispatch(sendGoogleAnalyticsMetrics(GA_EVENTS.LANDING_PAGE_FINANCE_CHOSEN));
    if (queryParams) {
      window.location.href = url + queryParams;
    } else {
      window.location.href = url;
    }
  };
  return createPortal(
    <div className={classes.container}>
      <video
        muted
        id="video-background"
        className={classes.video}
        key={mp4}
        poster={poster}
        playsInline
        autoPlay
        loop
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>

      <div className={classes.buttonContainer}>
        <p className={classes.labelStyle}>What are you looking for?</p>
        <div className={classes.btnWrapper}>
          <Link
            onClick={() =>
              dispatch(sendGoogleAnalyticsMetrics(GA_EVENTS.LANDING_PAGE_ACCOUNT_CHOSEN))
            }
            to={queryParams ? routes.quickapplyLanding + queryParams : routes.quickapplyLanding}
          >
            <ExpandMoreButton label="Business Account" className={classes.accountBtn} />
          </Link>
          <div onClick={() => redirectInToFinance(smeBaseName + "/finances")}>
            <ExpandMoreButton
              label="Business Finance"
              className={classes.accountBtn}
              style={{ backgroundColor: "#252525" }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("root")
  );
};
