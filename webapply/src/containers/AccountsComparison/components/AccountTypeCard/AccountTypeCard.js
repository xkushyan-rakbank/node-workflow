import React, { useContext } from "react";

import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { VerticalPaginationContext } from "../../../../components/VerticalPagination";

import { useStyles } from "./styled";

import { ReactComponent as CheckIcon } from "../../../../assets/images/icons/circle_checked_o.svg";

export const AccountTypeCardComponent = ({
  Icon,
  title,
  description,
  buttonText,
  setAccountType,
  handleClickMobile,
  accountType
}) => {
  const classes = useStyles();
  const { scrollToSection } = useContext(VerticalPaginationContext);

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
          handleClick={() => {
            setAccountType(accountType);
            scrollToSection(2);
          }}
          label={buttonText}
          classes={{ buttonStyle: classes.continueButtonRoot }}
          className="hide-on-mobile"
        />
        <div className="show-on-mobile">
          <ContinueButton
            handleClick={() => handleClickMobile(accountType)}
            label={buttonText}
            classes={{ buttonStyle: classes.continueButtonRoot }}
          />
        </div>
      </div>
    </div>
  );
};
