import React from "react";
import { withStyles } from "@material-ui/core";
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
    borderRadius: "8px",
    overflow: "hidden"
  },
  stepAnswersTitle: {
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "rgba(239, 242, 244, .5)"
  },
  stepCardsWrapper: {
    padding: "20px 0 50px 0"
  }
};

const CustomerService = ({ classes }) => (
  <div className={classes.stepWrapper}>
    <SectionTitleWithInfo
      title="Customer service. On your terms."
      info="Get access to our world-class RAKBANK service, at your door or on the go"
    />
    <div className={classes.stepCardsWrapper}>
      <IconCardsContainer>
        <IconCardItem minWidth="100px" text="Dedicated relationship manager">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem minWidth="100px" text="24/7 customer service">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
        <IconCardItem minWidth="100px" text="Physical and online banking">
          <DoneIcon className={classes.icon} />
        </IconCardItem>
      </IconCardsContainer>
    </div>
  </div>
);

export default withStyles(style)(CustomerService);
