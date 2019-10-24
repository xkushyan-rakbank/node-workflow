import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import SubmitButton from "../components/Buttons/SubmitButton";
import CompanySummaryCard from "../components/FinalQuestions/CompanySummaryCard";
import SignatorySummaryCard from "../components/FinalQuestions/SignatorySummaryCard";
import routes from "../routes";
import { getSignatories } from "../store/selectors/appConfig";
import BackLink from "../components/Buttons/BackLink";
import cx from "classnames";

const style = {
  sectionContainer: {
    marginBottom: "20px"
  },
  description: {
    fontSize: "20px",
    color: "#373737",
    margin: "20px 0 130px",
    lineHeight: 1.5
  },
  smallMargin: {
    margin: "20px 0 40px"
  },
  buttonWrap: {
    marginTop: "0"
  }
};

class FinalQuestions extends React.Component {
  static defaultProps = {
    signatories: []
  };

  state = {
    expandedMargin: true,
    filledSignatoriesIndexes: [],
    isSubmitDisabled: true
  };

  goToUploadDocument = () => this.props.history.push(routes.uploadDocuments);

  addFilledSignatoryIndex = index =>
    this.setState({ filledSignatoriesIndexes: [...this.state.filledSignatoriesIndexes, index] });

  switchStateBooleanField = field => this.setState({ [field]: !this.state[field] });

  render() {
    const { classes, signatories } = this.props;
    const { expandedMargin, filledSignatoriesIndexes, isSubmitDisabled } = this.state;
    return (
      <>
        <h2>Final questions</h2>
        <p className={cx(classes.description, { [classes.smallMargin]: !expandedMargin })}>
          We’re almost there! Here we ask a bit about the background of the company and that of the
          signatories. We promise there’s no more questions after this section.
        </p>
        <div className={this.props.classes.sectionContainer}>
          <CompanySummaryCard
            switchExpandedMargin={() => this.switchStateBooleanField("expandedMargin")}
            addFilledSignatoryIndex={this.addFilledSignatoryIndex}
          />
        </div>
        <div className={this.props.classes.sectionContainer}>
          {signatories.map((item, index) => {
            return (
              <SignatorySummaryCard
                key={index}
                signatory={item}
                index={index}
                switchSubmitDisabled={() => this.switchStateBooleanField("isSubmitDisabled")}
                signatoriesLength={signatories.length}
                addFilledSignatoryIndex={this.addFilledSignatoryIndex}
                filledSignatoriesIndexes={filledSignatoriesIndexes}
              />
            );
          })}
        </div>
        <div className="linkContainer">
          <BackLink path={routes.stakeholdersInfo} />
          <SubmitButton
            handleClick={this.goToUploadDocument}
            label="Next Step"
            justify="flex-end"
            classes={{ buttonWrap: classes.buttonWrap }}
            disabled={isSubmitDisabled}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  signatories: getSignatories(state)
});

export default withStyles(style)(connect(mapStateToProps)(FinalQuestions));
