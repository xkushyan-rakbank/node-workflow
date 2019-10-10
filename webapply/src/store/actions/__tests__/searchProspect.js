import * as searchProspectActions from "./../searchProspect";

describe("search-prospect", () => {
  describe("ActionTypes", () => {
    it("should have a proper name for 'SEARCH_APPLICATIONS'", () => {
      expect(searchProspectActions.SEARCH_APPLICATIONS).toBe("SEARCH_APPLICATIONS");
    });
    it("should have a proper name for 'SEARCH_APPLICATIONS_SUCCESS'", () => {
      expect(searchProspectActions.SEARCH_APPLICATIONS_SUCCESS).toBe("SEARCH_APPLICATIONS_SUCCESS");
    });
  });

  describe("actions", () => {
    describe("searchApplications", () => {
      it("should return an action with type of 'SEARCH_APPLICATIONS'", () => {
        const { type } = searchProspectActions.searchApplications();
        expect(type).toBe(searchProspectActions.SEARCH_APPLICATIONS);
      });
      it("should return an action with the provided parameters as its payload", () => {
        const searchApplicationsParamObj = {
          name: "Anjali",
          countryCode: "",
          mobileNo: "",
          leadNumber: "",
          tradeLicenseNo: "",
          email: "",
          eidNumber: ""
        };
        const { payload } = searchProspectActions.searchApplications(searchApplicationsParamObj);
        expect(payload).toBe(searchApplicationsParamObj);
      });
    });

    describe("searchApplicationsSuccess", () => {
      it("should return an action with type of 'SEARCH_APPLICATIONS_SUCCESS'", () => {
        const { type } = searchProspectActions.searchApplicationsSuccess();
        expect(type).toBe(searchProspectActions.SEARCH_APPLICATIONS_SUCCESS);
      });

      it("should return an action with the response data in its payload", () => {
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
        const { payload } = searchProspectActions.searchApplicationsSuccess(
          searchApplicationsSuccessParamObj
        );

        expect(payload).toBe(searchApplicationsSuccessParamObj);
      });
    });
  });
});
