import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";

import useGeneratePdf from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/useGeneratePdf";
import { YesNoListForTaxPayInAnotherCountry } from "../../../../../constants/options";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  Input,
  SelectAutocomplete
} from "../../../../../components/Form";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";

import { useStyles } from "../../styled";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { updateProspect } from "../../../../../store/actions/appConfig";

const wcmData = {
  productVariantContent: [
    {
      authorizationsConsent:
        "https://revamp.rakbank.ae/wps/wcm/connect/ea363f59-b3de-4bed-9725-dff6d759b707/KFS083+Business+RAKelite+Account+20072022.pdf?MOD=AJPERES&CONVERT_TO=url&CACHEID=ROOTWORKSPACE-ea363f59-b3de-4bed-9725-dff6d759b707-oym18vA"
    }
  ]
};

export const StakeholderTaxDeclarations = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("authorizationsConsent", wcmData);

  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.taxDetails";

  const initialValues = {
    taxesInAnotherCountry: "",
    country: "",
    TIN: "",
    reasonForTINNotAvailable: "",
    remarks: ""
  };

  const createStakeholderTaxRadioHandler = ({ values, setFieldValue }) => async event => {
    const value = event.target.value;
    const target = event.target.name;
    await setFieldValue(target, value);
    if (target === "taxesInAnotherCountry") {
      if (value === "yes") {
        const country = values["country"] || undefined;
        await setFieldValue("country", country);
      } else {
        await setFieldValue("country", "");
        await setFieldValue("TIN", "");
        await setFieldValue("reasonForTINNotAvailable", "");
        await setFieldValue("remarks", "");
        dispatch(
          updateProspect({
            [`${basePath}.country`]: "",
            [`${basePath}.TIN`]: "",
            [`${basePath}.reasonForTINNotAvailable`]: "",
            [`${basePath}.remarks`]: ""
          })
        );
      }
    }
  };

  const stakeholderTaxInfoSchema = Yup.object().shape({
    taxesInAnotherCountry: Yup.string()
      .required()
      .oneOf(["yes", "no"], "Do you pay taxes in another country is required"),
    country: Yup.string().when("taxesInAnotherCountry", {
      is: "yes",
      then: Yup.string().required(getRequiredMessage("Country"))
    }),
    TIN: Yup.string().when("taxesInAnotherCountry", {
      is: "yes",
      then: Yup.string()
    }),
    reasonForTINNotAvailable: Yup.string().when(["taxesInAnotherCountry", "TIN"], {
      is: (taxesInAnotherCountry, TIN) => !TIN && taxesInAnotherCountry === "yes",
      then: Yup.string().required(getRequiredMessage("Select a reason if TIN is not available"))
    }),
    remarks: Yup.string().when("reasonForTINNotAvailable", {
      is: reasonForTINNotAvailable => reasonForTINNotAvailable === "REA2",
      then: Yup.string()
        .required(getRequiredMessage("Remarks"))
        .max(500, "Maximum ${max} characters allowed")
    })
  });

  const definitionContext = (
    <a
      className={classes.definitionLink}
      onClick={e => {
        e.stopPropagation();
        setOpenDefinitionDialog(true);
      }}
    >
      Definition
    </a>
  );

  const isFormValidInitial = stakeholderTaxInfoSchema.isValidSync(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stakeholderTaxInfoSchema}
      validateOnChange={false}
      isInitialValid={isFormValidInitial}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, isValid, errors }) => {
        const IsValidForm = stakeholderTaxInfoSchema.isValidSync(values);
        const stakeholderTaxRadioFieldHandler = createStakeholderTaxRadioHandler({
          values,
          setFieldValue
        });
        const hideAnotherCountryTaxField = values.taxesInAnotherCountry === "yes";
        const hideRemarks =
          hideAnotherCountryTaxField && values.reasonForTINNotAvailable === "REA2";
        return (
          <>
            <Accordion
              title={"Tax declarations"}
              showDefinition={definitionContext}
              id={"taxDeclarations"}
              isCompleted={IsValidForm}
            >
              <DisclaimerNote text="“RAKBANK cannot offer advice on your tax status or classification. False/incorrect information submitted may lead to enforcement/penal action by the relevant authorities. If any information/tax status provided on this form changes, you must inform RAKBANK within 30 days of such a change and provide a suitably updated Self-Certification Form within 90 days of such change in circumstances. You may contact a professional tax advisor for further support”" />
              <div className={classes.taxDeclarationQuestionare}>
                <label className={classes.sectionLabel}>Do you pay taxes in another country?</label>
                <Field
                  typeRadio
                  name="taxesInAnotherCountry"
                  path={`${basePath}.taxesInAnotherCountry`}
                  options={YesNoListForTaxPayInAnotherCountry}
                  component={CheckboxGroup}
                  onSelect={stakeholderTaxRadioFieldHandler}
                  customIcon={false}
                  classes={{
                    root: classes.radioButtonRoot,
                    label: classes.radioLabelRoot
                  }}
                  isInlineStyle={false}
                  radioColor="primary"
                />
              </div>
              {hideAnotherCountryTaxField && (
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="country"
                      path={`${basePath}.country`}
                      label="Country"
                      placeholder="Country"
                      datalistId="country"
                      component={SelectAutocomplete}
                      filterOptions={options => {
                        return options.filter(item => item.code !== "AE");
                      }}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="TIN"
                      path={`${basePath}.TIN`}
                      label="Tax Identification Number (TIN)"
                      placeholder="Tax Identification Number (TIN)"
                      InputProps={{
                        inputProps: { tabIndex: 1 }
                      }}
                      component={Input}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="reasonForTINNotAvailable"
                      path={`${basePath}.reasonForTINNotAvailable`}
                      label="Select a reason if TIN is not available"
                      placeholder="Select a reason if TIN is not available"
                      datalistId="TINReason"
                      component={SelectAutocomplete}
                    />
                  </Grid>
                  {hideRemarks && (
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="remarks"
                        path={`${basePath}.remarks`}
                        label="Remarks..."
                        placeholder="Remarks..."
                        multiline
                        minRows="9"
                        InputProps={{
                          inputProps: { tabIndex: 0, maxLength: 500 }
                        }}
                        component={Input}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Accordion>
            <TermsAndConditionsDialog
              open={openDefinitionDialog}
              handleClose={() => setOpenDefinitionDialog(false)}
              editedFile={editedFile}
              height={height}
              pages={pages}
              scrollToEnd={false}
            />
          </>
        );
      }}
    </Formik>
  );
};
