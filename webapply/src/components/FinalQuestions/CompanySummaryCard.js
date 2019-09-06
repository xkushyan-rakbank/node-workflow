import React, { Component } from "react";
import CompanyCard from "../CompanyCard";
import ContinueButton from "../Buttons/ContinueButton";
import LinkButton from "../Buttons/LinkButton";
import CompanyBackgroundForm from "./CompanyBackgroundForm";
import CollapsedSection from "../CollapsedSection";
import CompanyAnticipatedTransactionsForm from "./CompanyAnticipatedTransactionsForm";
import CompanyNetworkForm from "./CompanyNetworkForm";
import CompanyContactInformationForm from "./CompanyContactInformationForm";
import validateForm from "../../utils/validate";

class CompanySummaryCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      isFilled: false,
      companyBackground: {
        isFilled: false,
        isExpanded: true
      },
      anticipatedTransactions: {
        isFilled: false,
        isExpanded: false
      },
      network: {
        isFilled: false,
        isExpanded: false
      },
      contactInformation: {
        isFilled: false,
        isExpanded: false
      }
    };

    this.sectionsConfig = [
      {
        title: "Company background",
        key: "companyBackground",
        component: CompanyBackgroundForm
      },
      {
        title: "Anticipated transactions",
        key: "anticipatedTransactions",
        component: CompanyAnticipatedTransactionsForm
      },
      {
        title: "Company network",
        key: "network",
        component: CompanyNetworkForm
      },
      {
        title: "Company contact information",
        key: "contactInformation",
        component: CompanyContactInformationForm
      }
    ];

    this.sectionsConfig.forEach((item, index) => {
      item.handler = this.handleContinue(item);
      item.sectionHeadClickHandler = this.handleSectionHeadClick(item);
      item.nextSection = this.sectionsConfig[index + 1] || null;
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
    if (this.state.isExpanded) {
      return null;
    }
    return this.state.isFilled ? (
      <LinkButton
        clickHandler={() =>
          this.setState({ isExpanded: true, isFilled: false })
        }
      />
    ) : (
      <ContinueButton
        handleClick={() => this.setState({ isExpanded: true, isFilled: true })}
      />
    );
  }

  render() {
    return (
      <CompanyCard
        companyName="Designit Arabia"
        controls={this.renderControlsContent()}
      >
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

export default CompanySummaryCard;
