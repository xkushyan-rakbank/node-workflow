import React, { useMemo } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import HorizontalIconCardsContainer from "../../../components/HorizontalIconCards/HorizontalIconCardsContainer";
import HorizontalIconCardItem from "../../../components/HorizontalIconCards/HorizontalIconCardItem";
import * as appConfigSelectors from "../../../store/selectors/appConfig";
import { useIconsByAccount } from "../../../utils/useIconsByAccount/index";
import { InfoNote } from "../../../components/InfoNote/index";
import { accountsNames, mobileResolution } from "../../../constants/index";
import { accountTypesInfo } from "./constants";

const style = {
  indent: {
    marginBottom: "20px"
  },
  notification: {
    width: "100%",
    paddingTop: "20px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    top: "calc(100vh - 290px)",
    position: "absolute"
  },
  icon: {
    width: "64px",
    height: "64px",
    "@media only screen and (max-width: 1300px)": {
      width: "56px",
      height: "56px"
    }
  },
  styleInfoNotes: {
    margin: "0 auto",
    [`@media only screen and (min-width: ${mobileResolution + 1}px)`]: {
      position: "absolute",
      bottom: 65,
      left: 0,
      right: 0
    }
  }
};

const AccountBenefits = ({ classes, accountType }) => {
  const getText = accountType => {
    switch (accountType) {
      case "RAKstarter":
        return "Unmatched benefits to make banking stress-free";
      case "Current Account":
        return "Unmatched benefits for an unmatched price";
      case "RAKelite":
        return "Unmatched privileges to take your business to the next level";
      default:
        return "";
    }
  };

  const text = useMemo(() => getText(accountType), [accountType]);
  const icons = useIconsByAccount();

  const data = useMemo(() => (accountType ? accountTypesInfo[accountType] : []), [accountType]);

  const isShowInfoNote = useMemo(() => accountType === accountsNames.starter, [accountType]);

  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title={text} />
      </div>
      <HorizontalIconCardsContainer>
        {data.map(({ key, text, iconName }) => {
          const Icon = icons[iconName];
          return (
            <HorizontalIconCardItem key={key} text={text}>
              <Icon className={classes.icon} alt={iconName} />
            </HorizontalIconCardItem>
          );
        })}
        {isShowInfoNote && (
          <div className={classes.styleInfoNotes}>
            <InfoNote text="*Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>
        )}
      </HorizontalIconCardsContainer>
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default connect(mapStateToProps)(withStyles(style)(AccountBenefits));
