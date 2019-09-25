import React from "react";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import AccountCardContainer from "./AccountCardContainer";
import InfoNote from "../../components/InfoNote";
import TableCompare from "../../components/TableCompare";

import accountComparisonVideo from "../../assets/videos/Account comparison.mp4";

class AccountsComparisonContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indexScrollToSection: {
        currentTarget: {
          name: 0
        }
      }
    };
  }

  scrollToSection = e => {
    const { name: index } = e.currentTarget;

    this.setState({
      // todo refactor VerticalPaginationWrapper component to use index
      indexScrollToSection: {
        currentTarget: {
          name: index
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <VerticalPaginationWrapper
          videoUrl={accountComparisonVideo}
          indexScrollToSection={this.state.indexScrollToSection}
        >
          <div></div>
          <div>
            <SectionTitleWithInfo
              title="One business account for every business stage"
              info="Wherever your business is, our accounts will meet you there"
            />
            <AccountCardContainer handleClick={this.scrollToSection} />
            <InfoNote text="Note: Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>

          <div>
            <SectionTitleWithInfo
              title="Compare the accounts"
              info="Our three business accounts, side by side"
            />
            <TableCompare />
            <InfoNote text="Note: 5% VAT will be levied on all charges applicable to business customers as published on the Service & Price guide. For all other charges related to your accounts please visit www.rakbank.ae " />
          </div>
        </VerticalPaginationWrapper>
      </React.Fragment>
    );
  }
}

export default AccountsComparisonContainer;
