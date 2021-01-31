import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Input, AutoSaveField as Field } from "../../../../components/Form";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { NAME_REGEX } from "../../../../utils/validation";
import { getInvalidMessage, getRequiredMessage } from "../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

const inviteSchema = Yup.object({
  fullName: Yup.string()
    .required(getRequiredMessage("Customer Name"))
    .max(79, "Maximum 79 characters allowed")
    .matches(NAME_REGEX, getInvalidMessage("Customer Name")),
  email: Yup.string()
    .required(getRequiredMessage("Customer E-mail Address"))
    .max(50, "Maximum 50 characters allowed")
    .email(getInvalidMessage("Customer E-mail Address"))
});

export const InviteForm = ({ submitForm, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.baseForm}>
      <h2>Send Invite</h2>
      <p className="formDescription">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Enter your customer's name and email address to send them your custom link.
      </p>
      <Formik
        initialValues={{ fullName: "", email: "" }}
        validationSchema={inviteSchema}
        validateOnChange={false}
        onSubmit={submitForm}
      >
        {({ values }) => (
          <Form>
            <Field
              name="fullName"
              label="Customer Name"
              placeholder="Customer Name"
              component={Input}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />
            <Field
              name="email"
              label="Customer E-mail Address"
              placeholder="Customer Email"
              component={Input}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />
            <div className="linkContainer">
              <SubmitButton
                justify="flex-end"
                label="Submit"
                disabled={Object.values(values).some(value => !value) || isLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
