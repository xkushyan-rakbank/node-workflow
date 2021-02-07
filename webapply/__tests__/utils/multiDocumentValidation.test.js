import { format } from "date-fns";
import subDays from "date-fns/subDays";
import { multiDocumentValidation } from "../../src/utils/multiDocumentValidaton";
import {
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND
} from "../../src/constants";

describe("multiDocumentValidation utils tests", () => {
  it("Company invoices validation", () => {
    const docs = [
      { documentType: COMPANY_INVOICES, documentKey: null, documentTitle: "First" },
      { documentType: COMPANY_INVOICES, documentKey: null, documentTitle: "Second" }
    ];
    const type = COMPANY_INVOICES;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = [
      { documentType: COMPANY_INVOICES, documentKey: null, documentTitle: "First", required: true },
      {
        documentType: COMPANY_INVOICES,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Company invoices will be optional if company lifespan less than 6 months", () => {
    const docs = [
      { documentType: COMPANY_INVOICES, documentKey: null, documentTitle: "First" },
      { documentType: COMPANY_INVOICES, documentKey: null, documentTitle: "Second" }
    ];
    const type = COMPANY_INVOICES;
    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = format(subDays(new Date(), 10), "yyyy-MM-dd");
    const organizationInfo = { dateOfIncorporation: yesterday, licenseIssueDate: today };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = [
      {
        documentType: COMPANY_INVOICES,
        documentKey: null,
        documentTitle: "First",
        required: false
      },
      {
        documentType: COMPANY_INVOICES,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Company address proofs validation, document optional", () => {
    const docs = [
      { documentType: COMPANY_ADDRESS_PROOF, documentKey: null, documentTitle: "First" },
      { documentType: COMPANY_ADDRESS_PROOF, documentKey: null, documentTitle: "Second" }
    ];
    const type = COMPANY_ADDRESS_PROOF;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = [
      {
        documentType: COMPANY_ADDRESS_PROOF,
        documentKey: null,
        documentTitle: "First",
        required: false
      },
      {
        documentType: COMPANY_ADDRESS_PROOF,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Company bank statements validation", () => {
    const docs = [
      { documentType: COMPANY_BANK_STATEMENTS, documentKey: null, documentTitle: "First" },
      { documentType: COMPANY_BANK_STATEMENTS, documentKey: null, documentTitle: "Second" }
    ];
    const type = COMPANY_BANK_STATEMENTS;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = [
      {
        documentType: COMPANY_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "First",
        required: true
      },
      {
        documentType: COMPANY_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Company bank statements validation no other bank relation", () => {
    const docs = [
      { documentType: COMPANY_BANK_STATEMENTS, documentKey: null, documentTitle: "First" },
      { documentType: COMPANY_BANK_STATEMENTS, documentKey: null, documentTitle: "Second" }
    ];
    const type = COMPANY_BANK_STATEMENTS;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: false
      }
    };
    const validatedDocs = [
      {
        documentType: COMPANY_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "First",
        required: false
      },
      {
        documentType: COMPANY_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Personal bank statements validation", () => {
    const docs = [
      { documentType: PERSONAL_BANK_STATEMENTS, documentKey: null, documentTitle: "First" },
      { documentType: PERSONAL_BANK_STATEMENTS, documentKey: null, documentTitle: "Second" }
    ];
    const type = PERSONAL_BANK_STATEMENTS;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = [
      {
        documentType: PERSONAL_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "First",
        required: false
      },
      {
        documentType: PERSONAL_BANK_STATEMENTS,
        documentKey: null,
        documentTitle: "Second",
        required: false
      }
    ];
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });

  it("Documents validation with no documents", () => {
    const docs = null;
    const type = PERSONAL_BANK_STATEMENTS;
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const validatedDocs = null;
    expect(multiDocumentValidation(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      validatedDocs
    );
  });
});
