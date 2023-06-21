import React, { useState } from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";

import useGeneratePdf from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/useGeneratePdf";
import {
  YesNoListForTaxPayInAnotherCountry,
  reasonForTINNotAvailableOptions
} from "../../../../../constants/options";
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
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("authorizationsConsent", wcmData);

  const basePath = "prospect.stakeholderAdditionalInfo.taxDetails";

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
      initialValues={{
        taxesInAnotherCountry: "",
        country: "",
        TIN: "",
        reasonForTINNotAvailable: "",
        remarks: ""
      }}
      onSubmit={() => {}}
      validateOnChange={false}
    >
      {({ values }) => {
        return (
          <>
            <Accordion
              title={"Tax declarations"}
              showDefinition={definitionContext}
              id={"taxDeclarations"}
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
                  customIcon={false}
                  classes={{
                    root: classes.radioButtonRoot,
                    label: classes.radioLabelRoot
                  }}
                  isInlineStyle={false}
                  radioColor="primary"
                />
              </div>
              {values.taxesInAnotherCountry === "yes" && (
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
                      options={reasonForTINNotAvailableOptions}
                      // datalistId="reasonForTINNotAvailable"
                      component={SelectAutocomplete}
                    />
                  </Grid>
                  {values.reasonForTINNotAvailable && (
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
