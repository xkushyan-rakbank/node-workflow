import React from "react";
import { PROSPECT_STATUSES } from "../../constants/index";
import {
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND
} from "../../constants";

export const DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS = [
  PROSPECT_STATUSES.ASSESSING,
  PROSPECT_STATUSES.DOCUMENTS_NEEDED,
  PROSPECT_STATUSES.NEED_ADDITIONAL_INFORMATION_DOCUMENTS
];

// ro-assist-brd2-1
const companyBankStatement = <span>Upload Company Bank statement for last 6 months</span>;
const companyAddressProof = (
  <span>
    Upload any one of:
    <br />
    i) Tenancy contract of the company ( Upload your residential tenancy contract in case you are a
    E-trader operating from home)
    <br />
    ii) Telephone Bill
    <br />
    iii) Lease Agreement
    <br />
    iv) Title Deed
  </span>
);
const companyInvoices = (
  <span>
    <br />
    Upload Purchase & Sales invoices.
    <br />
    <br />
  </span>
);
const personalBackground = (
  <span>
    Upload Personal Bank statement for last 6 months.
    <br />
  </span>
);
const personalBankStatements = (
  <span>
    Upload your CV having your previous work experience history.
    <br />
  </span>
);
export const getDocumentInfoMessage = docType => {
  switch (docType) {
    case COMPANY_BANK_STATEMENTS:
      return companyBankStatement;
    case COMPANY_ADDRESS_PROOF:
      return companyAddressProof;
    case COMPANY_INVOICES:
      return companyInvoices;
    case PERSONAL_BACKGROUND:
      return personalBackground;
    case PERSONAL_BANK_STATEMENTS:
      return personalBankStatements;
    default:
      return "";
  }
};
