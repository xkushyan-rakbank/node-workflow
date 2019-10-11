import * as ActionTypes from "../../store/actions/retrieveApplicantInfo";

describe("retrieveApplicantInfo", () => {
  describe("ActionTypes", () => {
    it("should have a proper name for 'RETRIEVE_APPLICANT_INFO'", () => {
      expect(ActionTypes.RETRIEVE_APPLICANT_INFO).toBe("RETRIEVE_APPLICANT_INFO");
    });
    it("should have a proper name for 'RETRIEVE_APPLICANT_INFO_SUCCESS'", () => {
      expect(ActionTypes.RETRIEVE_APPLICANT_INFO_SUCCESS).toBe("RETRIEVE_APPLICANT_INFO_SUCCESS");
    });
    it("should have a proper name for 'RETRIEVE_APPLICANT_INFO_FAIL'", () => {
      expect(ActionTypes.RETRIEVE_APPLICANT_INFO_FAIL).toBe("RETRIEVE_APPLICANT_INFO_FAIL");
    });
  });

  describe("actions", () => {
    describe("retrieveApplicantInfo", () => {
      it("should return an action with type of 'RETRIEVE_APPLICANT_INFO'", () => {
        const { type } = ActionTypes.retrieveApplicantInfo();
        expect(type).toBe(ActionTypes.RETRIEVE_APPLICANT_INFO);
      });
      it("should return an action with the provided parameters as its payload", () => {
        const inputParam = {
          fullName: "HappyPath",
          countryCode: "+971" || "",
          mobileNo: "0123456789" || "",
          email: "abc@abc.com" || ""
        };
        const { payload } = ActionTypes.retrieveApplicantInfo(inputParam);
        expect(payload).toBe(inputParam);
      });
    });
    describe("retrieveApplicantInfoSuccess", () => {
      it("should return an action with type of 'RETRIEVE_APPLICANT_INFO_SUCCESS'", () => {
        const { type } = ActionTypes.retrieveApplicantInfoSuccess();
        expect(type).toBe(ActionTypes.RETRIEVE_APPLICANT_INFO_SUCCESS);
      });
      it("should return an action with the response data in its payload", () => {
        const data = {
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
        const { payload } = ActionTypes.retrieveApplicantInfoSuccess(data);
        expect(payload).toBe(data);
      });
    });
  });
});
