import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ReactComponent as CompanyIconSvg } from "./../../assets/images/company-icon.svg";
import ContinueButton from "../Buttons/ContinueButton";
import LinkButton from "../Buttons/LinkButton";
import CompanyBackgroundForm from "./CompanyBackgroundForm";
import CollapsedSection from "./CollapsedSection";
import AnticipatedTransactions from "./AnticipatedTransactions";
import CompanyNetwork from "./CompanyNetwork";
import ContactInformation from "./ContactInformation";

const style = {
  container: {
    borderRadius: "8px",
    boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.03)",
    border: "solid 1px #e8e8e8",
    backgroundColor: "#ffffff"
  },
  header: {
    display: "flex",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "15px",
    paddingRight: "32px"
  },
  companyIconWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    height: "40px",
    border: "solid 1px #16216a",
    borderRadius: "50%",
    backgroundColor: "#ffffff"
  },
  contentBox: {
    display: "flex",
    alignItems: "center",
    flexGrow: "1",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  label: {
    margin: "0",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    color: "#373737"
  },
  controlsBox: {
    display: "flex",
    alignItems: "center"
  }
};

class CompanySummaryCard extends Component {
  static defaultProps = {
    companyName: "Designit Arabia"
  };

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
        component: AnticipatedTransactions
      },
      {
        title: "Company network",
        key: "network",
        component: CompanyNetwork
      },
      {
        title: "Company contact information",
        key: "contactInformation",
        component: ContactInformation
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

  render() {
    return (
      <div className={this.props.classes.container}>
        <header className={this.props.classes.header}>
          <div className={this.props.classes.companyIconWrap}>
            <CompanyIconSvg />
          </div>
          <div className={this.props.classes.contentBox}>
            <h3
              className={this.props.classes.label}
              onClick={() => this.setState({ isExpanded: false })}
            >
              {this.props.companyName}
            </h3>
          </div>
          <div className={this.props.classes.controlsBox}>
            {!this.state.isExpanded &&
              (this.state.isFilled ? (
                <LinkButton
                  clickHandler={() =>
                    this.setState({ isExpanded: true, isFilled: false })
                  }
                />
              ) : (
                <ContinueButton
                  handleClick={() =>
                    this.setState({ isExpanded: true, isFilled: true })
                  }
                />
              ))}
          </div>
        </header>
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
      </div>
    );
  }
}

export default withStyles(style)(CompanySummaryCard);
