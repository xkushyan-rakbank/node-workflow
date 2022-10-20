/* eslint-disable max-len */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray } from "formik";
import { format, isValid } from "date-fns";
import * as Yup from "yup";
import {
  AutoSaveField as Field,
  Input,
  SelectAutocomplete,
  InlineRadioGroup,
  DatePicker,
  TimePicker
} from "../../../../components/Form";
import {
  MAX_COMPANY_NAME_LENGTH,
  MAX_BANK_NAME_LENGTH,
  RO_DATA_LENGTH,
  GOAMLREGISTRATION_REMARK_LENGTH,
  BANKSTATEMENT_REMARK_LENGTH,
  EXPERIENCE_BUSINESS_MODAL_LENGTH,
  KYCVERIFICATION_LENGTH,
  SIGNATORY_EID_INFO_LENGTH,
  RO_NAME_LENGTH,
  initialBankDetails
} from "../../constants";
import { YesNoList, MEETINGCONDUCTEDLIST, YesNoNaList } from "../../../../constants/options";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../../constants";
import {
  checkIsTrimmed,
  SPECIAL_CHARACTERS_REGEX,
  NAME_REGEX_SIGNATORY,
  TOTAL_EXPERIENCE_YRS_REGEX,
  TOTAL_CORPORATE_EXPERIENCE_YRS_REGEX,
  REGISTRATION_NUMBER_REGEX,
  MAX_EXPERIENCE_YEARS_LENGTH,
  ALPHANUMERIC_ONLY_REGEX,
  REMARK_RESON_REGEX
} from "../../../../utils/validation";
import { Subtitle } from "../../../../components/Subtitle";
import { Divider } from "../Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { TableComponent } from "./countryTable";
import {
  getRequiredMessage,
  getInvalidMessage,
  getMinDateMessage
} from "../../../../utils/getValidationMessage";
import { useStyles } from "./styled";

export const kycAnnexureDetailsSchema = () =>
  Yup.object({
    companyName: Yup.string()
      // .nullable()
      .required(getRequiredMessage("Company name"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
      .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
    skillBasedCategory: Yup.string()
      .nullable()
      .required(getRequiredMessage("Skill based category")),
    signatoryName: Yup.string()
      .nullable()
      .required(getRequiredMessage("Signatory name"))
      // eslint-disable-next-line no-template-curly-in-string
      .matches(NAME_REGEX_SIGNATORY, getInvalidMessage("Signatory name")),
    //.test("space validation", getInvalidMessage("Signatory name"), checkIsTrimmed),
    businessModel: Yup.string()
      .nullable()
      .required(getRequiredMessage("Business Modal"))
      .matches(TOTAL_EXPERIENCE_YRS_REGEX, getInvalidMessage("Business Modal"))
      .max(EXPERIENCE_BUSINESS_MODAL_LENGTH, "Maximum ${max} characters allowed"),
    antiMoneyLaundering: Yup.string().nullable(),
    isUltimateBeneficiary: Yup.string()
      .nullable()
      .required(getRequiredMessage("Is this an Ultimate Beneficiary Ownership company ")),
    audioVideoKycVerification: Yup.string()
      .nullable()
      .required(
        getRequiredMessage("Is Audio/Video KYC verification / RM CPV completed for below ")
      ),
    goAmlRegistration: Yup.string().nullable(),
    goAmlRegistrationNumber: Yup.string()
      .nullable()
      .when("goAmlRegistration", {
        is: "yes",
        then: Yup.string()
          .required(getRequiredMessage("Registration Number"))
          .max(GOAMLREGISTRATION_REMARK_LENGTH, "Maximum ${max} characters allowed")
          .matches(REGISTRATION_NUMBER_REGEX, getInvalidMessage("Registration Number"))
      }),
    kycVerificationDate: Yup.date()
      .nullable()
      .required(getRequiredMessage("Date of kyc verification"))
      .min(new Date(1900, 0, 1), getMinDateMessage("Date of kyc verification"))
      .max(new Date(), getInvalidMessage("Date of kyc verification"))
      .typeError(getInvalidMessage("Date of kyc verification")),
    kycVerificationTime: Yup.date()
      .nullable()
      .required(getRequiredMessage("Time Of Kyc Verification")),
    roName: Yup.string()
      .nullable()
      .required(getRequiredMessage(" Ro Name"))
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Ro Name"))
      .max(RO_NAME_LENGTH, "Maximum ${max} characters allowed"),
    //.test("space validation", getInvalidMessage("Ro Name"), checkIsTrimmed),
    signatoryEIDinfo: Yup.string()
      .nullable()
      .required(getRequiredMessage("EID of all signatories pinged to EIDA and successful")),
    goAmlIndustry: Yup.string().nullable(),
    kycVerificationLocation: Yup.string()
      .nullable()
      .required(getRequiredMessage("Meeting was conducted at")),
    kycVerificationotherLocation: Yup.string()
      .nullable()
      .when("kycVerificationLocation", {
        is: "others",
        then: Yup.string()
          .required(getRequiredMessage("Remarks"))
          .max(KYCVERIFICATION_LENGTH, "Maximum ${max} characters allowed")
          .matches(REMARK_RESON_REGEX, getInvalidMessage("Remarks"))
      }),
    roEmployeeId: Yup.string()
      .nullable()
      .required(getRequiredMessage(" Ro EmployeeId"))
      .max(RO_DATA_LENGTH, "Maximum ${max} characters allowed")
      .matches(ALPHANUMERIC_ONLY_REGEX, getInvalidMessage("Ro EmployeeId")),
    signatoryEIDinfoRemarks: Yup.string()
      .nullable()
      .when("signatoryEIDinfo", {
        is: "no",
        then: Yup.string()
          .required(getRequiredMessage("Reason"))
          .max(SIGNATORY_EID_INFO_LENGTH, "Maximum ${max} characters allowed")
          .matches(TOTAL_EXPERIENCE_YRS_REGEX, getInvalidMessage("Reason"))
      }),
    bankDetails: Yup.array().when("antiMoneyLaundering", {
      is: "yes",
      then: Yup.array().of(
        Yup.object().shape({
          bankName: Yup.string()
            .required(getRequiredMessage("Name of the Bank"))
            .max(MAX_BANK_NAME_LENGTH, "Maximum ${max} characters allowed")
            .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Bank name")),
          bankStatementTo: Yup.date()
            .nullable()
            .when("isStatementAvailable", {
              is: "yes",
              then: Yup.date()
                .required(getRequiredMessage("Bank statement to date"))
                .min(new Date(1900, 0, 1), getMinDateMessage("Bank statement to date"))
                .max(new Date(), getInvalidMessage("Bank statement to date"))
                .typeError(getInvalidMessage("Bank statement to date"))
            }),
          bankStatementFrom: Yup.date()
            .nullable()
            .when("isStatementAvailable", {
              is: "yes",
              then: Yup.date()
                .required(getRequiredMessage("Bank statement from date"))
                .min(new Date(1900, 0, 1), getMinDateMessage("Bank statement from date"))
                .max(new Date(), getInvalidMessage("Bank statement from date"))
                .typeError(getInvalidMessage("Bank statement from date"))
            }),
          bankStatementRemark: Yup.string()
            .nullable()
            .when("isStatementAvailable", {
              is: "yes" || "no",
              then: Yup.string()
                .required(getRequiredMessage("Remarks/ Observations (if any)"))
                .max(BANKSTATEMENT_REMARK_LENGTH, "Maximum ${max} characters allowed")
                .matches(
                  TOTAL_EXPERIENCE_YRS_REGEX,
                  getInvalidMessage("Remarks/ Observations (if any)")
                )
            }),
          isStatementAvailable: Yup.string()
            .nullable()
            .required(getRequiredMessage("Bank statement Available"))
        })
      )
    }),
    signatoryDetails: Yup.array().of(
      Yup.object().shape({
        signatoryName: Yup.string()
          .nullable()
          .required(getRequiredMessage("Signatory name"))
          // eslint-disable-next-line no-template-curly-in-string
          .matches(NAME_REGEX_SIGNATORY, getInvalidMessage("Signatory name")),
        education: Yup.string()
          .nullable()
          .required(getRequiredMessage("Education")),
        backgroundInfo: Yup.string()
          .nullable()
          .required(getRequiredMessage("Corporate Experience"))
          // eslint-disable-next-line no-template-curly-in-string
          .max(MAX_EXPERIENCE_YEARS_LENGTH, "Maximum ${max} characters allowed")
          .matches(TOTAL_CORPORATE_EXPERIENCE_YRS_REGEX, getInvalidMessage("Corporate Experience"))
      })
    ),
    noticeToCounterfeit: Yup.string()
      .nullable()
      .required(getRequiredMessage("Did you notice counterfeit product at this time of visit"))
  });

export const KycAnnexureComponent = ({
  goToNext,
  createFormChangeHandler,
  organizationInfo,
  kycAnnexureDetails,
  kycAnnexureBankDetails,
  datalist
}) => {
  const classes = useStyles();
  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };
  const changeTimeProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(new Date(value), DATE_TIME_FORMAT) };
  return (
    <Formik
      initialValues={{
        companyName: "",
        skillBasedCategory: "",
        cifNumber: "",
        signatoryName: "",
        workItemNo: "",
        businessModel: "",
        isUltimateBeneficiary: "",
        antiMoneyLaundering: "",
        bankDetails: kycAnnexureBankDetails ? kycAnnexureBankDetails : initialBankDetails,
        signatoryDetails: kycAnnexureDetails.signatoryDetails,
        audioVideoKycVerification: "",
        signatoryEIDinfo: "yes",
        signatoryEIDinfoRemarks: "",
        goAmlRegistration: "NA",
        goAmlRegistrationNumber: "",
        noticeToCounterfeit: "",
        roName: "",
        roEmployeeId: "",
        kycVerificationDate: "",
        kycVerificationTime: "",
        kycVerificationLocation: "",
        kycVerificationotherLocation: "",
        goAmlIndustry: kycAnnexureDetails ? kycAnnexureDetails.goAmlIndustry : [],
        poaCountry: kycAnnexureDetails ? kycAnnexureDetails.poaCountry : [],
        clientDealingCountry: kycAnnexureDetails ? kycAnnexureDetails.clientDealingCountry : [],
        riskIndustries: kycAnnexureDetails ? kycAnnexureDetails.riskIndustries : []
      }}
      validationSchema={kycAnnexureDetailsSchema}
      validateOnChange={false}
      onSubmit={goToNext}
    >
      {createFormChangeHandler(({ values, setFieldValue }) => (
        <Form>
          <Subtitle title="" classes={{ wrapper: classes.subtitleBranch }} />
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="companyName"
                label="Company Name"
                path="prospect.kycAnnexure.companyName"
                contextualHelpText="The company name given here will appear in all Bank records including Cheque Books. If the Company's name in Trade License is more than 50 characters long (including space), then an abbreviation can be used. Example If the company name is 'Airlift Global Automation and Heavy Equipment Rental LLC', mention the company name as 'Airlift Global Automation H E R'"
                infoTitle="These details should be the same as in your Trade License"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: MAX_COMPANY_NAME_LENGTH, tabIndex: 0 }
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Field
                name="skillBasedCategory"
                path={"prospect.kycAnnexure.skillBasedCategory"}
                datalistId="skillBasedCategory"
                label={"Skill based category"}
                isSearchable
                component={SelectAutocomplete}
                tabIndex="0"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="cifNumber"
                label="CIF Number"
                disabled
                path="prospect.generalInfo.cifId"
                component={Input}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="workItemNo"
                label="Workitem No"
                disabled
                path="prospect.kycAnnexure.workItemNumber"
                component={Input}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Field
              name="signatoryName"
              label="Signatory"
              path="prospect.kycAnnexure.signatoryName"
              infoTitle="Name of the signatory"
              component={Input}
              InputProps={{
                inputProps: { maxLength: 300, tabIndex: 0 }
              }}
            />
          </Grid>
          <Grid xs={12}>
            <Field
              name="businessModel"
              label="Business Model"
              infoTitle="Details related to the business model"
              path="prospect.kycAnnexure.businessModel"
              component={Input}
              multiline
              rows="4"
              InputProps={{
                inputProps: { maxLength: EXPERIENCE_BUSINESS_MODAL_LENGTH, tabIndex: 0 }
              }}
            />
          </Grid>
          <Divider />
          <Subtitle
            title="Background of the Signatory (please incorporate only details that are not in KYC)"
            classes={{ wrapper: classes.subtitleBranch }}
          />
          <FieldArray name="signatoryDetails">
            {arrayHelpers => (
              <>
                {values.signatoryDetails.map((_, index) => {
                  // eslint-disable-next-line max-len
                  const prospectPath = `prospect.kycAnnexure.signatoryDetails[${index}]`;

                  return (
                    <Grid
                      containerkey={index}
                      item
                      // xs={isMaxAddedSignatories ? 11 : 12}
                      sm={11}
                      xs={12}
                      key={index}
                      className={classes.confirmingTransaction}
                    >
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <Field
                            name={`signatoryDetails[${index}].signatoryName`}
                            label="Name of the signatory"
                            path={`${prospectPath}.signatoryName`}
                            infoTitle="Name of the signatory"
                            component={Input}
                            InputProps={{
                              inputProps: { maxLength: 300, tabIndex: 0 }
                            }}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            name={`signatoryDetails[${index}].education`}
                            path={`${prospectPath}.education`}
                            datalistId="qualification"
                            label={"Education"}
                            isSearchable
                            component={SelectAutocomplete}
                            tabIndex="0"
                          />
                        </Grid>
                      </Grid>
                      <Grid xs={12}>
                        {/* //ro-assist-brd1-5 */}
                        <Field
                          name={`signatoryDetails[${index}].backgroundInfo`}
                          path={`${prospectPath}.backgroundInfo`}
                          label={"Corporate Experience"}
                          placeholder="Work Experience"
                          component={Input}
                          multiline
                          rows="4"
                          InputProps={{
                            inputProps: { maxLength: MAX_EXPERIENCE_YEARS_LENGTH, tabIndex: 0 }
                          }}
                          contextualHelpText={
                            <>
                              <b>
                                {"<"}Please DON{"'"}T use ENTER key in this field{">"}
                              </b>
                              <br />
                              <br />
                              Starting with the most recent enter jobwise list of experience:
                              <br />
                              From Month-Year, To Month-Year, Company Name, Company Country,
                              Position & Employment Type (Salaried / Self Employed)
                              <br />
                              <br />
                              Example
                              <br />
                              APR-16 to TodaysDate, Reliance Biz, UAE, Proprietor, Self-Employed
                              <br />
                              AUG-13 to MAR-16, TCS, India, Marketing Manager, Salaried
                            </>
                          }
                        />
                      </Grid>
                    </Grid>
                  );
                })}
              </>
            )}
          </FieldArray>
          <Divider />
          <Grid container>
            <Field
              name="isUltimateBeneficiary"
              component={InlineRadioGroup}
              path="prospect.kycAnnexure.isUltimateBeneficiary"
              options={YesNoList}
              label="Is this an Ultimate Beneficiary Ownership company? "
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />
          </Grid>
          <>
            <Divider />
            <Subtitle title="Bank Accounts Details" classes={{ wrapper: classes.subtitleBranch }} />
            <Grid container>
              {/* <Grid md={6} xs={12}> */}
              <Field
                name="antiMoneyLaundering"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.antiMoneyLaundering"
                options={YesNoList}
                label="Any additional information available on company’s bank accounts maintained within/outside UAE ? "
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              {/* </Grid> */}
            </Grid>
            {values.antiMoneyLaundering === "yes" && (
              <FieldArray name="bankDetails">
                {arrayHelpers => (
                  <>
                    {values.bankDetails.map((_, index) => {
                      // eslint-disable-next-line max-len
                      const prospectPath = `prospect.kycAnnexure.bankDetails[${index}]`;

                      return (
                        <Grid
                          containerkey={index}
                          item
                          // xs={isMaxAddedSignatories ? 11 : 12}
                          sm={11}
                          xs={12}
                          key={index}
                          className={classes.confirmingTransaction}
                        >
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <Field
                                name={`bankDetails[${index}].bankName`}
                                label="Name of the Bank"
                                path={`${prospectPath}.bankName`}
                                component={Input}
                                InputProps={{
                                  inputProps: { maxLength: MAX_BANK_NAME_LENGTH, tabIndex: 0 }
                                }}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                name={`bankDetails[${index}].isStatementAvailable`}
                                component={InlineRadioGroup}
                                path={`${prospectPath}.isStatementAvailable`}
                                options={YesNoList}
                                label="Bank statement Available"
                                InputProps={{
                                  inputProps: { tabIndex: 0 }
                                }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                              <Field
                                name={`bankDetails[${index}].bankStatementFrom`}
                                label="Statement available from"
                                path={`${prospectPath}.bankStatementFrom`}
                                component={DatePicker}
                                changeProspect={changeDateProspectHandler}
                                maxDate={new Date()}
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Field
                                name={`bankDetails[${index}].bankStatementTo`}
                                label="Statement available to"
                                path={`${prospectPath}.bankStatementTo`}
                                component={DatePicker}
                                changeProspect={changeDateProspectHandler}
                                maxDate={new Date()}
                              />
                            </Grid>
                          </Grid>
                          <Grid container>
                            <Field
                              name={`bankDetails[${index}].bankStatementRemark`}
                              label="Remarks/ Observations (if any)"
                              path={`${prospectPath}.bankStatementRemark`}
                              component={Input}
                              multiline
                              rows="4"
                              InputProps={{
                                inputProps: {
                                  maxLength: BANKSTATEMENT_REMARK_LENGTH,
                                  tabIndex: 0
                                }
                              }}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                  </>
                )}
              </FieldArray>
            )}
            <Divider />
            <Subtitle
              title="Did the Company have any Shareholder or POA holder from the following nationality in last 2 years (please refers past 2 years MOA and confirm, includes exited, silent partners also)? "
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <TableComponent
              data={values.poaCountry}
              datalist={datalist.poaNationality}
              content={"poaCountry"}
            />
            <Divider />
            <Subtitle
              title="Does the client belong to any of the below Industries as per industry risk category?"
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TableComponent
                  data={values.riskIndustries}
                  datalist={datalist.industryRiskCategory}
                  content={"riskIndustries"}
                />
              </Grid>
            </Grid>
            <Divider />
            <Subtitle
              title="Does the client have dealing with below listed countries? Ensured the same been captured on risk score in demographic section?"
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TableComponent
                  data={values.clientDealingCountry}
                  datalist={datalist.clientDealingCountry}
                  content={"clientDealingCountry"}
                />
              </Grid>
            </Grid>
            <Divider />
            <Subtitle title="" classes={{ wrapper: classes.subtitleBranch }} />
            <Grid container>
              <Field
                name="audioVideoKycVerification"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.audioVideoKycVerification"
                options={YesNoNaList}
                label="Is Audio/Video KYC verification / RM CPV completed for below "
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
              <ul className={classes.differences}>
                <li>{"If owner from any exception nationality"}</li>
                <li>{"If Industry is General Trading (Macro Category) "}</li>
                <li>{"If sole signatory of company is POA holder?"}</li>
              </ul>
            </Grid>
            <Divider />
            <Grid container>
              <Field
                name="signatoryEIDinfo"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.signatoryEIDinfo"
                options={YesNoList}
                label="EID of all signatories pinged to EIDA and successful"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            {values.signatoryEIDinfo === "no" && (
              <Grid container>
                <Field
                  name="signatoryEIDinfoRemarks"
                  label="Reason"
                  path="prospect.kycAnnexure.signatoryEIDinfoRemarks"
                  component={Input}
                  multiline
                  rows="3"
                  InputProps={{
                    inputProps: { maxLength: SIGNATORY_EID_INFO_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
            )}
            <Grid container>
              {/* //ro-assist-brd1-5 */}
              <Field
                name="goAmlRegistration"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.goAmlRegistration"
                options={YesNoNaList}
                label="Does the client belong to any of the below industries and has Go AML registration document provided?"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            {values.goAmlRegistration === "yes" && (
              <Grid item md={6} xs={12}>
                <Field
                  name="goAmlRegistrationNumber"
                  label="Registration Number "
                  path="prospect.kycAnnexure.goAmlRegistrationNumber"
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: GOAMLREGISTRATION_REMARK_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
            )}
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TableComponent
                  data={values.goAmlIndustry}
                  datalist={datalist.goAmlIndustry}
                  content={"goAmlIndustry"}
                />
              </Grid>
            </Grid>
            <Divider />
            <Grid container>
              <Field
                name="noticeToCounterfeit"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.noticeToCounterfeit"
                options={YesNoList}
                label="Did you notice counterfeit products at the time of visit(applicable where meeting at business premises)"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            <Subtitle
              title="MANDATORY CONFIRMATION"
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Field
                  name="roName"
                  label="RO Name"
                  path={"prospect.kycAnnexure.roName"}
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: RO_DATA_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="roEmployeeId"
                  label="RO EmployeeId"
                  path={"prospect.kycAnnexure.roEmployeeId"}
                  component={Input}
                  InputProps={{
                    inputProps: { maxLength: RO_DATA_LENGTH, tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Field
                  name="kycVerificationDate"
                  label="Date of kyc verification"
                  path={"prospect.kycAnnexure.kycVerificationDate"}
                  component={DatePicker}
                  changeProspect={changeDateProspectHandler}
                  maxDate={new Date()}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="kycVerificationTime"
                  label="Time of kyc verification "
                  path={"prospect.kycAnnexure.kycVerificationTime"}
                  component={TimePicker}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                  changeProspect={changeTimeProspectHandler}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Field
                name="kycVerificationLocation"
                component={InlineRadioGroup}
                path="prospect.kycAnnexure.kycVerificationLocation"
                options={MEETINGCONDUCTEDLIST}
                label="Meeting was conducted at"
                InputProps={{
                  inputProps: { tabIndex: 0 }
                }}
              />
            </Grid>
            {values.kycVerificationLocation === "others" && (
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="kycVerificationotherLocation"
                    label="Remarks"
                    component={Input}
                    path={"prospect.kycAnnexure.kycVerificationotherLocation"}
                    InputProps={{
                      inputProps: { maxLength: KYCVERIFICATION_LENGTH, tabIndex: 0 }
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {/* <p>
              {`I ${values.roName !== "" ? "..............." : values.roName}, EMP -${
                values.roEmployeeId !== "" ? "..............." : values.roEmployeeId
              }. have met the authorized signatory (ies) of the company personally on ${
                values.kycVerificationDate
              } at ${
                values.kycVerificationTime
              } AM/PM for account opening documentation purpose. I confirm that to the best of my knowledge and reasonable verification and enquiry from the customer, the information contained in the KYC is complete, accurate and up to date”. The meeting was conducted at: Business Premises of the Company /0  RAK Bank Premises /0  Others ( ${
                values.kycVerificationotherLocation
              }) `}
            </p> */}
          </>
          <div className={classes.buttonWrapper}>
            <ContinueButton type="submit" />
          </div>
        </Form>
      ))}
    </Formik>
  );
};
