import React from "react";
import { withStyles } from "@material-ui/core/styles";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import AccountCardContainer from "./AccountCardContainer";
import InfoNote from "../../components/InfoNote";
import TableCompare from "../../components/TableCompare";

import accountComparisonVideo from "../../assets/videos/Account comparison.mp4";

const linkToDetailedServiceAndGuide =
  "https://rakbank.ae/wps/wcm/connect/24fe8e8e-fc35-4967-8dd3-8935c64f085e/RAK%2BS%26P%2B-CC-Account%2BServices%2BBusiness%2B%26%2BRemittances-Web%2BEN-01....pdf?MOD=AJPERES&CVID=mI8CAQA";

const styles = {
  externalLink: {
    color: "#888888",
    textDecoration: "underline"
  }
};

class AccountsComparisonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: "Current Account",
      indexScrollToSection: {
        currentTarget: {
          name: 0
        }
      }
    };
  }

  scrollToSection = e => {
    const { scrollToIndex: index, accountType } = e;
    this.setState({
      indexScrollToSection: {
        currentTarget: { name: index }
      },
      selectedAccount: accountType
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <VerticalPaginationWrapper
          videoUrl={accountComparisonVideo}
          indexScrollToSection={this.state.indexScrollToSection}
        >
          <div></div>
          <div>
            <SectionTitleWithInfo
              title="Business accounts for every business stage"
              info="Available in both conventional and islamic variants"
            />
            <AccountCardContainer handleClick={this.scrollToSection} />
            <InfoNote text="Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>

          <div>
            <SectionTitleWithInfo
              title="Compare the accounts"
              info="Our three business accounts, side by side"
            />
            <TableCompare selectedAccount={this.state.selectedAccount} />
            <InfoNote
              text={
                <>
                  Note: 5% VAT will be levied on all charges applicable to business customers. To
                  see our detailed Service & Price Guide click{" "}
                  <a
                    className={classes.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={linkToDetailedServiceAndGuide}
                  >
                    here
                  </a>
                </>
              }
            />
          </div>
        </VerticalPaginationWrapper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(AccountsComparisonContainer);
