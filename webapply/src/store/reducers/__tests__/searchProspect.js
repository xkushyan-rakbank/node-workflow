import { initialState } from "./../../reducers/searchProspect";
import searchProspectReducer from "./../../reducers/searchProspect";
import * as searchProspectActions from "./../../actions/searchProspect";

describe("searchProspectReducer", () => {
  afterEach(jest.resetAllMocks);

  describe("initialState", () => {
    it("should initialise 'searchResults' as an empty array", () => {
      const { searchResults } = initialState;

      expect(searchResults).toHaveLength(0);
    });
  });

  describe("reducer", () => {
    describe("on 'SEARCH_APPLICATIONS_SUCCESS'", () => {
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
        state = searchProspectReducer(
          initialState,
          searchProspectActions.searchApplicationsSuccess(searchApplicationsSuccessParamObj)
        );
      });

      it("should update store value", () => {
        const { searchResults } = state;
        expect(searchResults).toEqual(searchApplicationsSuccessParamObj);
      });
    });
  });
});
