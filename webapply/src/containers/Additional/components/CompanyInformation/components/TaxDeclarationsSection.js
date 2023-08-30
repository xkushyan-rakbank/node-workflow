import React, { forwardRef, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { useStyles } from "../../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import {
  ActivePassiveOptions,
  YesNoList,
  entityTypeOptionList
} from "../../../../../constants/options";
import {
  AutoSaveField as Field,
  GlobalIntermediaryID,
  InlineRadioGroup
} from "../../../../../components/Form";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";
import { getInvalidMessage } from "../../../../../utils/getValidationMessage";
import { GLOBAL_INTERMEDIARY_REGEX } from "../../../../../utils/validation";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { updateProspect } from "../../../../../store/actions/appConfig";

// eslint-disable-next-line react/display-name
export const TaxDeclarationsSection = forwardRef(
  ({ setFieldValue: setFormFieldValue, id, refs }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
    const { taxDeclarationFormRef, taxDeclarationAccordionRef } = refs;

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
      setFieldValue(target, value);
      if (target === "isFinancialInstitution") {
        const globalintermediaryId = values["globalintermediaryId"] || undefined;
        setFieldValue("globalintermediaryId", globalintermediaryId);
        if (value === "no") {
          setFieldValue("globalintermediaryId", "");
          dispatch(
            updateProspect({
              ["prospect.companyAdditionalInfo.globalintermediaryId"]: ""
            })
          );
        }
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
        .oneOf(["yes", "no"], "Please confirm your entity type is required"),
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
      isFinancialInstitution: "",
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
        innerRef={taxDeclarationFormRef}
      >
        {({ values, setFieldValue, isValid, ...props }) => {
          const IsValidForm = taxDeclarationSchema.isValidSync(values);
          const companyTaxRadioFieldHandler = createCompanyTaxRadioHandler({
            values,
            setFieldValue
          });
          const showGIINField = values.isFinancialInstitution === "yes";
          const isCompanyUSEntityVisible = values.isCompanyUSEntity === "yes";
          const showNonFinancialInstitution = values.isFinancialInstitution === "no";
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
                  "Your company's tax information is required for our internal checks. You can find more details for each section by tapping on the information icon."
                }
                accordionRef={taxDeclarationAccordionRef}
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
                  <label className={classes.sectionLabel}>Please confirm your entity type?</label>
                  <Field
                    typeRadio
                    options={entityTypeOptionList}
                    name="isFinancialInstitution"
                    path={"prospect.companyAdditionalInfo.isFinancialInstitution"}
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    onChange={companyTaxRadioFieldHandler}
                    radioColor="primary"
                  />
                </div>
                {showGIINField && (
                  <div className={classes.taxDeclarationQuestionare}>
                    <label className={classes.sectionLabel}>
                      GIIN (Global Intermediary Identification Number)
                    </label>
                    <Field
                      isVisible={showGIINField}
                      name="globalintermediaryId"
                      path={"prospect.companyAdditionalInfo.globalintermediaryId"}
                      label={"Enter GIIN"}
                      component={GlobalIntermediaryID}
                    />
                  </div>
                )}
                {showNonFinancialInstitution && (
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
                      Active Non-Financial Entity (Active NFE): An entity generating more than 50%
                      of its yearly income through its operational activities.
                    </p>
                    <p className={classes.activePassiveDesc}>
                      Passive Non-Financial Entity (Passive NFE): An entity generating more than 50%
                      of its yearly income through dividends, interest, rents, or other
                      passively-earned income on a regular basis, without additional effort.
                    </p>
                  </div>
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
  }
);
