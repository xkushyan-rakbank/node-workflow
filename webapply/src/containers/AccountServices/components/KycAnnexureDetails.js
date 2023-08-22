import React from "react";
import { useDispatch } from "react-redux";
import { FieldArray } from "formik";
import { Button, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import {
  DatePicker,
  AutoSaveField as Field,
  InlineRadioGroup,
  Input,
  SelectAutocomplete,
  TimePicker
} from "../../../components/Form";
import { YesNaList, YesNoNaList, yesNoOptions } from "../../../constants/options";
import {
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../constants";
import { Upload } from "../../../components/Upload";
import { ICONS, Icon } from "../../../components/Icons";
import { useStyles } from "../styled";

export const KycAnnexureDetails = ({ formValues, setFormValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isCounterfeitProductQuestionVisible = counterfeit => {
    console.log("counterfeit", counterfeit);
    return counterfeit === "COMP" || counterfeit === "SHOP" || counterfeit === "SISC";
  };

  const createKYCAnnexureRadioHandler = ({ values, setFormValues }) => async event => {
    const value = JSON.parse(event.target.value);
    const target = event.target.name;
    setFormValues(target, value);
  };

  const kycAnnexureRadioHandler = createKYCAnnexureRadioHandler({
    formValues,
    setFormValues
  });

  const addVisitDetails = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      conductedDate: "",
      conductedTime: "",
      visitConductedBy: "",
      visitConductedAt: "",
      counterfeitProducts: "",
      sisterCompanyTradeLicense: ""
    });
  };

  const addVerificationDetails = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      verificationDate: "",
      verificationTime: "",
      verificationConductedBy: "",
      verificationStatus: "SATF",
      verificationRemarks: ""
    });
  };

  return (
    <>
      <h4 className={classes.title}>General details</h4>
      <Grid container spacing={3} className={classes.generalDetailsGrid}>
        <Grid item sm={6} xs={12}>
          <Field
            name="companyCIFNumber"
            label="CIF number (company)"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="soleCIFNumber"
            label="CIF number (sole proprietor)"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="workItemNumber"
            label="Workitem number"
            path={"prospect.kycAnnexure.workItemNumber"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="leadNumber"
            label="Lead number"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="sourcingID"
            label="Sourcing ID"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="partnerCode"
            label="Partner code"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="skillBasedCategory"
            path={"prospect.kycAnnexure.skillBasedCategory"}
            label="Skill based category"
            placeholder="Skill based category"
            datalistId="skillBasedCategory"
            component={SelectAutocomplete}
            isLoadDefaultValueFromStore={false}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="roAssigned"
            path={"prospect.kycAnnexure.roName"}
            label="RO assigned"
            placeholder="RO assigned"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="businessModel"
            path={"prospect.kycAnnexure.businessModel"}
            label="Business model"
            placeholder="Business model"
            multiline
            minRows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
            }}
            component={Input}
            fieldDescription="Special characters - \ . % and spaces allowed."
            classes={{ formControlRoot: classes.customUrlLabel, input: classes.textAreaStyle }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="signatoryName"
            label="Name of the signatory"
            path={"prospect.kycAnnexure.signatoryName"}
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 100 }
            }}
            disabled={true}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="ownerAdditionalInfo"
            label="Additional Information of owner"
            placeholder="Additional Information of owner"
            multiline
            minRows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
            }}
            component={Input}
            fieldDescription="Special characters - \ . % and spaces allowed."
            classes={{ formControlRoot: classes.customUrlLabel, input: classes.textAreaStyle }}
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="roGeneralremarks"
            label="General remarks (RO)"
            placeholder="General remarks (RO)"
            multiline
            minRows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
            }}
            component={Input}
            fieldDescription="Special characters - \ . % and spaces allowed."
          />
        </Grid>
        <Grid item sm={12} xs={12}>
          <Field
            name="rmGeneralremarks"
            label="General remarks (RM)"
            placeholder="General remarks (RM)"
            multiline
            minRows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
            }}
            component={Input}
            fieldDescription="Special characters - \ . % and spaces allowed."
            classes={{ formControlRoot: classes.textAreaRoot }}
          />
        </Grid>
      </Grid>
      <div className={classes.kycSection}>
        <h4 className={classes.title}>Verification details</h4>
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>
            Is Audio/Video KYC verification / RM CPV completed for below
          </label>
          <Field
            typeRadio
            options={YesNaList}
            name="audioVideoKycVerification"
            path="prospect.kycAnnexure.audioVideoKycVerification"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
          <Field
            name="rmVerificationRemarks"
            label="Remarks on verification (RM)"
            placeholder="Remarks on verification (RM)"
            multiline
            minRows="6"
            InputProps={{
              inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
            }}
            component={Input}
            fieldDescription="Special characters - \ . % and spaces allowed."
            classes={{ formControlRoot: classes.rmVerificationRemarksTextarea }}
          />
        </div>
        <FieldArray
          name="verificationDetails"
          render={arrayHelpers => (
            <>
              {formValues.verificationDetails.map((item, index) => (
                <>
                  <div className={classes.verificationDetailsWrapper} key={index}>
                    <Grid container spacing={3} className={classes.verificationDetailsGrid}>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`verificationDetails[${index}].verificationDate`}
                          label="Date of verification"
                          component={DatePicker}
                          inputAdornmentPosition="end"
                          InputProps={{
                            disableUnderline: true,
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`verificationDetails[${index}].verificationTime`}
                          label="Time of verification"
                          component={TimePicker}
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`verificationDetails[${index}].verificationConductedBy`}
                          label="Verification conducted by"
                          placeholder="Verification conducted by"
                          component={Input}
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`verificationDetails[${index}].verificationStatus`}
                          path={`prospect.kycAnnexure.verificationDetails[${index}].verificationStatus`}
                          label="Verification status"
                          placeholder="Verfiication status"
                          datalistId="verificationStatus"
                          component={SelectAutocomplete}
                          isLoadDefaultValueFromStore={false}
                          onChange={selectedValue => {
                            setFormValues("verificationStatus", selectedValue);
                          }}
                        />
                      </Grid>
                      <Grid item sm={12} xs={12}>
                        <Field
                          name={`verificationDetails[${index}].verificationRemarks`}
                          label="Verification remarks"
                          placeholder="Verification remarks"
                          multiline
                          minRows="6"
                          InputProps={{
                            inputProps: { tabIndex: 0, maxLength: 5000, minLength: 100 }
                          }}
                          component={Input}
                          fieldDescription="Special characters - \ . % and spaces allowed."
                          classes={{ formControlRoot: classes.rmVerificationRemarksTextarea }}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {formValues.verificationDetails.length > 1 && index > 0 && (
                    <div className={classes.addMoreKycButtonWrapper}>
                      <IconButton aria-label="delete" style={{ padding: 0 }}>
                        <HighlightOffIcon />
                      </IconButton>
                    </div>
                  )}
                </>
              ))}
              <div className={classes.verificationDetailsInfoWrapper}>
                <Icon name={ICONS.info} className={classes.verifyDetailInfoIcon} alt="info" />
                You can add max upto 3
              </div>
              <Button
                color="primary"
                variant="outlined"
                className={classes.addMoreButton}
                disabled={formValues.verificationDetails.length === 3}
                onClick={() =>
                  addVerificationDetails(arrayHelpers, formValues.verificationDetails.length)
                }
              >
                + Add more
              </Button>
            </>
          )}
        />
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>
            EID of the signatory pinged to EIDA and successful?
          </label>
          <Field
            typeRadio
            options={YesNaList}
            name="eidPing"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
        </div>
        <Field
          name="pingVerificationReport"
          type="file"
          fieldDescription="Upload ping verification report"
          helperText={SUPPORTED_FILE_FORMAT_TEXT}
          accept={TL_ACCEPTED_FILE_TYPES}
          fileSize={TL_COI_FILE_SIZE}
          component={Upload}
          mobilecontentPlaceholder={"Upload your File"}
        />
      </div>
      <div className={classes.kycSection}>
        <h4 className={classes.title}>Visit details </h4>
        <div className={classes.questionareWrapper}>
          <label className={classes.sectionLabel}>Is visit conducted?</label>
          <Field
            typeRadio
            options={YesNoNaList}
            name="isVisitConducted"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="primary"
            onChange={kycAnnexureRadioHandler}
          />
        </div>
        <FieldArray
          name="visitDetails"
          render={arrayHelpers => (
            <>
              {formValues.visitDetails.map((item, index) => (
                <>
                  <div className={classes.verificationDetailsWrapper} key={index}>
                    <Grid container spacing={3} className={classes.verificationDetailsGrid}>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`visitDetails[${index}].conductedDate`}
                          label="Conducted date"
                          component={DatePicker}
                          inputAdornmentPosition="end"
                          InputProps={{
                            disableUnderline: true,
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`visitDetails[${index}].conductedTime`}
                          label="Conducted time"
                          component={TimePicker}
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`visitDetails[${index}].visitConductedBy`}
                          label="Visit conducted by"
                          placeholder="Visit conducted by"
                          component={Input}
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <Field
                          name={`visitDetails[${index}].visitConductedAt`}
                          label="Visit conducted at"
                          path={`prospect.kycAnnexure.visitDetails[${index}].visitConductedAt`}
                          placeholder="Visit conducted at"
                          datalistId="visitConductedAt"
                          component={SelectAutocomplete}
                          isLoadDefaultValueFromStore={false}
                        />
                      </Grid>

                      {isCounterfeitProductQuestionVisible(
                        formValues.visitDetails[index].visitConductedAt
                      ) && (
                        <Grid item sm={12} xs={12} style={{ marginBottom: "24px" }}>
                          <div className={classes.questionareWrapper}>
                            <label className={classes.sectionLabel}>
                              Did you notice counterfeit products at the time of visit?
                            </label>
                            <Field
                              typeRadio
                              options={yesNoOptions}
                              name={`visitDetails[${index}].counterfeitProducts`}
                              path={`prospect.kycAnnexure.visitDetails[${index}].counterfeitProducts`}
                              component={InlineRadioGroup}
                              customIcon={false}
                              classes={{
                                root: classes.radioButtonRoot,
                                label: classes.radioLabelRoot
                              }}
                              radioColor="primary"
                              onChange={kycAnnexureRadioHandler}
                            />
                          </div>
                        </Grid>
                      )}
                      <Grid item sm={12} xs={12} style={{ marginBottom: "10px" }}>
                        <Field
                          name={`visitDetails[${index}].sisterCompanyTradeLicense`}
                          type="file"
                          fieldDescription="Upload sister company trade license"
                          helperText={SUPPORTED_FILE_FORMAT_TEXT}
                          accept={TL_ACCEPTED_FILE_TYPES}
                          fileSize={TL_COI_FILE_SIZE}
                          component={Upload}
                          mobilecontentPlaceholder={"Upload your File"}
                        />
                      </Grid>
                    </Grid>
                  </div>
                  {formValues.visitDetails.length > 1 && index > 0 && (
                    <div className={classes.addMoreKycButtonWrapper}>
                      <IconButton aria-label="delete" style={{ padding: 0 }}>
                        <HighlightOffIcon />
                      </IconButton>
                    </div>
                  )}
                </>
              ))}
              <div className={classes.verificationDetailsInfoWrapper}>
                <Icon name={ICONS.info} className={classes.verifyDetailInfoIcon} alt="info" />
                You can add max upto 3
              </div>
              <Button
                color="primary"
                variant="outlined"
                className={classes.addMoreButton}
                disabled={formValues.visitDetails.length === 3}
                onClick={() => addVisitDetails(arrayHelpers, formValues.visitDetails.length)}
              >
                + Add more
              </Button>
            </>
          )}
        />
      </div>
    </>
  );
};
