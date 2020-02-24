import React from "react";
import Typography from "@material-ui/core/Typography";

import { ContainedButton } from "../../Buttons/ContainedButton";
import { MobileNotification } from "../../Modals";
import { useStyles } from "../styled";

export const AccountInfoScreen = ({
  resetApplicantInfo,
  isShowApply,
  isShowCheck,
  isShowStart,
  handleCheckStatus,
  handleStart,
  handleApply,
  title,
  subtitle
}) => {
  const classes = useStyles();

  return (
    <div className={classes.contentContainer}>
      <Typography variant="h2" component="h2" classes={{ root: classes.sectionTitle }}>
        {title}
      </Typography>
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
      {isShowCheck && (
        <ContainedButton
          withRightArrow
          justify="flex-start"
          label="Check status"
          handleClick={handleCheckStatus}
        />
      )}
      {isShowStart && (
        <>
          <div className="hide-on-mobile">
            <ContainedButton
              withRightArrow
              justify="flex-start"
              label="Start application"
              handleClick={handleStart}
            />
          </div>
          <div className="show-on-mobile">
            <MobileNotification />
          </div>
        </>
      )}
    </div>
  );
};