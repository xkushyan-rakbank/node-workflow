import { initialState } from "./../retrieveApplicantInfo";
import retrieveApplicantInfoReducer from "./../retrieveApplicantInfo";
import * as retrieveApplicantActions from "../../actions/retrieveApplicantInfo";

describe("retrieveApplicantInfoReducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise 'searchResults' as an empty array", () => {
      const { searchResults } = initialState;
      expect(searchResults).toHaveLength(0);
    });
  });

  describe("reducer", () => {
    describe("on 'RETRIEVE_APPLICANT_INFO_SUCCESS'", () => {
      const searchApplicationsSuccessParamObj = {
        searchResult: [
          {
            prospectId: "100",
            _links: {
              self: {
                href: "/webapply/api/v1/banks/RAK/usertypes/sme/prospects/100"
              }
            },
            status: {
              statusType: "Incomplete",
              statusCode: "",
              statusFlag: "",
              statusNotes: "",
              statusReason: "",
              statusOverAll: "",
              reasonNotes: "",
              reasonCode: "",
              reasonStatus: ""
            },
            applicantInfo: {
              fullName: "Anjali Kesarwani",
              email: "akesarwani@abc.com",
              countryCode: "+971",
              mobileNo: "45689679867"
            },
            preScreeningInfo: {
              statusOverAll: "proceed",
              screeningResults: [
                {
                  screeningType: "Dedupe Check",
                  screeningStatus: "Completed",
                  screeningFlag: "string",
                  screeningNotes: "string",
                  screeningReason: "No Match Reason",
                  reasonNotes: "string",
                  reasonCode: "string",
                  reasonStatus: "string"
                }
              ]
            },
            auditTrail: [
              {
                fieldName: "string",
                modifiedBy: "Kapil",
                modifiedDateTime: "10/09/2019 11:30:00"
              }
            ],
            organizationInfo: {
              licenseNumber: "3456798765789",
              companyName: "Gill Pvt. Ltd."
            },
            applicationInfo: {
              viewId: "string",
              actionType: "save"
            }
          }
        ]
      };
      let state;

      beforeAll(() => {
        state = retrieveApplicantInfoReducer(
          initialState,
          retrieveApplicantActions.retrieveApplicantInfoSuccess(searchApplicationsSuccessParamObj)
        );
      });

      it("should update store value", () => {
        const { searchResults } = state;
        expect(searchResults).toEqual(searchApplicationsSuccessParamObj);
      });
    });

    describe("retrieveApplicantInfoFail", () => {
      const testError = "test Error";

      it(" should update isProceed and screeningResults", () => {
        const state = retrieveApplicantInfoReducer(
          initialState,
          retrieveApplicantActions.retrieveApplicantInfoFail(testError)
        );
        const { searchResults } = state;
        expect(searchResults).toBe(testError);
      });
    });
  });
});
