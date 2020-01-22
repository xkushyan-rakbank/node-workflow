import React from "react";

import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import HorizontalIconCardsContainer from "../../../components/HorizontalIconCards/HorizontalIconCardsContainer";
import HorizontalIconCardItem from "../../../components/HorizontalIconCards/HorizontalIconCardItem";
import { useIconsByAccount } from "../../../utils/useIconsByAccount";
import { InfoNote } from "../../../components/InfoNote";
import { accountNames } from "../../../constants";
import { accountTypesInfo, accountText } from "./constants";

import { useStyles } from "./styled";

export const AccountBenefitsComponent = ({ accountType }) => {
  const classes = useStyles();

  const icons = useIconsByAccount();
  const data = accountType ? accountTypesInfo[accountType] : [];
  const isShowInfoNote = accountType === accountNames.starter;

  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title={accountText[accountType] || ""} />
      </div>
      <HorizontalIconCardsContainer>
        {data
          .map(({ iconName, ...item }) => ({ Icon: icons[iconName], ...item }))
          .map(({ key, text, iconName, Icon }) => (
            <HorizontalIconCardItem key={key} text={text}>
              <Icon className={classes.icon} alt={iconName} />
            </HorizontalIconCardItem>
          ))}
        {isShowInfoNote && (
          <div className={classes.styleInfoNotes}>
            <InfoNote text="*Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>
        )}
      </HorizontalIconCardsContainer>
    </>
  );
};
