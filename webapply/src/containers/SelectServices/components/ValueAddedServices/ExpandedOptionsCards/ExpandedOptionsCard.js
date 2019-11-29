import React from "react";
import { withStyles } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { ContainedButton } from "../../../../../components/Buttons/ContainedButton";
import { useStyles, ContainedButtonStyles } from "./styled";

const StyledContainedButton = withStyles(ContainedButtonStyles)(ContainedButton);

export const ExpandedOptionsCard = ({ optionList, isIncluded, cost, value, href }) => {
  const classes = useStyles();
  return (
    <div className={classes.cardRoot}>
      <div className={classes.cardTitle}>
        <div className={classes.cardName}>
          RAKvalue
          <span className={classes.value}>{value}</span>
        </div>
        <div className={classes.cardCost}>
          {cost}
          <span>AED/ month</span>
        </div>
      </div>
      {optionList && (
        <ul className={classes.cardOptions}>
          {optionList.map(option => (
            <li key={option.text}>{option.text}</li>
          ))}
        </ul>
      )}
      <div className={classes.cardLinkWrapper}>
        <Link href={href} className={classes.cardLink}>
          Read more
        </Link>
      </div>
      <div>
        {isIncluded ? (
          <div className={classes.included}>Included with your RAKstarter</div>
        ) : (
          <div className={classes.applyButton}>
            <StyledContainedButton
              label="Apply with MAX"
              handleClick={() => console.log("not implemented yet")}
            />
          </div>
        )}
      </div>
      <div className={classes.closeButton} onClick={() => console.log("not implemented yet")} />
    </div>
  );
};
