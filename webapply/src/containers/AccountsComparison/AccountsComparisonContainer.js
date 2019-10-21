import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateProspect } from "../../store/actions/appConfig";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import AccountCardContainer from "./AccountCardContainer";
import InfoNote from "../../components/InfoNote";
import TableCompare from "../../components/TableCompare";

import accountComparisonPoster from "../../assets/images/videoPosters/Account comparison.jpg";
import accountComparisonVideo from "../../assets/videos/Account comparison.mp4";
import * as appConfigSelectors from "../../store/selectors/appConfig";

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

  componentDidMount() {
    const { updateProspect } = this.props;
    updateProspect({
      "prospect.applicationInfo.accountType": "",
      "prospect.applicationInfo.islamicBanking": false
    });
  }

  scrollToSection = e => {
    const { scrollToIndex: index, accountType } = e;
    this.setState({
      indexScrollToSection: {
        currentTarget: { name: index.toString() }
      },
      selectedAccount: accountType
    });
  };

  render() {
    const { classes, servicePricingGuideUrl } = this.props;

    return (
      <React.Fragment>
        <VerticalPaginationWrapper
          videoUrl={accountComparisonVideo}
          posterUrl={accountComparisonPoster}
          indexScrollToSection={this.state.indexScrollToSection}
        >
          <div> </div>
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
                    href={servicePricingGuideUrl}
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

const mapStateToProps = state => ({
  servicePricingGuideUrl: appConfigSelectors.getServicePricingGuideUrl(state)
});
const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountsComparisonContainer)
);
