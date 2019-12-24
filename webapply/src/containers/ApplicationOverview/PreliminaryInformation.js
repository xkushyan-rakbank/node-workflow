import React from "react";
import { withStyles } from "@material-ui/core";
import { getIconsByAccount } from "../../constants/icons";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";
import CommonQuestions from "./CommonQuestions";
import { mobileResolution } from "../../constants";
import HeaderTitle from "../../components/HeaderTitle";

const questions = [
  {
    question: "Once I start the application, can I come back later and complete it.",
    answer:
      "Yes. You can continue your application from where you left using the link sent to your email id.",
    id: 1
  },
  {
    question: "Will my Account be opened once I submit the application",
    answer:
      "You will get your account number on successful submission of application. This account will be activated once the bank approves the same.",
    id: 2
  },
  {
    question: "What if I need help while filling the application",
    answer: "You can use web chat option to get help from our experts who are available 24 x 7.",
    id: 3
  },
  {
    question: "How do I check the status of my submitted application",
    answer:
      "You can check the status of your application by accessing the link sent to your email Id.",
    id: 4
  }
];

const style = {
  answers: {
    borderRadius: "8px",
    overflow: "auto",
    "@media only screen and (max-width: 991px)": {
      overflow: "inherit"
    }
  },
  title: {
    minWidth: "500px",
    padding: "18px 24px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "rgba(239, 242, 244, .5)",
    [`@media only screen and (max-width: ${mobileResolution}px)`]: {
      minWidth: "auto",
      padding: "20px 16px",
      borderRadius: "8px 8px 0 0"
    }
  },
  note: {
    marginBottom: "60px",
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    "@media only screen and (max-height: 800px)": {
      marginBottom: "15px"
    }
  },
  cardsWrapper: {
    padding: "30px 0 10px 0"
  },
  iconsWrapper: {
    flexWrap: "nowrap",
    margin: "0 -10px",
    "@media only screen and (max-width: 991px)": {
      flexWrap: "wrap"
    }
  }
};

const PreliminaryInformation = ({ classes }) => {
  const { license, passport, emiratesId, companyDocuments } = getIconsByAccount();

  return (
    <>
      <HeaderTitle withMargin />
      <SectionTitleWithInfo
        title="Have these ready"
        info="Before we start, make sure you have these documents at hand"
      />
      <div className={classes.cardsWrapper}>
        <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
          <IconCardItem minWidth="100px" text="Trade License">
            <img src={license} alt="trade-license" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Passport of all signatories¹">
            <img src={passport} alt="passport-visa" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Emirates ID of all signatories">
            <img src={emiratesId} alt="emirates-id" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Company MoA*²">
            <img src={companyDocuments} alt="company-documents" />
          </IconCardItem>
        </IconCardsContainer>
      </div>
      <div className={classes.note}>
        1. Not applicable to UAE nationals. 2. Memorandum of Association, Articles of Association,
        Share Certificate, Partners Agreement or Service Agreement, whichever is applicable to your
        company.
      </div>
      <div className={classes.answers}>
        <div className={classes.title}>Have more questions? Here are some answers </div>
        <CommonQuestions data={questions} />
      </div>
    </>
  );
};

export default withStyles(style)(PreliminaryInformation);
