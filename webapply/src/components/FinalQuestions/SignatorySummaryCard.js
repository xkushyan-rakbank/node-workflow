import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CompanyStakeholderCard from "../CompanyStakeholderCard";
import ContinueButton from "../Buttons/ContinueButton";
import CollapsedSection from "./CollapsedSection";
import PersonalInformationForm from "./PersonalInformationForm";

const style = {
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
    signatory: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: true,
      personalInformation: {
        isExpanded: false,
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
        component: PersonalInformationForm
      },
      {
        title: "Employment details",
        key: "employmentDetails",
        component: null
      },
      {
        title: "Wealth",
        key: "wealth",
        component: null
      },
      {
        title: "Preferred contact information",
        key: "contactInformation",
        component: null
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
        isExpanded: false,
        isFilled: true
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

  renderCardContent() {
    return (
      <div className={this.props.classes.contentBox}>
        <div className={this.props.classes.infoBox}>
          <div className={this.props.classes.name}>
            {this.props.signatory.firstName} {this.props.signatory.lastName}
          </div>
          <div className={this.props.classes.signatoryField}>
            Power of attorney
          </div>
          <div className={this.props.classes.shareholdingField}>
            Shareholding 51%
          </div>
        </div>
        <div className={this.props.classes.controlsBox}>
          {!this.state.isExpanded && <ContinueButton disabled />}
        </div>
      </div>
    );
  }

  render() {
    return (
      <CompanyStakeholderCard
        firstName={this.props.signatory.firstName}
        lastName={this.props.signatory.lastName}
        content={this.renderCardContent()}
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
      </CompanyStakeholderCard>
    );
  }
}

export default withStyles(style)(SignatorySummaryCard);
