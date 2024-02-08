import React from "react";
import { ReactComponent as PassportIcon } from "../../../../assets/icons/PassportIDDoc.svg";
import { ReactComponent as ProofOfIncomeIcon } from "../../../../assets/icons/proofOfIncome.svg";
import { ReactComponent as ProofOfAddressDocIcon } from "../../../../assets/icons/proofOfAddressDoc.svg";
import { ReactComponent as TradeLicenseDocIcon } from "../../../../assets/icons/tradeLicenseDocIcon.svg";
import { useStyles } from "./styled";

export const TwoSteps = () => {
  const classes = useStyles();

  return (
    // {/* /* //ro-assist header missing issue fix --- removed manual call */ */}
    <>
      <div className={classes.firstGroup}>
        <p className={classes.infoDesc}>
          For a successful application, please ensure that the information you provide is as
          accurate as possible.
        </p>
        <div className={classes.cardsWrapper}>
          <div className={classes.cards}>
            <TradeLicenseDocIcon alt="trade-license" width="21" height="24" />
            <p className={classes.cardDesc}>
              Valid Trade License and Constitutional Documents
              <sup className={classes.asteriskText}>1</sup>
            </p>
          </div>
          <div className={classes.cards}>
            <PassportIcon alt="passport" className={classes.passportIcon} height="24" />
            <p className={classes.cardDesc}>
              Passports and Emirates ID of Signatories
              <sup className={classes.asteriskText}>2</sup>
            </p>
          </div>
          <div className={classes.cards}>
            <ProofOfAddressDocIcon alt="Proof of address" height="24" />
            <p className={classes.cardDesc}>Proof of addresses</p>
          </div>
          <div className={classes.cards}>
            <ProofOfIncomeIcon alt="Proof of income" width="18" height="24" />
            <p className={classes.cardDesc}>Proof of income for Stakeholders</p>
          </div>
        </div>
      </div>
      <div className={classes.note}>
        <div>
          <p>
            <sup className={classes.asteriskText}>1</sup>
            Memorandum of Association /Articles of Association / Partners Agreement / Service
            Agreement / Share Certificate
          </p>
        </div>
        <div>
          <p>
            <sup className={classes.asteriskText}>2</sup>Emirates ID not required for non-resident
            stakeholders
          </p>
        </div>
        <div>
          <p className={classes.disclaimer}>
            **Following the review of the submitted documents, the Bank may seek additional
            documents / information
          </p>
        </div>
      </div>
    </>
  );
};
