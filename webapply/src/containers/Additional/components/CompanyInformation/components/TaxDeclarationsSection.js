import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { useStyles } from "../../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import { ActivePassiveOptions, YesNoList } from "../../../../../constants/options";
import {
  AutoSaveField as Field,
  GlobalIntermediaryID,
  InlineRadioGroup
} from "../../../../../components/Form";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";
import useGeneratePdf from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/useGeneratePdf";
import { getInvalidMessage } from "../../../../../utils/getValidationMessage";
import { GLOBAL_INTERMEDIARY_REGEX } from "../../../../../utils/validation";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";

const wcmData = {
  productVariantContent: [
    {
      authorizationsConsent:
        "https://revamp.rakbank.ae/wps/wcm/connect/ea363f59-b3de-4bed-9725-dff6d759b707/KFS083+Business+RAKelite+Account+20072022.pdf?MOD=AJPERES&CONVERT_TO=url&CACHEID=ROOTWORKSPACE-ea363f59-b3de-4bed-9725-dff6d759b707-oym18vA"
    }
  ]
};
export const TaxDeclarationsSection = ({ setFieldValue: setFormFieldValue, id }) => {
  const classes = useStyles();
  const { editedFile, height, pages } = useGeneratePdf("authorizationsConsent", wcmData);
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);

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

  const createCompanyTaxRadioHandler = ({ values, setFieldValue }) => async event => {
    const value = JSON.parse(event.target.value);
    const target = event.target.name;
    await setFieldValue(target, value);
    if (target === "isFinancialInstitution") {
      const globalintermediaryId = values["globalintermediaryId"] || undefined;
      await setFieldValue("globalintermediaryId", globalintermediaryId);
    }
  };

  const taxDeclarationSchema = Yup.object().shape({
    dnfbpField: Yup.string()
      .nullable()
      .required()
      .oneOf(
        ["yes", "no"],
        "Is your company dealing in Designated Business Categories is required"
      ),
    isCompanyUSEntity: Yup.string().required(),
    isFinancialInstitution: Yup.string()
      .nullable()
      .required()
      .oneOf(["yes", "no"], "Is your company a Financial Instituion is required"),
    globalintermediaryId: Yup.string().when("isFinancialInstitution", {
      is: "yes",
      then: Yup.string()
        .required(getRequiredMessage("GIIN (Global Intermediary Identification Number)"))
        .matches(
          GLOBAL_INTERMEDIARY_REGEX,
          getInvalidMessage("GIIN (Global Intermediary Identification Number)")
        )
    }),
    isNonFinancialInstitution: Yup.string().when("isFinancialInstitution", {
      is: "no",
      then: Yup.string()
        .required()
        .oneOf(
          ["active", "passive"],
          "Is your company a active or passive Non-Financial Instituion is required"
        )
    })
  });

  const initialValues = {
    dnfbpField: "no",
    isCompanyUSEntity: "no",
    isFinancialInstitution: "na",
    isNonFinancialInstitution: "active",
    globalintermediaryId: ""
  };

  const initialIsValid = taxDeclarationSchema.isValidSync(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taxDeclarationSchema}
      validateOnBlur={true}
      validateOnMount={true}
      isInitialValid={initialIsValid}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, isValid, ...props }) => {
        const IsValidForm = taxDeclarationSchema.isValidSync(values);
        const companyTaxRadioFieldHandler = createCompanyTaxRadioHandler({
          values,
          setFieldValue
        });
        const hideGIINField = values.isFinancialInstitution === "yes";
        const isCompanyUSEntityVisible = values.isCompanyUSEntity === "yes";
        return (
          <>
            <Accordion
              title={"Tax declarations"}
              showDefinition={definitionContext}
              id={id}
              setFormFieldValue={setFormFieldValue}
              isCompleted={IsValidForm}
            >
              <DisclaimerNote text="RAKBANK cannot offer advice on your tax status or classification. False/incorrect information submitted may lead to enforcement/penal action by the relevant authorities. If any information/tax status provided on this form changes, you must inform RAKBANK within 30 days of such a change and provide a suitably updated Self-Certification Form within 90 days of such change in circumstances. You may contact a professional tax advisor for further support" />
              <div className={classes.taxDeclarationQuestionare}>
                <label className={classes.sectionLabel}>
                  Is your company dealing in Designated Business Categories?
                </label>
                <Field
                  typeRadio
                  options={YesNoList}
                  name="dnfbpField"
                  path={"prospect.companyAdditionalInfo.dnfbpField"}
                  component={InlineRadioGroup}
                  customIcon={false}
                  classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                  onChange={companyTaxRadioFieldHandler}
                  radioColor="primary"
                />
              </div>
              {isCompanyUSEntityVisible && (
                <div className={classes.taxDeclarationQuestionare}>
                  <label className={classes.sectionLabel}>Is your company a US entity?</label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="isCompanyUSEntity"
                    path={"prospect.companyAdditionalInfo.isCompanyUSEntity"}
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    onChange={companyTaxRadioFieldHandler}
                    radioColor="primary"
                  />
                </div>
              )}
              <div className={classes.taxDeclarationQuestionare}>
                <label className={classes.sectionLabel}>
                  Is your company a financial institution?
                </label>
                <Field
                  typeRadio
                  options={YesNoList}
                  name="isFinancialInstitution"
                  path={"prospect.companyAdditionalInfo.isFinancialInstitution"}
                  component={InlineRadioGroup}
                  customIcon={false}
                  classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                  onChange={companyTaxRadioFieldHandler}
                  radioColor="primary"
                />
              </div>
              {hideGIINField && (
                <div className={classes.taxDeclarationQuestionare}>
                  <label className={classes.sectionLabel}>
                    GIIN (Global Intermediary Identification Number)
                  </label>
                  <Field
                    isVisible={hideGIINField}
                    name="globalintermediaryId"
                    path={"prospect.companyAdditionalInfo.globalintermediaryId"}
                    label={"Enter GIIN"}
                    component={GlobalIntermediaryID}
                  />
                </div>
              )}
              <div className={classes.taxDeclarationQuestionare}>
                <label className={classes.sectionLabel}>
                  Is your company an active or passive non-financial entity (NFE)?
                </label>
                <Field
                  name="isNonFinancialInstitution"
                  path={"prospect.companyAdditionalInfo.isNonFinancialInstitution"}
                  typeRadio
                  options={ActivePassiveOptions}
                  component={InlineRadioGroup}
                  customIcon={false}
                  classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                  onChange={companyTaxRadioFieldHandler}
                  radioColor="primary"
                />
                <p className={classes.activePassiveDesc}>
                  Active Non-Financial Entity (Active NFE): An entity generating more than 50% of
                  its yearly income through its operational activities.
                </p>
                <p className={classes.activePassiveDesc}>
                  Passive Non-Financial Entity (Passive NFE): An entity generating more than 50% of
                  its yearly income through dividends, interest, rents, or other passively-earned
                  income on a regular basis, without additional effort.
                </p>
              </div>
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
