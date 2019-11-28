import React from "react";
import cx from "classnames";
import { Link } from "@material-ui/core";
import { ContainedButton } from "../../../../../components/Buttons/ContainedButton";
import check from "../../../../../assets/icons/check_outline_ic.png";
import { getIconsByAccount } from "../../../../../constants/icons";
import { useStyles } from "./styled";

export const ExpandedDetailedOptionsCard = ({
  optionList,
  isIncluded,
  cost,
  value,
  href,
  accountType,
  className,
  buttonLabel,
  selectService,
  handleClick,
  disabled,
  id
}) => {
  const classes = useStyles();
  const { plus, max } = getIconsByAccount();

  const renderTitle = () =>
    accountType === "RAKstarter" && value === "RAKvalue PLUS"
      ? "Included in RAKstarter"
      : "Available upgrade";

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.title}>
        <div className={classes.icon}>
          {value === "RAKvalue PLUS" ? (
            <img width={80} height={80} src={plus} alt="rak-plus" />
          ) : (
            <img width={80} height={80} src={max} alt="rak-max" />
          )}
        </div>
        <div className={classes.name}>{value}</div>
      </div>
      {optionList && (
        <ul className={classes.options}>
          {optionList.map(option => (
            <li key={option.text}>
              <img className={classes.listIcon} src={check} alt="check" height={16} width={16} />
              <div
                className={cx("text", classes.indent)}
                dangerouslySetInnerHTML={{ __html: option.text }}
              />
              {option.items && (
                <ul className={classes.nestedOptions}>
                  {option.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className={classes.linkWrapper}>
        <Link href={href} className={classes.link} target="_blank">
          Read more
        </Link>
      </div>
      <div className={classes.cost}>
        {cost}
        <span>AED/ month</span>
      </div>
      <div className={classes.upgrade}>
        {selectService ? (
          <ContainedButton
            disabled={disabled}
            label={buttonLabel}
            className={classes.button}
            handleClick={() => handleClick(id)}
          />
        ) : (
          renderTitle()
        )}
      </div>
    </div>
  );
};
