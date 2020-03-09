import React, { useState, useRef, useContext, useEffect } from "react";

import { VerticalPagination, VerticalPaginationContext } from "../../components/VerticalPagination";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { AccountCard } from "./components/AccountCard";
import { InfoNote } from "../../components/InfoNote";
import { TableCompare } from "./components/TableCompare";

import { getVideoByAccountType } from "../../utils/getVideoByAccountType";

import { useStyles } from "./styled";

export const AccountsComparisonComponent = ({ servicePricingGuideUrl, ...props }) => {
  const {
    location: { initialPosition }
  } = props;
  const { scrollToSection } = useContext(VerticalPaginationContext);
  useEffect(() => {
    if (initialPosition) {
      scrollToSection(initialPosition);
    }
  }, [initialPosition, scrollToSection]);
  const [selectedAccount, setSelectedAccount] = useState("Current Account");
  const classes = useStyles();

  const secondSection = useRef(null);
  const tableRef = useRef(null);

  const scrollToSecondSection = () => {
    secondSection.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTable = () => {
    tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const setAccountType = accountType => {
    setSelectedAccount(accountType);
  };

  return (
    <div className={classes.container}>
      <VerticalPagination
        video={getVideoByAccountType()}
        scrollToSecondSection={scrollToSecondSection}
        showVideoOnMobile
        hasVideo
      >
        <div ref={secondSection}>
          <SectionTitleWithInfo
            title="Business accounts for every business stage"
            info="Available in both conventional and islamic variants"
          />
          <AccountCard setAccountType={setAccountType} handleClickMobile={scrollToTable} />
          <InfoNote text="Companies older than 12 months are not eligible for the RAKstarter account" />
        </div>

        <div ref={tableRef}>
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
      </VerticalPagination>
    </div>
  );
};
