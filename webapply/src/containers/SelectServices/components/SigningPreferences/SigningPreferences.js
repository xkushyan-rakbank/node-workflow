import React, { useEffect } from "react";
import get from "lodash/get";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";
import { accountSigningTypes } from "../../../../constants/options";

import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper/FormWrapper";
import { AddButton } from "../../../../components/Buttons/AddButton";
import Divider from "../../../../components/Divider";
import { ConfirmingTransactions } from "./ConfirmingTransactions";
import { SigningTransactions } from "./SigningTransactions";
import { ContactGroup } from "./ContactGroup";

import Subtitle from "../../../../components/Subtitle";

import { useStyles } from "./styled";
import { RadioGroupWrapper } from "../../../../components/Form/Radio/RadioGroupButtons";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

const SigningPreferencesSchema = Yup.object({
  accountSigningType: Yup.string().required("Field is required")
});

export const SigningPreferencesComponent = props => {
  const {
    signatoryInfo,
    accountSigningType,
    accountSigningInstn,
    goToNext,
    updateProspect
  } = props;
  const classes = useStyles();

  const authorityToSignType = get(props, "accountSigningType.value");
  useEffect(() => {
    if (authorityToSignType !== ACCOUNTS_SIGNING_NAME_OTHER) {
      updateProspect({ [accountSigningInstn.name]: "" });
    }
  }, [authorityToSignType, updateProspect, accountSigningInstn.name]);

  const handleAddPerson = () => {
    const { signInfoFullNameInput } = props;
    const signatoriesTotal = signatoryInfo.length;

    if (signatoriesTotal === 1) {
      const path = signInfoFullNameInput.config.name.replace("*", signatoriesTotal);
      updateProspect({ [path]: "" });
    }
  };

  const onSubmit = e => {
    // console.log(e) // TODO
  };

  return (
    <>
      <Formik
        initialValues={{
          accountSigningType: ""
        }}
        validationSchema={SigningPreferencesSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <Subtitle title="Signing transactions" helpMessage="help message todo" />
              <Field
                name="accountSigningType"
                options={accountSigningTypes}
                component={RadioGroupWrapper}
              >
                <span>TEXT AREA</span>
                {/* TODO implement text area */}
              </Field>

              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>

      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        <SigningTransactions accountSigningType={accountSigningType} />

        <Divider />
        <ConfirmingTransactions />

        <ContactGroup signatoryInfo={signatoryInfo} />
        <AddButton
          title="Add another person"
          onClick={handleAddPerson}
          className={classes.addButton}
        />
      </FormWrapper>
    </>
  );
};
