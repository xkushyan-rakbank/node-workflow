import React from "react";
import { withStyles } from "@material-ui/core";
import overviewRegular from "../../assets/gif/overview_reg.gif";
import overviewIslamic from "../../assets/gif/overview_islamic.gif";
import overviewElite from "../../assets/gif/overview_elite.gif";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
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
    width: "100%",
    marginTop: 40
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
  const getGifUrl = () => {
    if (islamicBanking) {
      return overviewIslamic;
    } else if (accountType === accountsNames.elite) {
      return overviewElite;
    }
    return overviewRegular;
  };
  const { interrogation, signature } = getIconsByAccount();

  return (
    <>
      <HeaderTitle />
      <div className={classes.firstGroup}>
        <SectionTitleWithInfo title="Two easy steps" />
        <div className={classes.indent}>
          <IconCardsContainer>
            <IconCardItem minWidth="200px" title="First" text="You fill a couple of questions">
              <img src={interrogation} alt="interrogation" />
            </IconCardItem>
            <IconCardItem minWidth="200px" title="Then" text="We call you to sign the account">
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
        <img className={classes.overview} src={getGifUrl()} alt="overview" />
      </div>
    </>
  );
};

export default withStyles(style)(TwoSteps);
