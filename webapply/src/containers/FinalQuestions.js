import React from "react";
import { withStyles } from "@material-ui/core/styles";
import SectionTitle from "../components/SectionTitle";
import CompanySummaryCard from "../components/FinalQuestions/CompanySummaryCard";

const style = {
  sectionContainer: {
    marginBottom: "40px"
  },
  title: {
    marginTop: "20px",
    marginBottom: "40px"
  }
};

class FinalQuestions extends React.Component {
  render() {
    return (
      <>
        <h2>Final questions</h2>
        <p className="formDescription">
          This final section is required by law, to help us understand the
          background of the company and that of the stakeholders with signatory
          rights
        </p>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle
            title="Final questions about the company"
            className={this.props.classes.title}
          />
          <CompanySummaryCard />
        </div>
        <div className={this.props.classes.sectionContainer}>
          <SectionTitle
            title="Final questions about signatories"
            className={this.props.classes.title}
          />
        </div>
      </>
    );
  }
}

export default withStyles(style)(FinalQuestions);
