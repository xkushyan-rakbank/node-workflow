import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";
import cx from "classnames";

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
    height: "400px",
    paddingTop: "80px",
    "& span": {
      maxWidth: "380px"
    }
  }
};

const ApplicationOverviewFirstStep = ({ classes }) => (
  <>
    <div className={classes.stepfirstGroup}>
      <div className={classes.stepSectionIndent}>
        <SectionTitleWithInfo title="Two easy steps" />
      </div>
      <IconCardsContainer>
        <IconCardItem title="First" text="You fill a couple of questions">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem title="Then" text="We call you to sign the account">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
      </IconCardsContainer>
    </div>
    <div className={cx(classes.stepSecondGroup)}>
      <SectionTitleWithInfo
        title="Grab a cup of tea"
        info="We need to spend some time getting to know you and your company"
      />
    </div>
  </>
);

export default withStyles(style)(ApplicationOverviewFirstStep);
