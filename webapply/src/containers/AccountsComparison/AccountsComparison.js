import React, { useState } from "react";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import AccountCardContainer from "./components/AccountCard/AccountCard";
import InfoNote from "../../components/InfoNote";
import TableCompare from "./components/TableCompare";
import accountComparisonPoster from "../../assets/images/videoPosters/Account comparison.jpg";
import accountComparisonVideo from "../../assets/videos/Account comparison.mp4";

const AccountsComparison = ({ classes, servicePricingGuideUrl }) => {
  const [selectedAccount, setSelectedAccount] = useState("Current Account");
  const [indexScrollToSection, setIndexScrollToSection] = useState({ currentTarget: { name: 0 } });

  const scrollToSection = e => {
    const { scrollToIndex: index, accountType } = e;
    setIndexScrollToSection({ currentTarget: { name: index.toString() } });
    setSelectedAccount(accountType);
  };

  return (
    <div className={classes.container}>
      <VerticalPaginationWrapper
        videoUrl={accountComparisonVideo}
        posterUrl={accountComparisonPoster}
        indexScrollToSection={indexScrollToSection}
      >
        <div />
        <div>
          <SectionTitleWithInfo
            title="Business accounts for every business stage"
            info="Available in both conventional and islamic variants"
          />
          <AccountCardContainer handleClick={scrollToSection} />
          <InfoNote text="Companies older than 12 months are not eligible for the RAKstarter account" />
        </div>

        <div>
          <SectionTitleWithInfo
            title="Compare the accounts"
            info="Our three business accounts, side by side"
          />
          <TableCompare selectedAccount={selectedAccount} />
          <InfoNote
            text={
              <>
                Note: 5% VAT will be levied on all charges applicable to business customers. To see
                our detailed Service & Price Guide click{" "}
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
    </div>
  );
};

export default AccountsComparison;
