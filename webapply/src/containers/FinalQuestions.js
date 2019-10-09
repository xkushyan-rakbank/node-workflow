import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
    expandedMargin: true
  };

  switchExpandedMargin = () => this.setState({ expandedMargin: false });

  render() {
    const { classes } = this.props;
    const { expandedMargin } = this.state;
    return (
      <>
        <h2>Final questions</h2>
        <p className={cx(classes.description, { [classes.smallMargin]: !expandedMargin })}>
          We’re almost there! Here we ask a bit about the background of the company and that of the
          signatories. We promise there’s no more questions after this section.
        </p>
        <div className={this.props.classes.sectionContainer}>
          <CompanySummaryCard switchExpandedMargin={this.switchExpandedMargin} />
        </div>
        <div className={this.props.classes.sectionContainer}>
          {this.props.signatories.map((item, index) => {
            return <SignatorySummaryCard key={index} signatory={item} index={index} />;
          })}
        </div>
        <div className="linkContainer">
          <BackLink path={routes.stakeholdersInfo} />
          <Link to={routes.uploadDocuments}>
            <SubmitButton
              label="Next Step"
              justify="flex-end"
              classes={{ buttonWrap: classes.buttonWrap }}
            />
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
