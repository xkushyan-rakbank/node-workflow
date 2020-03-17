import React, { useContext, useCallback } from "react";
import check_ic from "../../../../assets/images/icons/circle_checked_o.svg";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { VerticalPaginationContext } from "../../../../components/VerticalPagination";

export const AccountTypeCardComponent = ({
  iconSrc,
  title,
  description,
  buttonText,
  setAccountType,
  handleClickMobile,
  accountType
}) => {
  const classes = useStyles();
  const { scrollToSection } = useContext(VerticalPaginationContext);
  const handleContinueButtonClick = useCallback(() => {
    setAccountType(accountType);
    handleClickMobile();
  }, [handleClickMobile, setAccountType, accountType]);

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.header}>
          <div>
            <img src={iconSrc} alt={title} />
          </div>
          <span>{title}</span>
        </div>
        <div className={classes.divider}> </div>
        <div className={classes.differencesContainer}>
          <ul className={classes.differences}>
            {description.map((difference, index) => (
              <li key={index}>
                <img src={check_ic} alt="check icon" />
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
            handleClick={handleContinueButtonClick}
            label={buttonText}
            classes={{ buttonStyle: classes.continueButtonRoot }}
          />
        </div>
      </div>
    </div>
  );
};
