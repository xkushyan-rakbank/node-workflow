import React from "react";

import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

import { useStyles } from "./styled";

import { ReactComponent as CheckIcon } from "../../../../assets/images/icons/circle_checked_o.svg";

export const AccountTypeCardComponent = ({
  Icon,
  title,
  description,
  buttonText,
  handleSetAccountType,
  accountType
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div>
            <Icon alt={title} />
          </div>
          <span>{title}</span>
        </div>
        <div className={classes.divider}> </div>
        <div className={classes.differencesContainer}>
          <ul className={classes.differences}>
            {description.map((difference, index) => (
              <li key={index}>
                <CheckIcon alt="check icon" />
                {difference}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={classes.buttonWrapper}>
        <ContinueButton
          handleClick={() => handleSetAccountType(accountType)}
          label={buttonText}
          classes={{ buttonStyle: classes.continueButtonRoot }}
        />
      </div>
    </div>
  );
};
