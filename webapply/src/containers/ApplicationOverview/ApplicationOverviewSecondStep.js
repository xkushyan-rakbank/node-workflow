import React from "react";
import { withStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DoneIcon from "@material-ui/icons/Done";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";

const style = {
  stepWrapper: {
    paddingTop: "150px"
  },
  icon: {
    fontSize: "55px",
    color: "green"
  },
  stepAnswers: {
    borderRadius: "8px"
  },
  stepAnswersTitle: {
    padding: "18px 24px",
    backgroundColor: "rgba(239, 242, 244, .5)"
  },
  stepCardsWrapper: {
    padding: "50px 0"
  }
};

const ApplicationOverviewSecondStep = ({ classes }) => (
  <div className={classes.stepWrapper}>
    <SectionTitleWithInfo
      title="Have these ready"
      info="Before we start, make sure you have these documents at hand"
    />
    <div className={classes.stepCardsWrapper}>
      <IconCardsContainer>
        <IconCardItem text="Company Trade Lisence">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem text="Passport for all signatories">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem text="Emirates ID for all signatories">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem text="MoA for all signatories*">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
      </IconCardsContainer>
    </div>

    <div className={classes.stepAnswers}>
      <div className={classes.stepAnswersTitle}>
        Got more questions? We got some answers
      </div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            Can I come back later and complete the application?
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>Some information</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            How long will it take to get the account?
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>Some information</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            What if I need help with some fields?
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>Some information</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className={classes.heading}>
            How do I check the status on my submitted application?
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>Some information</div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  </div>
);

export default withStyles(style)(ApplicationOverviewSecondStep);
