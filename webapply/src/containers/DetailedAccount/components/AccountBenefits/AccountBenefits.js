import React from "react";
import { useSelector } from "react-redux";

import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../../../components/IconCards/IconCardItem";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";
import { InfoNote } from "../../../../components/InfoNote";
import { accountNames } from "../../../../constants";
import { accountTypesInfo, accountText } from "./constants";
import { getAccountType } from "../../../../store/selectors/appConfig";

import { useStyles } from "./styled";

export const AccountBenefits = () => {
  const accountType = useSelector(getAccountType);
  const classes = useStyles();

  const icons = useIconsByAccount();
  const data = accountType ? accountTypesInfo[accountType] : [];
  const isShowInfoNote = accountType === accountNames.starter;

  return (
    <>
      <SectionTitleWithInfo title={accountText[accountType] || ""} />
      <IconCardsContainer>
        {data
          .map(({ iconName, ...item }) => ({ Icon: icons[iconName], ...item }))
          .map(({ key, text, iconName, Icon }) => (
            <IconCardItem key={key} horizontal text={text}>
              <Icon className={classes.icon} alt={iconName} />
            </IconCardItem>
          ))}
        {isShowInfoNote && (
          <div className={classes.styleInfoNotes}>
            <InfoNote text="*Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>
        )}
      </IconCardsContainer>
    </>
  );
};
