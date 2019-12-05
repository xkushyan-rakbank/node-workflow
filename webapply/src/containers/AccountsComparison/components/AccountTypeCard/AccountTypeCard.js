import React from "react";
import check_ic from "../../../../assets/images/check.png";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";

export const AccountTypeCardComponent = ({
  iconSrc,
  title,
  description,
  buttonText,
  handleClick,
  handleClickMobile,
  scrollToIndex,
  accountType
}) => {
  const classes = useStyles();

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
          handleClick={() => handleClick({ scrollToIndex, accountType })}
          name={scrollToIndex}
          label={buttonText}
          classes={{ buttonStyle: classes.continueButtonRoot }}
        />
        <div className="show-on-mobile">
          <ContinueButton
            handleClick={handleClickMobile}
            name={scrollToIndex}
            label={buttonText}
            classes={{ buttonStyle: classes.continueButtonRoot }}
          />
        </div>
      </div>
    </div>
  );
};
