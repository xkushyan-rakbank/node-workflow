import React, { forwardRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { useStyles } from "../../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import { ActivePassiveOptions, YesNoList } from "../../../../../constants/options";
import { AutoSaveField as Field, InlineRadioGroup } from "../../../../../components/Form";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";
import useDecisions from "../../../../../utils/useDecisions";

// eslint-disable-next-line react/display-name
export const TaxDeclarationsSection = forwardRef(
  ({ setFieldValue: setFormFieldValue, id, refs }) => {
    const classes = useStyles();
    const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
    const { visible: dnfbpFieldVisible } = useDecisions(
      "prospect.companyAdditionalInfo.dnfbpField"
    );
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
    };
    const taxDeclarationSchema = Yup.object().shape({
      isdnfbpFieldVisible: Yup.string(),
      dnfbpField: Yup.string().when("isdnfbpFieldVisible", {
        is: true,
        then: Yup.string()
          .nullable()
          .required("Designated Business Dealings is required"),
        otherwise: Yup.string()
          .nullable()
          .notRequired()
      }),
      isCompanyUSEntity: Yup.string().required(),
      isFinancialInstitution: Yup.string()
        .nullable()
        .required()
        .oneOf(["yes", "no"], "Please confirm your entity type is required"),
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
      isdnfbpFieldVisible: dnfbpFieldVisible,
      dnfbpField: "",
      isCompanyUSEntity: "no",
      isFinancialInstitution: "no",
      isNonFinancialInstitution: "active"
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
                accordionRef={taxDeclarationAccordionRef}
              >
                <div>
                  <div className={classes.descriptionSubField}>
                    <p>
                      Tax declarations are necessary for regulatory compliance. Please provide
                      accurate information so that we can complete a quick and accurate assessment.
                    </p>

                  </div>
                  <DisclaimerNote text="RAKBANK cannot offer advice on your tax status or classification. False/incorrect information submitted may lead to enforcement/penal action by the relevant authorities. If any information/tax status provided on this form changes, you must inform RAKBANK within 30 days of such a change and provide a suitably updated Self-Certification Form within 90 days of such change in circumstances. You may contact a professional tax advisor for further support" />
                  {dnfbpFieldVisible && (
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
                      Active Non-Financial Entity (Active NFE): This generally refers to entities
                      with trading activities, including manufacturers, wholesalers, retailers,
                      restaurants and bars, hotels, construction companies, health and social work.
                    </p>
                    <p className={classes.activePassiveDesc}>
                      Passive Non-Financial Entity (Passive NFE): This generally refers to entities
                      that do not actively engage in trade and instead receive income or dividend
                      generated from assets, including properties and shares.
                    </p>
                  </div>
                </div>
              </Accordion>
              <TermsAndConditionsDialog
                open={openDefinitionDialog}
                handleClose={() => setOpenDefinitionDialog(false)}
                editedFile={`${process.env.REACT_APP_PUBLIC_URL ||
                  ""}/TaxDeclarations_Definition.pdf`}
                pages={[1]}
                scrollToEnd={false}
              />
            </>
          );
        }}
      </Formik>
    );
  }
);
