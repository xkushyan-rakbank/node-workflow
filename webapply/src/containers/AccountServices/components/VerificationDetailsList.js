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
  SelectAutocomplete
} from "../../../components/Form";
import { useStyles } from "../styled";
import { ICONS, Icon } from "../../../components/Icons";
import { updateProspect } from "../../../store/actions/appConfig";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "../../../constants";
import { ALLOWED_CHAR_REGEX } from "../../../utils/validation";

export const VerificationDetailsList = ({ values, setFieldValue, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const changeDateProspectHandler = (_, value, path) => {
    return isValid(value) && { [path]: format(value, DATE_FORMAT) };
  };

  const changeTimeProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(new Date(value), DATE_TIME_FORMAT) };

  const addVerificationDetails = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      kycVerificationDate: "",
      kycVerificationTime: "",
      verificationConductedBy: "",
      verificationStatus: "SATF",
      verificationRemarks: ""
    });
  };

  const removeVerificationDetails = (arrayHelpers, itemIndex) => {
    arrayHelpers.remove(itemIndex);
    values.verificationDetails.splice(itemIndex, 1);
    dispatch(
      updateProspect({
        "prospect.kycAnnexure.verificationDetails": values.verificationDetails
      })
    );
  };

  return (
    <FieldArray
      name="verificationDetails"
      render={arrayHelpers => (
        <>
          {values.verificationDetails.map((item, index) => (
            <Fragment key={`verificationDetails-${index}`}>
              <div
                className={classes.verificationDetailsWrapper}
                key={`verificationDetails-${index}`}
              >
                <Grid container spacing={3} className={classes.verificationDetailsGrid}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name={`verificationDetails[${index}].kycVerificationDate`}
                      path={`prospect.kycAnnexure.verificationDetails[${index}].kycVerificationDate`}
                      label="Date of verification"
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
                      name={`verificationDetails[${index}].kycVerificationTime`}
                      path={`prospect.kycAnnexure.verificationDetails[${index}].kycVerificationTime`}
                      label="Time of verification"
                      component={TimePicker}
                      InputProps={{
                        inputProps: { tabIndex: 0 }
                      }}
                      changeProspect={changeTimeProspectHandler}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name={`verificationDetails[${index}].verificationConductedBy`}
                      path={`prospect.kycAnnexure.verificationDetails[${index}].verificationConductedBy`}
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
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name={`verificationDetails[${index}].verificationRemarks`}
                      path={`prospect.kycAnnexure.verificationDetails[${index}].verificationRemarks`}
                      label="Verification remarks"
                      placeholder="Verification remarks"
                      multiline
                      rows="6"
                      InputProps={{
                        inputProps: { tabIndex: 0, maxLength: 5000 }
                      }}
                      component={Input}
                      classes={{
                        formControlRoot: classes.rmVerificationRemarksTextarea,
                        input: classes.textAreaStyle
                      }}
                      allowedCharRegex={ALLOWED_CHAR_REGEX}
                    />
                  </Grid>
                </Grid>
              </div>
              {values.verificationDetails.length > 1 && index > 0 && (
                <div
                  className={classes.addMoreKycButtonWrapper}
                  key={`removeVerificationDetail-${index}`}
                >
                  <IconButton
                    aria-label="delete"
                    style={{ padding: 0 }}
                    onClick={() => removeVerificationDetails(arrayHelpers, index)}
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
            disabled={values.verificationDetails.length === 3}
            onClick={() => addVerificationDetails(arrayHelpers, values.verificationDetails.length)}
          >
            + Add more
          </Button>
        </>
      )}
    />
  );
};
