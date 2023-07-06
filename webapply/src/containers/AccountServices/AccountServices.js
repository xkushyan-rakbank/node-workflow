import React from "react";
import { Form, Formik } from "formik";
import cx from "classnames";

import { formStepper } from "../../constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { SectionTitleWithInfo } from "../../components/SectionTitleWithInfo";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import routes from "../../routes";
import { Accordion } from "../../components/Accordion/CustomAccordion";
import { ReactComponent as LetsGoGreen } from "../../assets/icons/letsGoGreenIcon.svg";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  InlineRadioGroup,
  Input,
  SelectAutocomplete
} from "../../components/Form";
import { useStyles } from "./styled";
import {
  PreferredLanguageOptions,
  PreferredNotificationOptions,
  SinglyOptionList,
  YesNoList
} from "../../constants/options";
import { SelectServicePackage } from "./components/SelectServicePackage";

export const AccountServices = () => {
  useFormNavigation([false, true, formStepper]);
  useLayoutParams(false, true);
  const classes = useStyles();

  const labelTextForGoGreenOption = (
    <span style={{ display: "flex", alignItems: "center" }}>
      <p style={{ margin: "0px" }}>
        Yes, let’s go green <span style={{ fontSize: "12px" }}>(no additional charge)</span>
      </p>
      <LetsGoGreen style={{ marginLeft: 4 }} />
    </span>
  );

  const labelTextForPreferPaper = (
    <p style={{ margin: "0px" }}>
      I prefer paper <span style={{ fontSize: "12px" }}>(monthly charges apply)</span>
    </p>
  );

  const YesNoListForRecieveStatementMode = [
    {
      code: "Yes",
      key: "Yes",
      value: "yes",
      label: labelTextForGoGreenOption
    },
    {
      code: "No",
      key: "No",
      value: "no",
      label: labelTextForPreferPaper
    }
  ];
  const customerName = "Anand Sharma";

  const initialValues = {
    accountCurrencies: "AED",
    emirateCity: "",
    branch: "",
    earnInterest: "no",
    signingPreference: "singly",
    chequebookNeeded: "yes",
    openAccountConfirmation: "yes",
    applyDebitCard: "yes",
    recieveStatementsViaEmail: "yes",
    preferredLanguage: "en",
    recieveNotification: "yes",
    latestOffers: "yes",
    notificationVia: "email",
    contactDirectly: "yes"
  };
  return (
    <div className={classes.container}>
      <div className={classes.section}>
        <SectionTitleWithInfo
          title={"Finally, let's customise your account"}
          info="Go ahead and select your preferences, from debit cards to extra services"
          smallInfo
        />
        <Formik initialValues={initialValues}>
          <Form>
            <SelectServicePackage />
            <div className={classes.packageSelectionWrapper}>
              <Accordion
                title={"Preferences of Product & Services"}
                id={"productAndServices"}
                subTitle={"Lorem ipsum dolor sit amet."}
                classes={{
                  accordionRoot: classes.accountServiceAccordionRoot,
                  accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                  accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                  accordionDetails: classes.accordionDetails
                }}
              >
                <Field
                  name="accountCurrencies"
                  label="Account currency"
                  placeholder="Account currency"
                  datalistId="accountCurrencies"
                  component={SelectAutocomplete}
                  disabled={true}
                />
                <Field
                  name="emirateCity"
                  label="Emirate or city"
                  placeholder="Emirate or city"
                  datalistId="emirateCity"
                  component={SelectAutocomplete}
                />
                <Field
                  name="branch"
                  label="Branch"
                  placeholder="Branch"
                  datalistId="branchCity"
                  component={SelectAutocomplete}
                />
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>
                    Do you want to earn interest on the account?
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="earnInterest"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
              </Accordion>
            </div>
            <div className={classes.packageSelectionWrapper}>
              <Accordion
                title={"Preferences of Authorizations"}
                id={"authorizations"}
                subTitle={"Lorem ipsum dolor sit amet."}
                classes={{
                  accordionRoot: classes.accountServiceAccordionRoot,
                  accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                  accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                  accordionDetails: classes.accordionDetails
                }}
              >
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>Signing preferences</label>
                  <Field
                    typeRadio
                    options={SinglyOptionList}
                    name="signingPreference"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                    Do you want a chequebook for the company?
                    <span>Chequebook availability is subject to successful credit checks</span>
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="chequebookNeeded"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>
                    Would you still to open an account if you don't qualify for a chequebook?
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="openAccountConfirmation"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                    Would you like to apply for a business debit card for {customerName}?
                    <span>
                      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled it to make a type
                      specimen book
                    </span>
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="applyDebitCard"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                  <Field
                    name="nameOnCard"
                    label={"Name on card"}
                    placeholder={"Name on card"}
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                    classes={{ formControlRoot: classes.customLabel }}
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={cx(classes.sectionLabel, classes.sectionLabelWithInfo)}>
                    Please help us save the environment by recieving your statements through e-mail
                    <span>Help us save the environment going paperless</span>
                  </label>
                  <Field
                    typeRadio
                    options={YesNoListForRecieveStatementMode}
                    name="recieveStatementsViaEmail"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{
                      root: classes.radioButtonRoot,
                      label: classes.radioLabelRoot,
                      parent: classes.radioConatiner
                    }}
                    radioColor={"#00CA2C"}
                  />
                </div>
              </Accordion>
            </div>
            <div className={classes.packageSelectionWrapper}>
              <Accordion
                title={"Preferences of communication"}
                id={"communication"}
                subTitle={"Lorem ipsum dolor sit amet."}
                classes={{
                  accordionRoot: classes.accountServiceAccordionRoot,
                  accordionSummaryContent: classes.accountServiceAccordionSummaryContent,
                  accordionSummaryContentExpanded: classes.accordionSummaryContentExpanded,
                  accordionDetails: classes.accordionDetails
                }}
              >
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>Select your preferred language</label>
                  <Field
                    typeRadio
                    options={PreferredLanguageOptions}
                    name="preferredLanguage"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>
                    Would you like to get transaction notifications on your mobile?
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="recieveNotification"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>
                    Would you like to be the first to hear about the latest offers (including from
                    RAKBANK’s authorised third parties)?
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="latestOffers"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>Receive notifications via:</label>
                  <Field
                    name="notificationVia"
                    options={PreferredNotificationOptions}
                    component={CheckboxGroup}
                    customIcon={true}
                    classes={{
                      label: classes.radioLabelRoot
                    }}
                    isInlineStyle={false}
                    radioColor="primary"
                  />
                </div>
                <div className={classes.questionareWrapper}>
                  <label className={classes.sectionLabel}>
                    Can we contact you for surveys or feedback, either directly or through a third
                    party?
                  </label>
                  <Field
                    typeRadio
                    options={YesNoList}
                    name="contactDirectly"
                    component={InlineRadioGroup}
                    customIcon={false}
                    classes={{ root: classes.radioButtonRoot, label: classes.radioLabelRoot }}
                    radioColor="primary"
                  />
                </div>
              </Accordion>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="linkContainer">
        <BackLink path={routes.additionalInfoComponent} />
        <NextStepButton label="Next" justify="flex-end" disabled={false} />
      </div>
    </div>
  );
};
