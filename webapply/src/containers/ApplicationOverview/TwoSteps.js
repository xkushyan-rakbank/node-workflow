import React from "react";
import { withStyles } from "@material-ui/core";
import overviewRegular from "../../assets/gif/overview_reg.gif";
import overviewIslamic from "../../assets/gif/overview_islamic.gif";
import overviewElite from "../../assets/gif/overview_elite.gif";
import interrogation from "../../assets/icons/interrogation.png";
import signature from "../../assets/icons/signature.png";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";

const style = {
  icon: {
    fontSize: "55px",
    color: "green"
  },
  firstGroup: {
    width: "100%"
  },
  indent: {
    marginBottom: "30px"
  },
  secondGroup: {
    height: "300px",
    width: "100%",
    display: "flex",
    "& span": {
      maxWidth: "380px"
    }
  },
  title: {
    color: "#373737",
    fontSize: 20,
    margin: 0,
    fontWeight: "600"
  },
  info: {
    color: "#373737",
    fontSize: 18
  },
  overview: {
    "@media only screen and (max-width: 1300px)": {
      display: "none"
    }
  }
};

const TwoSteps = ({ classes, accountType, islamicBanking }) => {
  const getGifUrl = () => {
    if (accountType === "RAKelite") {
      return overviewElite;
    } else if (islamicBanking) {
      return overviewIslamic;
    }
    return overviewRegular;
  };

  return (
    <>
      <div className={classes.firstGroup}>
        <div className={classes.indent}>
          <SectionTitleWithInfo title="Two easy steps" />
        </div>
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
