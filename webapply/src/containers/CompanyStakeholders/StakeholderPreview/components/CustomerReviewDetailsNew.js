/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import cx from "classnames";

import routes from "../../../../routes";
import { getRequiredMessage, nameInvalidMessage } from "../../../../utils/getValidationMessage";
import {
  Input,
  AutoSaveField as Field,
  InlineRadioGroup,
  SelectAutocomplete
} from "../../../../components/Form";
import {
  MAX_MOTHER_MAIDEN_NAME_LENGTH,
  MIN_MOTHER_NAME_LENGTH
} from "../../../CompanyInfo/constants";
import { ALLOWED_CHAR_REGEX, NAME_REGEX } from "../../../../utils/validation";
import { updateProspect } from "../../../../store/actions/appConfig";
import { Footer } from "../../../../components/Footer";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { NextStepButton } from "../../../../components/Buttons/NextStepButton";
import { useStyles } from "../../components/CompanyStakeholders/styled";

const labelTextForNoEfrIncorrect = (
  <span style={{ display: "flex", alignItems: "center" }}>
    <p style={{ margin: "0px" }}>
      No&nbsp;
      <span style={{ fontSize: "14px", color: "#757575" }}>(We'll call you to fix any issues)</span>
    </p>
  </span>
);

const stakePreviewYesNoOptions = [
  {
    code: "Yes",
    key: "Yes",
    value: true,
    label: "Yes"
  },
  {
    code: "No",
    key: "No",
    value: false,
    label: labelTextForNoEfrIncorrect
  }
];

export const CustomerReviewDetails = ({ customerData, onClickNextSubmit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const customerInitValues = {
    questionInput: "",
    mothersMaidenName: "",
    countryofBirth: ""
  };

  const customerPreviewValidation = Yup.object({
    countryofBirth: Yup.string()
      .nullable()
      .required(getRequiredMessage("Country of birth")),
    mothersMaidenName: Yup.string()
      .required(getRequiredMessage("Mother's maiden name"))
      .min(
        MIN_MOTHER_NAME_LENGTH,
        `Mother's maiden name is too short. Please enter at least ${MIN_MOTHER_NAME_LENGTH} characters`
      )
      .max(
        MAX_MOTHER_MAIDEN_NAME_LENGTH,
        `Mother's maiden name is too long. Please enter up to ${MAX_MOTHER_MAIDEN_NAME_LENGTH} characters.`
      )
      .matches(NAME_REGEX, nameInvalidMessage),
    questionInput: Yup.boolean()
      .typeError(getRequiredMessage("This field"))
      .required(getRequiredMessage("This field"))
  });

  const selectRadioBoolean = ({ values, setFieldValue }) => event => {
    const value = JSON.parse(event.target.value);
    const name = event.target.name;
    setFieldValue(name, value);
    dispatch(updateProspect({ "prospect.signatoryInfo[0].isEFRDataCorrect": value }));
  };

  return (
    <div data-testid="customerReviewContainer">
      <div className={classes.reviewDetails} data-testid="customerReviewDetailsWrapper">
        <div>
          <h5 className={classes.reviewDetailsTitle} data-testid="essentialInformation">
            Essential information
          </h5>
        </div>
        <div className={classes.stakeHolderPreviewHorizontal}></div>
        <div className={classes.infoLabelValue} data-testid="fullName">
          <label>Full name:</label>
          <p>{customerData.signatoryFullName}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Nationality:</label>
          <p>{customerData.signatoryNationality}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Date of birth:</label>
          <p>{customerData.dateOfBirth}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Emirates ID number:</label>
          <p>{customerData.eidNumber}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Emirates ID expiry date:</label>
          <p>{customerData.eidExpiryDt}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Passport number:</label>
          <p>{customerData.passportNumber}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Passport issue:</label>
          <p>{customerData.passportIssueDate}</p>
        </div>
        <div className={classes.infoLabelValue}>
          <label>Passport expiry:</label>
          <p>{customerData.passportExpiryDate}</p>
        </div>
      </div>
      <Formik
        initialValues={customerInitValues}
        validationSchema={customerPreviewValidation}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onClickNextSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, ...props }) => {
          const radioChangeHandler = selectRadioBoolean({ values, setFieldValue });
          /* istanbul ignore next */
          if (isSubmitting) {
            const fieldErrorNames = Object.keys(errors);
            const el =
              document.querySelector(`input[name='${fieldErrorNames[0]}']`) ||
              document.querySelector(".Mui-error");
            const element = el && el.parentElement ? el.parentElement : el;
            element && element.scrollIntoView({ behavior: "smooth", block: "start" });
          }

          return (
            <Form data-testid="otherInformationForm">
              <Grid container>
                <Grid item xs={12}>
                  <div className={classes.reviewDetails}>
                    <div>
                      <h5 className={classes.reviewDetailsTitle}>Other information</h5>
                    </div>
                    <div className={classes.stakeHolderPreviewHorizontal}></div>
                    <div className={cx(classes.infoLabelValue, classes.editCustomerDetails)}>
                      <label>Country of birth:</label>
                      <Field
                        name="countryofBirth"
                        path="prospect.signatoryInfo[0].countryofBirth"
                        placeholder="Select"
                        label=""
                        datalistId="country"
                        component={SelectAutocomplete}
                        tabIndex="0"
                        classes={{
                          formControlRoot: classes.previewFormControl
                        }}
                        addSelectLabelOption={true}
                      />
                    </div>
                    <div className={cx(classes.infoLabelValue, classes.editCustomerDetails)}>
                      <label>Mother's maiden name:</label>
                      <Field
                        name="mothersMaidenName"
                        path="prospect.signatoryInfo[0].mothersMaidenName"
                        label=""
                        component={Input}
                        InputProps={{
                          inputProps: { tabIndex: 0, maxLength: MAX_MOTHER_MAIDEN_NAME_LENGTH }
                        }}
                        allowedCharRegex={ALLOWED_CHAR_REGEX}
                        classes={{
                          formControlRoot: classes.previewFormControl,
                          input: classes.inputWithoutLabel
                        }}
                        fieldDescription={"Enter Mother's maiden name as per your passport"}
                      />
                    </div>
                  </div>
                  <div data-testid="isEFRDataCorrect">
                    <div className={classes.informationQuestion}>
                      Is all of your information correct?
                    </div>
                    <Field
                      typeRadio
                      options={stakePreviewYesNoOptions}
                      name="questionInput"
                      path="prospect.signatoryInfo[0].isEFRDataCorrect"
                      component={InlineRadioGroup}
                      customIcon={false}
                      classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                      radioColor="primary"
                      onChange={radioChangeHandler}
                    />
                    <div>
                      <p className={classes.reviewRemarks}>
                        If not, don't worry—you can continue with your application. We'll reach out
                        to you within 48 hours to help make any corrections.
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Footer dataTestId="footer">
                <BackLink path={routes.stakeholdersInfo} isTypeButton={true} />
                <NextStepButton
                  label="Next"
                  type="submit"
                  justify="flex-end"
                  data-testid="nextButton"
                />
              </Footer>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
