import React, { useState, useRef, useCallback, useContext } from "react";

import {
  VerticalPagination,
  scrollToDOMNode,
  VerticalPaginationContext
} from "../../components/VerticalPagination";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { AccountCard } from "./components/AccountCard";
import { InfoNote } from "../../components/InfoNote";
import { TableCompare } from "./components/TableCompare";
import { accountTypes } from "./components/TableCompare/constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { getVideoByAccountType } from "../../utils/getVideoByAccountType";

import { useStyles } from "./styled";
import { BackgroundVideoPlayer } from "../../components/BackgroundVideoPlayer";

export const AccountsComparisonComponent = ({ servicePricingGuideUrl }) => {
  const classes = useStyles();
  useFormNavigation([true, false]);
  const { setCurrentSection } = useContext(VerticalPaginationContext);
  const [selectedAccount, setSelectedAccount] = useState(accountTypes.starter.name);

  const firstSection = useRef(null);
  const secondSection = useRef(null);
  const tableRef = useRef(null);

  const scrollToSection = useCallback(
    i => scrollToDOMNode([firstSection, secondSection, tableRef][i]),
    []
  );

  const handleSetAccountType = useCallback(
    accountType => {
      setSelectedAccount(accountType);
      setCurrentSection(2);
    },
    [setSelectedAccount, setCurrentSection]
  );

  return (
    <div className={classes.container}>
      <VerticalPagination scrollToSection={scrollToSection}>
        <div ref={firstSection}>
          <BackgroundVideoPlayer
            video={getVideoByAccountType()}
            handleClick={() => setCurrentSection(1)}
          />
        </div>
        <div ref={secondSection}>
          <SectionTitleWithInfo
            title="Business accounts for every business stage"
            info="Available in both conventional and islamic variants"
            smallInfo
          />
          <AccountCard handleSetAccountType={handleSetAccountType} />
          <InfoNote text="Companies older than 12 months are not eligible for the RAKstarter account" />
        </div>

        <div ref={tableRef}>
          <SectionTitleWithInfo
            title="Compare the accounts"
            info="Our three business accounts, side by side"
            smallInfo
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
