import React from "react";
import { withStyles } from "@material-ui/core";
import manager from "../../assets/icons/manager.png";
import service from "../../assets/icons/service.svg";
import banking from "../../assets/icons/banking.svg";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";

const style = {
  indent: {
    marginBottom: "50px"
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
    padding: "20px 10px 50px 10px"
  }
};

const StyledIconCardItem = withStyles({
  iconCardWrapper: {
    padding: "68px 20px"
  }
})(IconCardItem);

const CustomerService = ({ classes }) => (
  <>
    <div className={classes.indent}>
      <SectionTitleWithInfo
        title="Customer service. On your terms."
        info="Get access to our world-class RAKBANK service, at your door or on the go"
      />
    </div>
    <div className={classes.stepCardsWrapper}>
      <IconCardsContainer>
        <StyledIconCardItem minWidth="100px" text="Dedicated relationship manager">
          <img src={manager} width={80} height={80} alt="manager" />
        </StyledIconCardItem>
        <StyledIconCardItem minWidth="100px" text="24/7 customer service">
          <img width={80} height={80} src={service} alt="service" />
        </StyledIconCardItem>
        <StyledIconCardItem minWidth="100px" text="Physical and online banking">
          <img width={80} height={80} src={banking} alt="banking" />
        </StyledIconCardItem>
      </IconCardsContainer>
    </div>
  </>
);

export default withStyles(style)(CustomerService);
