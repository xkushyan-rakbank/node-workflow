import React from "react";
import { withStyles } from "@material-ui/core";
import logo from "./../../assets/images/logo.png";
import interrogation from "../../assets/icons/interrogation.svg";
import signature from "../../assets/icons/signature.svg";
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
    "& span": {
      maxWidth: "380px"
    },
    background: `url(${logo}) no-repeat 60% 90%/60%`
  }
};

const TwoSteps = ({ classes }) => (
  <>
    <div className={classes.firstGroup}>
      <div className={classes.indent}>
        <SectionTitleWithInfo title="Two easy steps" />
      </div>
      <div className={classes.indent}>
        <IconCardsContainer>
          <IconCardItem
            minWidth="260px"
            title="First"
            text="You fill a couple of questions"
          >
            <img src={interrogation} alt="interrogation" />
          </IconCardItem>
          <IconCardItem
            minWidth="260px"
            title="Then"
            text="We call you to sign the account"
          >
            <img src={signature} alt="signature" />
          </IconCardItem>
        </IconCardsContainer>
      </div>
    </div>
    <div className={classes.secondGroup}>
      <SectionTitleWithInfo
        title="Grab a cup of tea"
        info="We need to spend some time getting to know you and your company"
      />
    </div>
  </>
);

export default withStyles(style)(TwoSteps);
