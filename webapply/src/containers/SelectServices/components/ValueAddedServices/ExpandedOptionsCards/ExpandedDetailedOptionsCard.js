import React from "react";
import cx from "classnames";
import { Link } from "@material-ui/core";
import { useSelector } from "react-redux";

import { accountNames } from "../../../../../constants";
import { useIconsByAccount } from "../../../../../utils/useIconsByAccount";

import { ICONS, Icon } from "../../../../../components/Icons/Icon";
import { ContainedButton } from "../../../../../components/Buttons/ContainedButton";
import { getAccountType, getIsIslamicBanking } from "../../../../../store/selectors/appConfig";

import { useStyles } from "./styled";

export const rakValuePackagePlusName = "RAKvalue SME PLUS";

const getUrlReadMore = (urls, islamicBanking, value) => {
  const {
    rakValuePlusIslamicReadMoreUrl,
    rakValueMaxIslamicReadMoreUrl,
    rakValuePlusReadMoreUrl,
    rakValueMaxReadMoreUrl
  } = urls;

  const isValueTypeHavePlusUrl = value.includes("PLUS");

  if (islamicBanking) {
    return isValueTypeHavePlusUrl ? rakValuePlusIslamicReadMoreUrl : rakValueMaxIslamicReadMoreUrl;
  }
  return isValueTypeHavePlusUrl ? rakValuePlusReadMoreUrl : rakValueMaxReadMoreUrl;
};

export const ExpandedDetailedOptionsCard = ({
  optionList,
  cost,
  value,
  className,
  buttonLabel,
  selectService,
  handleClick,
  disabled,
  id,
  readMoreUrls
}) => {
  const accountType = useSelector(getAccountType);
  const islamicBanking = useSelector(getIsIslamicBanking);

  const classes = useStyles();
  const { plus: Plus, max: Max } = useIconsByAccount();
  const href = getUrlReadMore(readMoreUrls, accountType, value);

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.title}>
        <div className={classes.icon}>
          {value === rakValuePackagePlusName ? (
            <Plus width={80} height={80} alt="rak-plus" />
          ) : (
            <Max width={80} height={80} alt="rak-max" />
          )}
        </div>
        <div className={classes.name}>{value}</div>
      </div>
      {optionList && (
        <ul className={classes.options}>
          {optionList.map(option => (
            <li key={option.text}>
              <Icon className={classes.listIcon} name={ICONS.checkOutline} alt="check" />
              <div
                className={cx("text", classes.indent)}
                dangerouslySetInnerHTML={{
                  __html: islamicBanking && option.textIslamic ? option.textIslamic : option.text
                }}
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
        ) : accountType === accountNames.starter && value === rakValuePackagePlusName ? (
          "Included in RAKstarter"
        ) : (
          "Upgrade available"
        )}
      </div>
    </div>
  );
};
