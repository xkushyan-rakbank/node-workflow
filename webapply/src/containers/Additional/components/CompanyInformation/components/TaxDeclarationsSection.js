import React, { useState } from "react";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";

import { useStyles } from "../styled";
import { DisclaimerNote } from "../../../../../components/InfoNote/DisclaimerNote";
import { ActivePassiveOptions, YesNoList } from "../../../../../constants/options";
import { AutoSaveField as Field, InlineRadioGroup, Input } from "../../../../../components/Form";
import TermsAndConditionsDialog from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/TermsAndConditionsDialog";
import useGeneratePdf from "../../../../CompanyStakeholders/components/StakeholderTermsAndConditions/useGeneratePdf";

const wcmData = {
  productVariantContent: [
    {
      authorizationsConsent:
        "https://revamp.rakbank.ae/wps/wcm/connect/ea363f59-b3de-4bed-9725-dff6d759b707/KFS083+Business+RAKelite+Account+20072022.pdf?MOD=AJPERES&CONVERT_TO=url&CACHEID=ROOTWORKSPACE-ea363f59-b3de-4bed-9725-dff6d759b707-oym18vA"
    }
  ]
};
export const TaxDeclarationsSection = () => {
  const classes = useStyles();
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("authorizationsConsent", wcmData);

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

  const taxDeclareValue = event => {
    console.log("event-", event.target.value);
  };

  return (
    <div>
      <Accordion
        title={"Tax declarations"}
        showDefinition={definitionContext}
        id={"taxDeclarations"}
      >
        <DisclaimerNote text="“RAKBANK cannot offer advice on your tax status or classification. False/incorrect information submitted may lead to enforcement/penal action by the relevant authorities. If any information/tax status provided on this form changes, you must inform RAKBANK within 30 days of such a change and provide a suitably updated Self-Certification Form within 90 days of such change in circumstances. You may contact a professional tax advisor for further support”" />
        <div className={classes.taxDeclarationQuestionare}>
          <label className={classes.sectionLabel}>
            Is your company dealing in Designated Business Categories?
          </label>
          <Field
            typeRadio
            options={YesNoList}
            name="checkbox"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            onChange={taxDeclareValue}
            radioColor="radioActive"
          />
        </div>
        <div className={classes.taxDeclarationQuestionare}>
          <label className={classes.sectionLabel}>Is your company a US entity?</label>
          <Field
            typeRadio
            options={YesNoList}
            name="checkbox"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="radioActive"
          />
        </div>
        <div className={classes.taxDeclarationQuestionare}>
          <label className={classes.sectionLabel}>Is your company a financial institution?</label>
          <Field
            typeRadio
            options={YesNoList}
            name="checkbox"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="radioActive"
          />
        </div>
        <div className={classes.taxDeclarationQuestionare}>
          <label className={classes.sectionLabel}>
            GIIN (Global Intermediary Identification Number)
          </label>
          <Field
            name="giin"
            label="Enter GIIN "
            placeholder="Enter GIIN "
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </div>
        <div>
          <label className={classes.sectionLabel}>
            Is your company an active or passive non-financial entity (NFE)?
          </label>
          <Field
            typeRadio
            options={ActivePassiveOptions}
            name="checkbox"
            component={InlineRadioGroup}
            customIcon={false}
            classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
            radioColor="radioActive"
          />
          <p className={classes.activePassiveDesc}>
            Active Non-Financial Entity (Active NFE): An entity generating more than 50% of its
            yearly income through its operational activities.
          </p>
          <p className={classes.activePassiveDesc}>
            Passive Non-Financial Entity (Passive NFE): An entity generating more than 50% of its
            yearly income through dividends, interest, rents, or other passively-earned income on a
            regular basis, without additional effort.
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
    </div>
  );
};
