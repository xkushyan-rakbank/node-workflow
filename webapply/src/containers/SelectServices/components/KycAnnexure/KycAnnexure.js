/* eslint-disable max-len */
import React from "react";
import Grid from "@material-ui/core/Grid";
import { Formik, Form } from "formik";
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
import { MAX_COMPANY_NAME_LENGTH, MAX_BANK_NAME_LENGTH } from "../../constants";
import { YesNoList, MEETINGCONDUCTEDLIST, YesNoNaList } from "../../../../constants/options";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../../constants";
import {
  checkIsTrimmed,
  SPECIAL_CHARACTERS_REGEX,
  NAME_REGEX,
  TOTAL_EXPERIENCE_YRS_REGEX,
  MAX_EXPERIENCE_YEARS_LENGTH
} from "../../../../utils/validation";
import { Subtitle } from "../../../../components/Subtitle";
import { Divider } from "../Divider";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";
import { TableComponent } from "./countryTable";
import {
  getRequiredMessage,
  getInvalidMessage
  // getRequiredNotTextInputMessage
} from "../../../../utils/getValidationMessage";
import { useStyles } from "./styled";

const kycAnnexureDetailsSchema = Yup.object({
  companyName: Yup.string()
    .required(getRequiredMessage("Company name"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_COMPANY_NAME_LENGTH, "Maximum ${max} characters allowed")
    .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Company name"))
    .test("space validation", getInvalidMessage("Company name"), checkIsTrimmed),
  signatoryName: Yup.string()
    .nullable()
    .required(getRequiredMessage("Signatory name"))
    // eslint-disable-next-line no-template-curly-in-string
    .matches(NAME_REGEX, getInvalidMessage("Signatory name"))
    .test("space validation", getInvalidMessage("Signatory name"), checkIsTrimmed),
  businessModel: Yup.string()
    .nullable()
    .required(getRequiredMessage("Business Modal")),
  education: Yup.string().required("required", getRequiredMessage("education")),
  experienceInYrs: Yup.string()
    .required("required", getRequiredMessage("Corporate Experience"))
    // eslint-disable-next-line no-template-curly-in-string
    .max(MAX_EXPERIENCE_YEARS_LENGTH, "Maximum ${max} characters allowed")
    .matches(TOTAL_EXPERIENCE_YRS_REGEX, getInvalidMessage("Corporate Experience")),
  antiMoneyLaundering: Yup.string()
    .nullable()
    .required(
      getRequiredMessage(
        "Any additional information available on company’s bank accounts maintained within/outside UAE "
      )
    ),
  isUltimateBeneficiary: Yup.string()
    .nullable()
    .required(getRequiredMessage("Is this an Ultimate Beneficiary Ownership company ")),
  bankName: Yup.string()
    .required(getRequiredMessage("Name of the Bank"))
    .max(MAX_BANK_NAME_LENGTH, "Maximum ${max} characters allowed")
    .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Bank name")),
  bankStatementTo: Yup.string()
    .nullable()
    .required(getRequiredMessage("Bank Statement To ")),
  bankStatementFrom: Yup.string()
    .nullable()
    .required(getRequiredMessage("Bank Statement From ")),
  bankStatementRemark: Yup.string()
    .nullable()
    .required(getRequiredMessage("Remarks/ Observations (if any)")),
  isStatementAvailable: Yup.string()
    .nullable()
    .required(getRequiredMessage("Bank statement Available")),
  audioVideoKycVerification: Yup.string()
    .nullable()
    .required(getRequiredMessage("Is Audio/Video KYC verification / RM CPV completed for below ")),
  goAmlRegistration: Yup.string()
    .nullable()
    .required(
      getRequiredMessage(
        "Does the client belong to any of the below industries and has Go AML registration document provided"
      )
    ),
  kycVerificationTime: Yup.string().nullable(),
  roName: Yup.string().nullable(),
  signatoryEIDinfo: Yup.string()
    .nullable()
    .required(getRequiredMessage("EID of all signatories pinged to EIDA and successful")),
  goAmlIndustry: Yup.string().nullable(),
  kycVerificationotherLocation: Yup.string().nullable(),
  roEmployeeId: Yup.string()
    .nullable()
    .required(getRequiredMessage(" Ro EmployeeId")),
  signatoryEIDinfoRemarks: Yup.string().nullable()
});

export const KycAnnexureComponent = ({
  goToNext,
  createFormChangeHandler,
  organizationInfo,
  kycAnnexureDetails,
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
        cifNumber: "",
        signatoryName: "",
        workItemNo: "",
        education: "",
        businessModel: "",
        experienceInYrs: "",
        isUltimateBeneficiary: "",
        antiMoneyLaundering: "",
        bankDetails: kycAnnexureDetails.bankDetails,
        bankStatementTo: "",
        isStatementAvailable: "",
        bankStatementFrom: "",
        bankStatementRemark: "",
        bankName: "",
        audioVideoKycVerification: "",
        signatoryEIDinfo: "",
        signatoryEIDinfoRemarks: "",
        goAmlRegistration: "",
        goAmlRegistrationNumber: "",
        roName: "",
        roEmployeeId: "",
        kycVerificationDate: "",
        kycVerificationTime: "",
        kycVerificationLocation: "",
        kycVerificationotherLocation: "",
        goAmlIndustry: [],
        poaCountry: [],
        clientDealingCountry: [],
        riskIndustries: []
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
            <Grid item sm={6} xs={12}>
              <Field
                name="cifNumber"
                label="CIF Number"
                disabled
                path="prospect.generalInfo.cifId"
                component={Input}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Field
                name="workItemNo"
                label="Workitem No"
                disabled
                path="prospect.kycAnnexure.workItemNumber"
                component={Input}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Field
                name="signatoryName"
                label="Signatory"
                path="prospect.kycAnnexure.signatoryName"
                infoTitle="name of the signatory"
                component={Input}
                InputProps={{
                  inputProps: { maxLength: 30, tabIndex: 0 }
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Field
              name="businessModel"
              label="Business Model"
              infoTitle="details related to the business model"
              path="prospect.kycAnnexure.businessModel"
              component={Input}
              multiline
              rows="4"
              InputProps={{
                inputProps: { maxLength: 5000, tabIndex: 0 }
              }}
            />
          </Grid>
          <>
            <Divider />
            <Subtitle
              title="Background of the Shareholder"
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Field
                  name="education"
                  path="prospect.kycAnnexure.education"
                  datalistId="qualification"
                  label={"Education"}
                  isSearchable
                  component={SelectAutocomplete}
                  tabIndex="0"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                {/* //ro-assist-brd1-5 */}
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
            </Grid>
            <Grid xs={12}>
              {/* //ro-assist-brd1-5 */}
              <Field
                name="experienceInYrs"
                path="prospect.kycAnnexure.experienceInYrs"
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
                    From Month-Year, To Month-Year, Company Name, Company Country, Position &
                    Employment Type (Salaried / Self Employed)
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
            <Divider />
            <Subtitle title="" classes={{ wrapper: classes.subtitleBranch }} />
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
            {values.antiMoneyLaundering === "yes" &&
              values.bankDetails &&
              values.bankDetails.map((item, index) => (
                <>
                  <Grid container spacing={3}>
                    <Grid md={6} xs={12}>
                      <Field
                        name="bankName"
                        label="Name of the Bank"
                        path={`prospect.kycAnnexure.bankDetails${[index]}.bankName`}
                        component={Input}
                        InputProps={{
                          inputProps: { maxLength: MAX_BANK_NAME_LENGTH, tabIndex: 0 }
                        }}
                      />
                    </Grid>
                    <Grid container>
                      <Field
                        name="isStatementAvailable"
                        component={InlineRadioGroup}
                        path={`prospect.kycAnnexure.bankDetails${[index]}.isStatementAvailable`}
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
                        name="bankStatementFrom"
                        label="Statement available from"
                        path={`prospect.kycAnnexure.bankDetails${[index]}.bankStatementFrom`}
                        component={DatePicker}
                        changeProspect={changeDateProspectHandler}
                        maxDate={new Date()}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Field
                        name="bankStatementTo"
                        label="Statement available to"
                        path={`prospect.kycAnnexure.bankDetails${[index]}.bankStatementTo`}
                        component={DatePicker}
                        changeProspect={changeDateProspectHandler}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <Field
                        name="bankStatementRemark"
                        label="Remarks/ Observations (if any)"
                        path={`prospect.kycAnnexure.bankDetails${[index]}.bankStatementRemark`}
                        component={Input}
                      />
                    </Grid>
                  </Grid>
                </>
              ))}
            <Divider />
            <Subtitle
              title="Did the Company have any Shareholder or POA holder from the following nationality in last 2 years (please refers past 2 years MOA and confirm, includes exited, silent partners also)? "
              classes={{ wrapper: classes.subtitleBranch }}
            />
            <TableComponent data={values.poaCountry} datalist={datalist.poaNationality} />
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
              <Grid item md={6} xs={12}>
                <Field
                  name="signatoryEIDinfoRemarks"
                  label="Reason"
                  path="prospect.kycAnnexure.signatoryEIDinfoRemarks"
                  component={Input}
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
                label="Does the client belong to any of the below industries and has Go AML registration document provided"
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
                />
              </Grid>
            )}
            <Grid container spacing={3}>
              <Grid item sm={6} xs={12}>
                <TableComponent data={values.goAmlIndustry} datalist={datalist.goAmlIndustry} />
                {/* <Field
                  multiple
                  name="goAmlIndustry"
                  path="prospect.kycAnnexure.goAmlIndustry"
                  label="Go Aml Industry"
                  component={SelectAutocomplete}
                  datalistId="goAmlIndustry"
                  tabIndex="0"
                  isSearchable
                  extractValue={value => value}
                /> */}
              </Grid>
            </Grid>
            <Divider />
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
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="roEmployeeId"
                  label="Ro EmployeeId"
                  path={"prospect.kycAnnexure.roEmployeeId"}
                  component={Input}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Field
                  name="kycVerificationDate"
                  label="Date Of Kyc Verification"
                  path={"prospect.kycAnnexure.kycVerificationDate"}
                  component={DatePicker}
                  changeProspect={changeDateProspectHandler}
                  maxDate={new Date()}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Field
                  name="kycVerificationTime"
                  label="Time Of Kyc Verification "
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
            {values.kycVerificationLocation === "Others" && (
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    name="kycVerificationotherLocation"
                    label="Remark"
                    component={Input}
                    path={"prospect.kycAnnexure.kycVerificationotherLocation"}
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
