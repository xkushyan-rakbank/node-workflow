import {
  concatCompanyDocs,
  concatStakeholdersDocs,
  appendDocumentKey,
  appendMultiDocumentKey,
  createDocumentMapper,
  range
} from "../../src/utils/documents";

describe("documents utils tests", () => {
  it("should return empty company docs array when input data passed as null", () => {
    const existDocs = null;
    const incomeDocs = null;
    expect(concatCompanyDocs(existDocs, incomeDocs)).toStrictEqual([]);
  });

  it("should return concated company docs array", () => {
    const existDocs = [{ documentType: "MOA" }];
    const incomeDocs = [{ documentType: "MOA" }, { documentType: "TradeLicenseNo" }];
    const concated = [{ documentType: "MOA" }, { documentType: "TradeLicenseNo" }];
    expect(concatCompanyDocs(existDocs, incomeDocs)).toStrictEqual(concated);
  });

  it("should return empty stakeholders docs object when input data passed as null", () => {
    const neededDocs = null;
    const uploadedDocs = null;
    expect(concatStakeholdersDocs(neededDocs, uploadedDocs)).toStrictEqual({});
  });

  it("should return concated stakeholders docs object", () => {
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const neededDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 0
        },
        personalBankStatements: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 0
        }
      },
      signatory_2: {
        documents: [{ documentKey: "2", documentTitle: "Two" }],
        personalBackground: {
          documents: [],
          limit: 0
        },
        personalBankStatements: {
          documents: [],
          limit: 0
        }
      }
    };
    const uploadedDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 0
        },
        personalBankStatements: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 0
        }
      }
    };
    const concated = { ...uploadedDocs, ...neededDocs };

    expect(
      concatStakeholdersDocs(neededDocs, uploadedDocs, organizationInfo, orgKYCDetails)
    ).toStrictEqual(concated);
  });

  it("should return concated stakeholders docs object, after morethan one personalBackground or personalBankStatements uploaded", () => {
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const neededDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [{ documentKey: "1", documentTitle: "One" }],
          limit: 2
        },
        personalBankStatements: {
          documents: [{ documentKey: "1", documentTitle: "One" }],
          limit: 3
        }
      }
    };
    const uploadedDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [
            { documentKey: "1", documentTitle: "One" },
            { documentKey: "1", documentTitle: "One" }
          ],
          limit: 2
        },
        personalBankStatements: {
          documents: [
            { documentKey: "1", documentTitle: "One" },
            { documentKey: "1", documentTitle: "One" }
          ],
          limit: 3
        }
      }
    };
    const concated = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [
            { documentKey: "1", documentTitle: "One", required: false },
            { documentKey: "1", documentTitle: "One", required: false }
          ],
          limit: 2
        },
        personalBankStatements: {
          documents: [
            { documentKey: "1", documentTitle: "One", required: false },
            { documentKey: "1", documentTitle: "One", required: false }
          ],
          limit: 3
        }
      }
    };

    expect(
      concatStakeholdersDocs(neededDocs, uploadedDocs, organizationInfo, orgKYCDetails)
    ).toStrictEqual(concated);
  });

  it("should return concated stakeholders docs object; personalBackground & personalBankStatements are empty", () => {
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const neededDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [{ documentKey: "1", documentTitle: "One" }],
          limit: 1
        },
        personalBankStatements: {
          documents: [{ documentKey: "1", documentTitle: "One" }],
          limit: 1
        }
      }
    };
    const uploadedDocs = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {},
        personalBankStatements: {}
      }
    };
    const concated = {
      signatory_1: {
        documents: [{ documentKey: "1", documentTitle: "One" }],
        personalBackground: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 1
        },
        personalBankStatements: {
          documents: [{ documentKey: "1", documentTitle: "One", required: false }],
          limit: 1
        }
      }
    };

    expect(
      concatStakeholdersDocs(neededDocs, uploadedDocs, organizationInfo, orgKYCDetails)
    ).toStrictEqual(concated);
  });

  it("should return mapper function", () => {
    expect(typeof createDocumentMapper()).toBe("function");
  });

  it("should return the same document when documentKey doesn't match", () => {
    const document = {
      documentKey: "Passport-0"
    };
    const mapFn = createDocumentMapper("Passport-1");

    expect(mapFn(document)).toStrictEqual(document);
  });

  it("should return the document with additional props", () => {
    const document = {
      documentKey: "Passport-0"
    };
    const additionalProps = { status: "Uploaded" };
    const docWithProps = { ...document, ...additionalProps };
    const mapFn = createDocumentMapper("Passport-0", additionalProps);

    expect(mapFn(document)).toStrictEqual(docWithProps);
  });

  it("should return empty docs array when input data passed as null", () => {
    const docs = null;
    expect(appendDocumentKey(docs)).toStrictEqual([]);
  });

  it("should return docs array with document key", () => {
    const docs = [
      { documentType: "Passport", documentKey: null, documentTitle: "First" },
      { documentType: "Passport", documentKey: null, documentTitle: "Second" }
    ];
    const docsWithKey = [
      { documentType: "Passport", documentKey: "Passport-0", documentTitle: "First" },
      { documentType: "Passport", documentKey: "Passport-1", documentTitle: "Second" }
    ];
    expect(appendDocumentKey(docs)).toStrictEqual(docsWithKey);
  });

  it("should return multi docs array with document key", () => {
    const type = "Passport";
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const docs = {
      documents: [
        { documentType: "Passport", documentKey: null, documentTitle: "First" },
        { documentType: "Passport", documentKey: null, documentTitle: "Second" }
      ],
      limit: 6
    };
    const docsWithKey = {
      documents: [
        {
          documentType: "Passport",
          documentKey: "Passport-0",
          documentTitle: "First"
        },
        {
          documentType: "Passport",
          documentKey: "Passport-1",
          documentTitle: "Second"
        }
      ],
      limit: 6
    };
    expect(appendMultiDocumentKey(docs, type)).toStrictEqual(docsWithKey);
  });

  it("should return forr empty multi docs array with document key", () => {
    const type = "Passport";
    const organizationInfo = { dateOfIncorporation: "10-12-2018", licenseIssueDate: "10-12-2018" };
    const orgKYCDetails = {
      otherBankingRelationshipsInfo: {
        otherBankingRelationshipsExist: true
      }
    };
    const docs = {};
    const docsWithKey = {
      documents: []
    };
    expect(appendMultiDocumentKey(docs, type, organizationInfo, orgKYCDetails)).toStrictEqual(
      docsWithKey
    );
  });

  it("should return array of numbers ", () => {
    const end = 2;
    const result = [0, 1];
    expect(range(end)).toEqual(result);
  });
});
