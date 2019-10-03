import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import CompanyCard from "../CompanyCard";
import ContinueButton from "../Buttons/ContinueButton";
import LinkButton from "../Buttons/LinkButton";
import CompanyBackgroundForm from "./CompanyBackgroundForm";
import CollapsedSection from "../CollapsedSection";
import CompanyAnticipatedTransactionsForm from "./CompanyAnticipatedTransactionsForm";
import CompanyNetworkForm from "./CompanyNetworkForm";
import CompanyMailingAddressForm from "./CompanyMailingAddressForm";
import CompanyContactInformationForm from "./CompanyContactInformationForm";
import validateForm from "../../utils/validate";
import { getInputValueById } from "../../store/selectors/input";

const style = {
  buttonStyle: {
    position: "absolute",
    left: 0,
    top: "-105px",
    width: "auto",
    padding: "10px 33px"
  }
};

class CompanySummaryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      isFilled: false
    };

    this.sectionsConfig = [
      {
        title: "Business relationships",
        key: "companyBackground",
        component: CompanyBackgroundForm
      },
      {
        title: "Branches and subsidiaries",
        key: "network",
        component: CompanyNetworkForm
      },
      {
        title: "Anticipated transactions",
        key: "anticipatedTransactions",
        component: CompanyAnticipatedTransactionsForm
      },
      {
        title: "Preferred mailing address",
        key: "mailingAddress",
        component: CompanyMailingAddressForm
      },
      {
        title: "Preferred contact information",
        key: "contactInformation",
        component: CompanyContactInformationForm
      }
    ];

    this.sectionsConfig.forEach((item, index) => {
      item.handler = this.handleContinue(item);
      item.sectionHeadClickHandler = this.handleSectionHeadClick(item);
      item.nextSection = this.sectionsConfig[index + 1] || null;

      this.state[item.key] = {
        isFilled: false,
        isExpanded: index === 0
      };
    });
  }

  handleContinue = section => event => {
    const errorList = validateForm(event);

    if (errorList.length > 0) {
      return errorList;
    }

    this.updateSectionsSate(section);
  };

  updateSectionsSate({ nextSection, key }) {
    if (nextSection) {
      this.setState({
        [key]: {
          isExpanded: false,
          isFilled: true
        },
        [nextSection.key]: {
          isExpanded: true,
          isFilled: false
        }
      });
    } else {
      this.setState({
        [key]: {
          isExpanded: false,
          isFilled: true
        },
        isExpanded: false,
        isFilled: true
      });
    }
  }

  handleSectionHeadClick = section => () => {
    this.setState({
      ...this.sectionsConfig
        .map(({ key }) => key)
        .reduce((acc, key) => {
          acc[key] = {
            isFilled: this.state[key].isFilled,
            isExpanded: false
          };
          return acc;
        }, {}),
      [section.key]: {
        isFilled: this.state[section.key].isFilled,
        isExpanded: !this.state[section.key].isExpanded
      }
    });
  };

  renderControlsContent() {
    const { classes } = this.props;
    if (this.state.isExpanded) {
      return null;
    }
    return this.state.isFilled ? (
      <LinkButton clickHandler={() => this.setState({ isExpanded: true, isFilled: false })} />
    ) : (
      <ContinueButton
        label="Start here"
        classes={{ buttonStyle: classes.buttonStyle }}
        handleClick={() => this.setState({ isExpanded: true, isFilled: true })}
      />
    );
  }

  render() {
    return (
      <CompanyCard companyName={this.props.companyName} controls={this.renderControlsContent()}>
        {this.state.isExpanded &&
          this.sectionsConfig.map(item => {
            const Component = item.component;
            return (
              <CollapsedSection
                key={item.key}
                onClick={item.sectionHeadClickHandler}
                title={item.title}
                expanded={this.state[item.key].isExpanded}
                filled={this.state[[item.key]].isFilled}
              >
                {Component && <Component handleContinue={item.handler} />}
              </CollapsedSection>
            );
          })}
      </CompanyCard>
    );
  }
}

const mapStateToProps = state => ({
  // TODO: remove default value "Designit Arabia"
  companyName: getInputValueById(state, "Org.companyName") || "Designit Arabia"
});

export default withStyles(style)(connect(mapStateToProps)(CompanySummaryCard));
