import {
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND
} from "../constants";

// ro-assist-brd2-1
const monthDiff = (dateFrom, dateTo) => {
  return (
    dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

export const multiDocumentValidation = (docs, type, organizationInfo, orgKYCDetails) => {
  (docs || []).map((doc, index) => {
    const optionalFields = [COMPANY_ADDRESS_PROOF, PERSONAL_BACKGROUND];
    let required = true;
    if (optionalFields.includes(type)) {
      required = false;
    } else if (index === 0) {
      const otherBankingRelation =
        orgKYCDetails.otherBankingRelationshipsInfo.otherBankingRelationshipsExist;
      if (type === COMPANY_BANK_STATEMENTS && otherBankingRelation === false) {
        required = false;
      } else if (type === PERSONAL_BANK_STATEMENTS && otherBankingRelation === true) {
        required = false;
      } else if (type === COMPANY_INVOICES) {
        const dateOfIncorporation = new Date(organizationInfo.dateOfIncorporation);
        const licenseIssueDate = new Date(organizationInfo.licenseIssueDate);
        const olderDate =
          dateOfIncorporation < licenseIssueDate ? dateOfIncorporation : licenseIssueDate;
        const lengthOfBusiness = monthDiff(olderDate, new Date());
        required = lengthOfBusiness < 6 ? false : true;
      }
    } else {
      required = false;
    }
    doc.required = required;
    return { ...doc };
  });
  return docs;
};
