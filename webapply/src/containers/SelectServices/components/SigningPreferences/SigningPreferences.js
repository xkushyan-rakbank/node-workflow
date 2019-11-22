import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { accountSigningTypes } from "../../../../constants/options";
import { ACCOUNTS_SIGNING_NAME_OTHER } from "../../constants";

import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper/FormWrapper";
import { AddButton } from "../../../../components/Buttons/AddButton";
import Divider from "../../../../components/Divider";
import { ConfirmingTransactions } from "./ConfirmingTransactions";
import { ContactGroup } from "./ContactGroup";
import { TextArea } from "../../../../components/Form/TextArea/TextArea";

import Subtitle from "../../../../components/Subtitle";

import { useStyles } from "./styled";
import { RadioGroupWrapper } from "../../../../components/Form/Radio/RadioGroupButtons";
import { ContinueButton } from "../../../../components/Buttons/ContinueButton";

const signingPreferencesSchema = Yup.object({
  accountSigningType: Yup.string().required("Field is required"),
  accountSigningInstn: Yup.string().when("accountSigningType", {
    is: ACCOUNTS_SIGNING_NAME_OTHER,
    then: Yup.string()
      .max(120, "Max length is 120 symbols")
      .required("Field is required")
  })
});

export const SigningPreferencesComponent = ({
  signatoryInfo,
  accountSigningType,
  accountSigningInstn,
  goToNext
}) => {
  const classes = useStyles();

  // const authorityToSignType = get(props, "accountSigningType.value");
  // useEffect(() => {
  //   if (authorityToSignType !== ACCOUNTS_SIGNING_NAME_OTHER) {
  //     updateProspect({ [accountSigningInstn.name]: "" });
  //   }
  // }, [authorityToSignType, updateProspect, accountSigningInstn.name]);

  // const handleAddPerson = () => {
  //   const { signInfoFullNameInput } = props;
  //   const signatoriesTotal = signatoryInfo.length;
  //
  //   if (signatoriesTotal === 1) {
  //     const path = signInfoFullNameInput.config.name.replace("*", signatoriesTotal);
  //     updateProspect({ [path]: "" });
  //   }
  // };

  const onSubmit = e => {
    // console.log(e) // TODO
  };

  return (
    <>
      <Formik
        initialValues={{
          accountSigningType: "",
          accountSigningInstn: ""
        }}
        validationSchema={signingPreferencesSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Subtitle title="Signing transactions" helpMessage="help message todo" />
            <Field
              name="accountSigningType"
              options={accountSigningTypes}
              onChange={e => {
                setFieldValue("accountSigningType", e.currentTarget.value);
                setFieldValue("accountSigningInstn", "");
              }}
              component={RadioGroupWrapper}
            >
              {values.accountSigningType === ACCOUNTS_SIGNING_NAME_OTHER && (
                <Field
                  name="accountSigningInstn"
                  placeholder="Please specify (Maxium 120 characters)"
                  component={TextArea}
                />
              )}
            </Field>
            <Divider />
            <ConfirmingTransactions /> {/* TODO */}
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>

      <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
        {/*<SigningTransactions accountSigningType={accountSigningType} />*/}
        {/*<ConfirmingTransactions />*/}

        <ContactGroup signatoryInfo={signatoryInfo} />
        <AddButton
          title="Add another person"
          // onClick={handleAddPerson}
          className={classes.addButton}
        />
      </FormWrapper>
    </>
  );
};
