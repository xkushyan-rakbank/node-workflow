/* eslint-disable max-len */
import React from "react";
import { useStyles } from "./styled";
import { Button } from "@material-ui/core";
import cx from "classnames";
import { ReactComponent as NavigationLeft } from "../../../../assets/icons/whiteArrow.svg";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { ContainedButton } from "../../../../components/Buttons/ContainedButton";
//import { ReactComponent as CheckIcon } from "../../../../assets/images/icons/circle_checked_o.svg";
export const AccountTypeCardComponent = ({
  Icon,
  title,
  buttonText,
  applyNowButton,
  handleSetAccountType,
  accountType,
  accountTypeName,
  isSticky
}) => {
  const classes = useStyles();
  return (
    <>
      <div>
        <h2 className={cx(classes.accountTypeTitle, isSticky && classes.accountTypeTitleSticky)}>
          {buttonText}
        </h2>
        {!isSticky && <p className={classes.accountTypeDesc}>{title}</p>}
      </div>
      {applyNowButton !== "" && (
        <ContainedButton
          className={classes.stickyBtn}
          withRightArrow={!isSticky}
          label={applyNowButton}
          handleClick={() => handleSetAccountType(accountTypeName)}
        />
      )}
    </>
  );
};
