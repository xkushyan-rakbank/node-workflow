import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SectionTitle from "../components/SectionTitle";
import CompanySummaryCard from "../components/FinalQuestions/CompanySummaryCard";
import SignatorySummaryCard from "../components/FinalQuestions/SignatorySummaryCard";
import { Link } from "react-router-dom";
import routes from "../routes";
import SubmitButton from "../components/Buttons/SubmitButton";
import { getSignatories } from "../store/selectors/appConfig";

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
  static defaultProps = {
    signatories: []
  };

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
          {this.props.signatories.map((item, index) => {
            return (
              <SignatorySummaryCard
                key={index}
                signatory={item}
                index={index}
              />
            );
          })}
        </div>
        <div className="linkContainer">
          <Link to={routes.uploadDocuments}>
            <SubmitButton label="Next Step" justify="flex-end" />
          </Link>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

export default withStyles(style)(connect(mapStateToProps)(FinalQuestions));
