import React from "react";
import { withStyles } from "@material-ui/core";
import { getIconsByAccount } from "../../constants/icons";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import IconCardsContainer from "../../components/IconCards/IconCardsContainer";
import IconCardItem from "../../components/IconCards/IconCardItem";
import CommonQuestions from "./CommonQuestions";
import { mobileResolution } from "../../constants";

const mockData = [
  {
    question: "Can I come back later and complete the application?",
    answer:
      "Lorem ipsum is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    id: 1
  },
  {
    question: "How long will it take to get the account?",
    answer:
      "Lorem ipsum is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    id: 2
  },
  {
    question: "What if I need help with some fields?",
    answer:
      "Lorem ipsum is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
    id: 3
  },
  {
    question: "How do I check the status on my submitted application?",
    answer:
      "Lorem ipsum is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here, making it look like readable English.",
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
      <SectionTitleWithInfo
        title="Have these ready"
        info="Before we start, make sure you have these documents at hand"
      />
      <div className={classes.cardsWrapper}>
        <IconCardsContainer classes={{ iconsWrapper: classes.iconsWrapper }}>
          <IconCardItem minWidth="100px" text="Trade License">
            <img src={license} alt="trade-license" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Passport/visa of all signatories¹">
            <img src={passport} alt="passport-visa" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Emirates ID of all signatories">
            <img src={emiratesId} alt="emirates-id" />
          </IconCardItem>
          <IconCardItem minWidth="100px" text="Other company documents²">
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
        <div className={classes.title}>Got more questions? We got some answers</div>
        <CommonQuestions data={mockData} />
      </div>
    </>
  );
};

export default withStyles(style)(PreliminaryInformation);
