import React from "react";
import cx from "classnames";
import Typography from "@material-ui/core/Typography";

//import routes from "../../../routes";
import { ContainedButton } from "../../Buttons/ContainedButton";
import { MobileNotification } from "../../Modals";
import { useStyles } from "./styled";
import { accountsInfo } from "./constants";

export const AccountInfoScreen = ({
  isShowApply,
  isShowCheck,
  isShowStart,
  isApplyEditApplication,
  handleCheckStatus,
  handleStart,
  handleApply,
  title,
  subtitle,
  isHideTitleOnSmBreakpoint,
  pathname
}) => {
  const classes = useStyles({ isShowApply, isHideTitleOnSmBreakpoint });

  return (
    <div className={cx(classes.contentContainer, "small-menu-hide")}>
      <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
        {title}
      </Typography>
      {(pathname === "/business" || pathname === "") && (
        <>
          <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
            <div className={cx(classes.sectionTitleMain)}>{accountsInfo.landingPage.title}</div>{" "}
            <img
              alt=""
              className={cx(classes.sectionTitleImg)}
              src={accountsInfo.landingPage.image}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            classes={{ root: classes.sectionLandingSubtitle }}
          >
            {accountsInfo.landingPage.subtitle}
          </Typography>
        </>
      )}
      {isShowApply && (
        <>
          <Typography
            variant="subtitle1"
            component="span"
            classes={{ root: classes.sectionSubtitle }}
          >
            {subtitle}
          </Typography>
          <ContainedButton
            withRightArrow
            justify="flex-start"
            label="Apply now"
            handleClick={handleApply}
          />
        </>
      )}
      {isShowCheck && !isApplyEditApplication && (
        <ContainedButton
          withRightArrow
          justify="flex-start"
          label="Check status"
          handleClick={handleCheckStatus}
        />
      )}
      {isShowStart && (
        <div className={classes.sectionButton}>
          <div className="hide-on-mobile">
            <ContainedButton
              withRightArrow
              justify="flex-start"
              label="Start application"
              handleClick={handleStart}
            />
          </div>
          <div className="show-on-mobile">
            {/* <MobileNotification /> */}
            <ContainedButton
              withRightArrow
              justify="flex-start"
              label="Start application"
              handleClick={handleStart}
            />
          </div>
        </div>
      )}
    </div>
  );
};
