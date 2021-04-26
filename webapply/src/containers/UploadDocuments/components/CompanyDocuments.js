import React from "react";
import { DocumentRow } from "../DocumentRow";
import { MultiDocumentRow } from "./MultiDocumentRow/MultiDocumentRow";
import { getDocumentInfoMessage } from "../constants";
import { ICONS, Icon } from "./../../../components/Icons";
import { useStyles } from "./styled";
import {
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES
} from "../../../constants";

export const CompanyDocuments = ({
  documents,
  companyName,
  companyBankStatements,
  companyAddressProof,
  companyInvoices
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.companyIconWrap}>
          <Icon name={ICONS.brief} />
        </div>
        <div className={classes.contentBox}>
          <h3 className={classes.label}>{companyName}</h3>
        </div>
      </header>
      {documents.map((document, index) => (
        <DocumentRow
          key={`${document.documentType}-${document.documentKey}`}
          index={index}
          document={document}
          type="companyDocuments"
        />
      ))}
      {/* ro-assist-brd2-1 */}
      {companyBankStatements.documents && (
        <MultiDocumentRow
          documents={companyBankStatements.documents}
          limit={companyBankStatements.limit}
          type={COMPANY_BANK_STATEMENTS}
          infoMessage={getDocumentInfoMessage(COMPANY_BANK_STATEMENTS)}
        />
      )}
      {companyAddressProof.documents && (
        <MultiDocumentRow
          documents={companyAddressProof.documents}
          limit={companyAddressProof.limit}
          type={COMPANY_ADDRESS_PROOF}
          infoMessage={getDocumentInfoMessage(COMPANY_ADDRESS_PROOF)}
        />
      )}
      {companyInvoices.documents && (
        <MultiDocumentRow
          documents={companyInvoices.documents}
          limit={companyInvoices.limit}
          type={COMPANY_INVOICES}
          infoMessage={getDocumentInfoMessage(COMPANY_INVOICES)}
        />
      )}
    </div>
  );
};
