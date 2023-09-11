import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";

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

export const StakeholderTaxDeclarations = ({ setFieldValue: setFormFieldValue, id, refs }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);

  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.taxDetails";

  const initialValues = {
    taxesInAnotherCountry: "no",
    country: "",
    TIN: "",
    reasonForTINNotAvailable: "",
    remarks: ""
  };

  const createStakeholderTaxRadioHandler = ({ values, setFieldValue }) => async event => {
    const value = event.target.value;
    const target = event.target.name;
    setFieldValue(target, value);
    if (target === "taxesInAnotherCountry") {
      if (value === "no") {
        setFieldValue("country", "");
        setFieldValue("TIN", "");
        setFieldValue("reasonForTINNotAvailable", "");
        setFieldValue("remarks", "");
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
    country: Yup.string()
      .nullable()
      .when("taxesInAnotherCountry", {
        is: "yes",
        then: Yup.string().required(getRequiredMessage("Country"))
      }),
    TIN: Yup.string()
      .nullable()
      .when("taxesInAnotherCountry", {
        is: "yes",
        then: Yup.string()
      }),
    reasonForTINNotAvailable: Yup.string()
      .nullable()
      .when(["taxesInAnotherCountry", "TIN"], {
        is: (taxesInAnotherCountry, TIN) => !TIN && taxesInAnotherCountry === "yes",
        then: Yup.string().required(getRequiredMessage("Select a reason if TIN is not available"))
      }),
    remarks: Yup.string()
      .nullable()
      .when("reasonForTINNotAvailable", {
        is: reasonForTINNotAvailable => reasonForTINNotAvailable === "REA2",
        then: Yup.string()
          .required(getRequiredMessage("Remarks"))
          .max(500, "Maximum ${max} characters allowed")
      })
  });

  const { stakeHolderFormRef, stakeHolderTaxAccordionRef } = refs;

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={stakeholderTaxInfoSchema}
      validateOnChange={false}
      innerRef={stakeHolderFormRef}
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
              id={id}
              setFormFieldValue={setFormFieldValue}
              isCompleted={IsValidForm}
              classes={{
                accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
                accordionSummaryContentExpanded:
                  classes.additionalInfoAccordionSummaryContentExpanded
              }}
              showHelperText={
                "For regulatory reasons, we need to know if you pay taxes in any country other than the UAE. If you have a Tax Identification Number(TIN), enter it in field provided below."
              }
              accordionRef={stakeHolderTaxAccordionRef}
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
                      infoTitle={"We need to know this for regulatory reasons."}
                      infoIcon={true}
                    />
                  </Grid>
                  {hideRemarks && (
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="remarks"
                        path={`${basePath}.remarks`}
                        label="Please explain why you are unable to obtain a TIN"
                        placeholder="Please explain why you are unable to obtain a TIN"
                        multiline
                        minRows="9"
                        InputProps={{
                          inputProps: { tabIndex: 0, maxLength: 500 }
                        }}
                        component={Input}
                        classes={{ input: classes.textAreaStyle }}
                      />
                    </Grid>
                  )}
                </Grid>
              )}
            </Accordion>
            <TermsAndConditionsDialog
              open={openDefinitionDialog}
              handleClose={() => setOpenDefinitionDialog(false)}
              editedFile={`${process.env.REACT_APP_PUBLIC_URL ||
                ""}/TaxDeclarations_Definition.pdf`}
              pages={[1, 2]}
              scrollToEnd={false}
            />
          </>
        );
      }}
    </Formik>
  );
};
