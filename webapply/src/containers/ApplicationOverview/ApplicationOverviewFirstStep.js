import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core";
import logo from "./../../assets/images/logo.png";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";

const style = {
  icon: {
    fontSize: "55px",
    color: "green"
  },
  stepImageBackground: {},
  stepfirstGroup: {
    paddingTop: "150px"
  },
  stepSectionIndent: {
    marginBottom: "40px"
  },
  stepSecondGroup: {
    height: "370px",
    paddingTop: "80px",
    "& span": {
      maxWidth: "380px"
    },
    background: `url(${logo}) no-repeat 60% 90%/60%`
  }
};

const ApplicationOverviewFirstStep = ({ classes }) => (
  <>
    <div className={classes.stepfirstGroup}>
      <div className={classes.stepSectionIndent}>
        <SectionTitleWithInfo title="Two easy steps" />
      </div>
      <IconCardsContainer>
        <IconCardItem
          minWidth="260px"
          title="First"
          text="You fill a couple of questions"
        >
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem
          minWidth="260px"
          title="Then"
          text="We call you to sign the account"
        >
          <DoneIcon className={classes.icon} />
        </IconCardItem>
      </IconCardsContainer>
    </div>
    <div className={classes.stepSecondGroup}>
      <SectionTitleWithInfo
        title="Grab a cup of tea"
        info="We need to spend some time getting to know you and your company"
      />
    </div>
  </>
);

export default withStyles(style)(ApplicationOverviewFirstStep);
