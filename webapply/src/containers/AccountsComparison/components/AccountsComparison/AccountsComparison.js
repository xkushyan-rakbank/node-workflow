import React, { useCallback, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { scrollToDOMNode, VerticalPagination } from "../../../../components/VerticalPagination";
import { BackgroundVideoPlayer } from "../../../../components/BackgroundVideoPlayer";
import { getVideoByAccountType } from "../../../../utils/getVideoByAccountType";
import { SectionTitleWithInfo } from "../../../../components/SectionTitleWithInfo";
import { AccountCard } from "../AccountCard";
import { InfoNote } from "../../../../components/InfoNote";
import { TableCompare } from "../TableCompare";
import { useStyles } from "./styled";

export const AccountsComparisonComponent = ({
  handleSetAccountType,
  selectedAccount,
  servicePricingGuideUrl,
  setCurrentSection,
  handleApply
}) => {
  const classes = useStyles();

  const firstSection = useRef(null);
  const secondSection = useRef(null);
  const tableRef = useRef(null);

  const scrollToSection = useCallback(
    i => scrollToDOMNode([firstSection, secondSection, tableRef][i]),
    []
  );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{"Quick Apply | Online Application for Business Accounts | RAKBANK"}</title>
        </Helmet>
      </HelmetProvider>
      <div className={classes.container}>
        <VerticalPagination scrollToSection={scrollToSection}>
          <div ref={firstSection}>
            <BackgroundVideoPlayer
              video={getVideoByAccountType()}
              classes={{ video: classes.video }}
              handleClick={() => setCurrentSection(1)}
            />
          </div>
          <div ref={secondSection} className={classes.section}>
            <SectionTitleWithInfo
              title="Business accounts for every business stage"
              info="Available in both conventional and islamic variants"
              smallInfo
            />
            <AccountCard handleSetAccountType={handleSetAccountType} handleApply={handleApply} />
            <InfoNote text="Companies older than 12 months are not eligible for the RAKstarter account" />
          </div>

          <div ref={tableRef} className={classes.section}>
            <SectionTitleWithInfo
              title="Compare the accounts"
              info="Our three business accounts, side by side"
              smallInfo
            />
            <TableCompare selectedAccount={selectedAccount} handleApply={handleApply} />
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
        </VerticalPagination>
      </div>
    </>
  );
};
