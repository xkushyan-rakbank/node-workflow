import React from "react";
import { useIconsByAccount } from "../../../../utils/useIconsByAccount";
import { ReactComponent as PassportIcon } from "../../../../assets/icons/PassportIDDoc.svg";
import { ReactComponent as ProofOfIncomeIcon } from "../../../../assets/icons/proofOfIncome.svg";
import { ReactComponent as ProofOfAddressDocIcon } from "../../../../assets/icons/proofOfAddressDoc.svg";
import { ReactComponent as TradeLicenseDocIcon } from "../../../../assets/icons/tradeLicenseDocIcon.svg";
import { useStyles } from "./styled";

export const TwoSteps = () => {
  const classes = useStyles();
  const {
    license: License,
    passport: Passport,
    companyDocuments: CompanyDocuments,

    emiratesId: EmirateId
  } = useIconsByAccount();

  return (
    // {/* /* //ro-assist header missing issue fix --- removed manual call */ */}
    <>
      <div className={classes.firstGroup}>
        <p className={classes.infoDesc}>
          So we can get your account set up, you'll need to have the following documents ready.
        </p>
        <p className={classes.infoDesc}>
          Please ensure that the information you provide is accurate, otherwise you may not be able
          to proceed with the application.
        </p>
        <div className={classes.cardsWrapper}>
          <div className={classes.cards}>
            <TradeLicenseDocIcon alt="trade-license" width="21" height="21" />
            <p className={classes.cardDesc}>
              Valid trade licence and constitutional documents
              <sup className={classes.asteriskText}>1</sup>
            </p>
          </div>
          <div className={classes.cards}>
            <PassportIcon alt="passport" className={classes.passportIcon} />
            <p className={classes.cardDesc}>
              Passports and Emirates IDs of signatories and stakeholders
              <sup className={classes.asteriskText}>2</sup>
            </p>
          </div>
          <div className={classes.cards}>
            <ProofOfAddressDocIcon alt="Proof of address" />
            <p className={classes.cardDesc}>Proof of address (operation location)</p>
          </div>
          <div className={classes.cards}>
            <ProofOfIncomeIcon alt="Proof of income" width="18" />
            <p className={classes.cardDesc}>Proof of income for stakeholders</p>
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
      </div>
    </>
  );
};
