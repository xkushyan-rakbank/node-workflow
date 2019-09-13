import React from "react";
import { withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";
import CommonQuestions from "./CommonQuestions";

const style = {
  stepWrapper: {
    paddingTop: "150px",
  },
  icon: {
    fontSize: "55px",
    color: "green",
  },
  stepAnswers: {
    borderRadius: "8px",
    overflow: "hidden",
  },
  stepAnswersTitle: {
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "rgba(239, 242, 244, .5)",
  },
  stepCardsWrapper: {
    padding: "20px 0 50px 0",
  }
};

const PreliminaryInformation = ({ classes }) => (
  <div className={classes.stepWrapper}>
    <SectionTitleWithInfo
      title="Have these ready"
      info="Before we start, make sure you have these documents at hand"
    />
    <div className={classes.stepCardsWrapper}>
      <IconCardsContainer>
        <IconCardItem minWidth="100px" text="Company Trade License">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem minWidth="100px" text="Passport for all signatories">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem minWidth="100px" text="Emirates ID for all signatories">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem minWidth="100px" text="MoA for all signatories*">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
      </IconCardsContainer>
    </div>

    <div className={classes.stepAnswers}>
      <div className={classes.stepAnswersTitle}>
        Got more questions? We got some answers
      </div>
      <CommonQuestions />
    </div>
  </div>
);

export default withStyles(style)(PreliminaryInformation);
