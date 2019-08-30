import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CompanyStakeholderCard from "../CompanyStakeholderCard";
import ContinueButton from "../Buttons/ContinueButton";
import CollapsedSection from "../CollapsedSection";
import SignatoryPersonalInformationForm from "./SignatoryPersonalInformationForm";
import SignatoryEmploymentDetailsForm from "./SignatoryEmploymentDetailsForm";
import SignatoryWealthForm from "./SignatoryWealthForm";
import SignatoryContactInformationForm from "./SignatoryContactInformationForm";
import LinkButton from "../Buttons/LinkButton";

const style = {
  card: {
    marginBottom: "24px"
  },
  contentBox: {
    display: "flex",
    flexGrow: "1",
    paddingLeft: "25px"
  },
  infoBox: {
    flexGrow: "1"
  },
  name: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.33",
    color: "#373737"
  },
  signatoryField: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#517085"
  },
  shareholdingField: {
    opacity: 0.5,
    fontSize: "12px",
    lineHeight: 1.33,
    color: "#263d4c"
  },
  controlsBox: {
    display: "flex",
    alignItems: "center"
  }
};

class SignatorySummaryCard extends Component {
  static defaultProps = {
    signatory: {},
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
      isFilled: true,
      isDisabled: true,
      personalInformation: {
        isExpanded: true,
        isFilled: false
      },
      employmentDetails: {
        isExpanded: false,
        isFilled: false
      },
      wealth: {
        isExpanded: false,
        isFilled: false
      },
      contactInformation: {
        isExpanded: false,
        isFilled: false
      }
    };

    this.sectionsConfig = [
      {
        title: "Personal Information",
        key: "personalInformation",
        component: SignatoryPersonalInformationForm
      },
      {
        title: "Employment details",
        key: "employmentDetails",
        component: SignatoryEmploymentDetailsForm
      },
      {
        title: "Wealth",
        key: "wealth",
        component: SignatoryWealthForm
      },
      {
        title: "Preferred contact information",
        key: "contactInformation",
        component: SignatoryContactInformationForm
      }
    ];

    this.sectionsConfig.forEach(item => {
      item.handler = this.handleContinue(item);
      item.sectionHeadClickHandler = this.handleSectionHeadClick(item);
    });
  }

  handleContinue = section => () => {
    const nextSection = this.sectionsConfig[
      this.sectionsConfig.indexOf(section) + 1
    ];

    if (nextSection) {
      this.setState({
        [section.key]: {
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
        [section.key]: {
          isExpanded: false,
          isFilled: true
        },
        isExpanded: false
      });
    }
  };

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

  renderControls() {
    if (this.state.isExpanded) {
      return null;
    }

    return this.state.isFilled ? (
      <LinkButton
        clickHandler={() =>
          this.setState({
            isExpanded: true,
            isFilled: false,
            isDisabled: false
          })
        }
      />
    ) : (
      <ContinueButton
        handleClick={() =>
          this.setState({ isExpanded: true, isFilled: true, isDisabled: true })
        }
        disabled={this.state.isDisabled}
      />
    );
  }

  renderCardContent() {
    return (
      <div className={this.props.classes.contentBox}>
        <div className={this.props.classes.infoBox}>
          <div className={this.props.classes.name}>
            {this.props.signatory.firstName} {this.props.signatory.lastName}
          </div>
          <div className={this.props.classes.signatoryField}>
            {this.props.signatory.signatoryRights}
          </div>
          <div className={this.props.classes.shareholdingField}>
            {this.props.signatory.shareholding > 0
              ? `Shareholding ${this.props.signatory.shareholding}%`
              : "No shareholding"}
          </div>
        </div>
        <div className={this.props.classes.controlsBox}>
          {this.renderControls()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <CompanyStakeholderCard
        className={this.props.classes.card}
        firstName={this.props.signatory.firstName}
        lastName={this.props.signatory.lastName}
        content={this.renderCardContent()}
      >
        {this.state.isExpanded &&
          this.sectionsConfig.map((item, index) => {
            const Component = item.component;
            return (
              <CollapsedSection
                key={item.key}
                onClick={item.sectionHeadClickHandler}
                title={item.title}
                expanded={this.state[item.key].isExpanded}
                filled={this.state[[item.key]].isFilled}
              >
                {Component && (
                  <Component
                    handleContinue={item.handler}
                    index={this.props.index}
                  />
                )}
              </CollapsedSection>
            );
          })}
      </CompanyStakeholderCard>
    );
  }
}

export default withStyles(style)(SignatorySummaryCard);
