import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import SubmitButton from "../components/Buttons/SubmitButton";
import CompanySummaryCard from "../components/FinalQuestions/CompanySummaryCard";
import SignatorySummaryCard from "../components/FinalQuestions/SignatorySummaryCard";
import { BackLink } from "../components/Buttons/BackLink";
import routes from "../routes";
import { getSignatories } from "../store/selectors/appConfig";

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
    filledSignatoriesIndexes: []
  };

  goToUploadDocument = () => this.props.history.push(routes.uploadDocuments);

  addFilledSignatoryIndex = index => {
    const { filledSignatoriesIndexes } = this.state;
    if (!filledSignatoriesIndexes.includes(index)) {
      this.setState({ filledSignatoriesIndexes: [...filledSignatoriesIndexes, index] });
    }
  };

  isSubmitDisabled = () =>
    !(this.state.filledSignatoriesIndexes.length > this.props.signatories.length);

  switchStateBooleanField = field => this.setState({ [field]: !this.state[field] });

  render() {
    const { classes, signatories } = this.props;
    const { expandedMargin, filledSignatoriesIndexes } = this.state;
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
            disabled={this.isSubmitDisabled()}
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
