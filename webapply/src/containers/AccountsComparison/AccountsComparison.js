import React, { useState, useRef, useCallback } from "react";

import { VerticalPagination, scrollToDOMNode } from "../../components/VerticalPagination";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { AccountCard } from "./components/AccountCard";
import { InfoNote } from "../../components/InfoNote";
import { TableCompare } from "./components/TableCompare";
import { accountTypes } from "./components/TableCompare/constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";

import { useStyles } from "./styled";

export const AccountsComparisonComponent = ({ servicePricingGuideUrl }) => {
  const classes = useStyles();
  useFormNavigation([true, false]);
  const [selectedAccount, setSelectedAccount] = useState(accountTypes.starter.name);

  const secondSection = useRef(null);
  const tableRef = useRef(null);

  const scrollToSecondSection = useCallback(() => scrollToDOMNode(secondSection), []);
  const scrollToThirdSection = useCallback(() => scrollToDOMNode(tableRef), []);

  const handleSetAccountType = useCallback(
    accountType => {
      setSelectedAccount(accountType);
      scrollToThirdSection();
    },
    [setSelectedAccount, scrollToThirdSection]
  );

  return (
    <div className={classes.container}>
      <VerticalPagination
        video={getVideoByAccountType()}
        scrollToSecondSection={scrollToSecondSection}
        scrollToThirdSection={scrollToThirdSection}
        showVideoOnMobile
        hasVideo
      >
        <div ref={secondSection}>
          <SectionTitleWithInfo
            title="Business accounts for every business stage"
            info="Available in both conventional and islamic variants"
          />
          <AccountCard handleSetAccountType={handleSetAccountType} />
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
