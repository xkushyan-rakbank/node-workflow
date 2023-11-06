import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { FieldArray } from "formik";
import { format, isValid } from "date-fns";
import { Button, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";
import {
  AutoSaveField as Field,
  DatePicker,
  TimePicker,
  Input,
  SelectAutocomplete,
  InlineRadioGroup
} from "../../../components/Form";
import { useStyles } from "../styled";
import { ICONS, Icon } from "../../../components/Icons";
import { updateProspect } from "../../../store/actions/appConfig";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../constants";
import { yesNoOptions } from "../../../constants/options";
import { Upload } from "../../../components/Upload";

export const VisitDetailsList = ({
  values,
  setFieldValue,
  kycAnnexureRadioHandler,
  removeDoc,
  handleDropFile,
  isUploading,
  ...props
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeDateProspectHandler = (_, value, path) => {
    return isValid(value) && { [path]: format(value, DATE_FORMAT) };
  };

  const changeTimeProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(new Date(value), DATE_TIME_FORMAT) };

  const isCounterfeitProductQuestionVisible = counterfeit => {
    return counterfeit === "COMP" || counterfeit === "SHOP" || counterfeit === "SISC";
  };

  const isSisterCompany = visitConductedAt => visitConductedAt === "SISC";

  const addVisitDetails = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      kycVisitDate: "",
      kycVisitTime: "",
      visitConductedBy: "",
      visitConductedAt: "",
      noticeToCounterfeit: "",
      sisterCompanyTradeLicense: ""
    });
  };

  const removeVisitDetails = (arrayHelpers, itemIndex) => {
    dispatch(
      updateProspect({
        "prospect.kycAnnexure.visitDetails": values.visitDetails
      })
    );
    if (arrayHelpers.form.values.visitDetails[itemIndex].sisterCompanyTradeLicense) {
      removeDoc(
        itemIndex,
        values,
        `visitDetails[${itemIndex}].sisterCompanyTradeLicense`,
        values.visitDetails[itemIndex].sisterCompanyTradeLicense,
        values.visitDetails.length,
        setFieldValue
      );
    }
    arrayHelpers.remove(itemIndex);
    values.visitDetails.splice(itemIndex, 1);
  };

  return (
    <FieldArray
      name="visitDetails"
      render={arrayHelpers => {
        return (
          <>
            {values.visitDetails.map((item, index) => (
              <Fragment key={`visitDetails-${index}`}>
                <div className={classes.verificationDetailsWrapper} key={index}>
                  <Grid container spacing={3} className={classes.verificationDetailsGrid}>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`visitDetails[${index}].kycVisitDate`}
                        path={`prospect.kycAnnexure.visitDetails[${index}].kycVisitDate`}
                        label="Conducted date"
                        component={DatePicker}
                        inputAdornmentPosition="end"
                        InputProps={{
                          disableUnderline: true,
                          inputProps: { tabIndex: 0 }
                        }}
                        changeProspect={changeDateProspectHandler}
                        maxDate={new Date()}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`visitDetails[${index}].kycVisitTime`}
                        path={`prospect.kycAnnexure.visitDetails[${index}].kycVisitTime`}
                        label="Conducted time"
                        component={TimePicker}
                        InputProps={{
                          inputProps: { tabIndex: 0 }
                        }}
                        changeProspect={changeTimeProspectHandler}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`visitDetails[${index}].visitConductedBy`}
                        path={`prospect.kycAnnexure.visitDetails[${index}].visitConductedBy`}
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
                      />
                    </Grid>
                    {isCounterfeitProductQuestionVisible(
                      values.visitDetails[index].visitConductedAt
                    ) && (
                      <Grid item sm={12} xs={12} style={{ marginBottom: "24px" }}>
                        <div className={classes.questionareWrapper}>
                          <label className={classes.sectionLabel}>
                            Did you notice counterfeit products at the time of visit?
                          </label>
                          <Field
                            typeRadio
                            options={yesNoOptions}
                            name={`visitDetails[${index}].noticeToCounterfeit`}
                            path={`prospect.kycAnnexure.visitDetails[${index}].noticeToCounterfeit`}
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
                    {isSisterCompany(values.visitDetails[index].visitConductedAt) && (
                      <Grid item sm={12} xs={12} style={{ marginBottom: "10px" }}>
                        <Field
                          name={`visitDetails[${index}].sisterCompanyTradeLicense`}
                          type="file"
                          fieldDescription="Upload sister company Trade License"
                          helperText={SUPPORTED_FILE_FORMAT_TEXT}
                          accept={TL_ACCEPTED_FILE_TYPES}
                          fileSize={TL_COI_FILE_SIZE}
                          component={Upload}
                          mobilecontentPlaceholder={"Upload your file"}
                          file={values.visitDetails[index]?.sisterCompanyTradeLicense}
                          onDrop={acceptedFile =>
                            handleDropFile(
                              acceptedFile,
                              `visitDetails[${index}].sisterCompanyTradeLicense`,
                              props.touched,
                              props.setTouched,
                              setFieldValue,
                              index
                            )
                          }
                          isUploading={
                            isUploading[`visitDetails[${index}].sisterCompanyTradeLicense`]
                          }
                          content={values.visitDetails[index]?.sisterCompanyTradeLicense}
                          onDelete={() => {
                            removeDoc(
                              index,
                              values,
                              `visitDetails[${index}].sisterCompanyTradeLicense`,
                              values.visitDetails[index].sisterCompanyTradeLicense,
                              values.visitDetails.length,
                              setFieldValue
                            );
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </div>
                {values.visitDetails.length > 1 && index > 0 && (
                  <div
                    className={classes.addMoreKycButtonWrapper}
                    key={`removeVisitDetail-${index}`}
                  >
                    <IconButton
                      aria-label="delete"
                      style={{ padding: 0 }}
                      onClick={() => removeVisitDetails(arrayHelpers, index)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  </div>
                )}
              </Fragment>
            ))}
            <div className={classes.verificationDetailsInfoWrapper}>
              <Icon name={ICONS.info} className={classes.verifyDetailInfoIcon} alt="info" />
              You can add max upto 3
            </div>
            <Button
              color="primary"
              variant="outlined"
              className={classes.addMoreButton}
              disabled={values.visitDetails.length === 3}
              onClick={() => addVisitDetails(arrayHelpers, values.visitDetails.length)}
            >
              + Add more
            </Button>
          </>
        );
      }}
    />
  );
};
