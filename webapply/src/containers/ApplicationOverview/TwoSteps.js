import React from "react";
import { withStyles } from "@material-ui/core";
import overviewRegular from "../../assets/gif/overview_reg.gif";
import overviewIslamic from "../../assets/gif/overview_islamic.gif";
import overviewElite from "../../assets/gif/overview_elite.gif";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";
import { getIconsByAccount } from "../../constants/icons";
import { accountsNames, mobileResolution } from "../../constants";
import HeaderTitle from "../../components/HeaderTitle";

const style = {
  icon: {
    fontSize: "55px",
    color: "green"
  },
  firstGroup: {
    width: "100%"
  },
  indent: {
    margin: "0 -10px 30px",
    paddingTop: 20
  },
  secondGroup: {
    height: "300px",
    width: "100%",
    display: "flex",
    "& span": {
      maxWidth: "380px"
    },
    "& img": {
      maxWidth: "100%"
    },
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      height: "auto",
      flexWrap: "wrap"
    }
  },
  title: {
    color: "#373737",
    fontSize: 20,
    margin: "22px 0 0 0",
    fontWeight: "600"
  },
  info: {
    color: "#373737",
    fontSize: 18
  }
};

const TwoSteps = ({ classes, accountType, islamicBanking }) => {
  let gifUrl = overviewRegular;

  if (islamicBanking && accountType !== accountsNames.elite) {
    gifUrl = overviewIslamic;
  } else if (accountType === accountsNames.elite) {
    gifUrl = overviewElite;
  }

  const { interrogation, signature } = getIconsByAccount();

  return (
    <>
      <div className={classes.firstGroup}>
        <HeaderTitle />
        <SectionTitleWithInfo title="Two easy steps" />
        <div className={classes.indent}>
          <IconCardsContainer>
            <IconCardItem minWidth="200px" title="First" text="You answer a few questions">
              <img src={interrogation} alt="interrogation" />
            </IconCardItem>
            <IconCardItem minWidth="200px" title="Then" text="We meet you to get your signature">
              <img src={signature} alt="signature" />
            </IconCardItem>
          </IconCardsContainer>
        </div>
      </div>
      <div className={classes.secondGroup}>
        <div>
          <h3 className={classes.title}>Grab a cup of tea</h3>
          <span className={classes.info}>
            We need to spend some time getting to know you and your company
          </span>
        </div>
        <img className={classes.overview} src={gifUrl} alt="overview" />
      </div>
    </>
  );
};

export default withStyles(style)(TwoSteps);
