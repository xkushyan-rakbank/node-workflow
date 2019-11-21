import React from "react";
import { Formik, Form, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import { InlineRadioGroup } from "../Form/InlineRadioGroup/InlineRadioGroup";
import { CustomSelect } from "../Form";
import { yesNoOptions, authorityTypeOptions } from "../../constants/options";
import { SubmitButton } from "./SubmitButton/SubmitButton";
import * as Yup from "yup";

const signatoryRightsSchema = Yup.object().shape({
  kycDetails: Yup.object().shape({
    isSignatory: Yup.boolean().required("Required")
  }),
  accountSigningInfo: Yup.object().shape({
    authorityType: Yup.string().when("kycDetails.isSignatory", {
      is: true,
      then: Yup.string().required("Required")
    })
  })
});

export const SignatoryRights = ({ handleContinue }) => {
  return (
    <Formik
      initialValues={{ accountSigningInfo: { authorityType: "" }, kycDetails: { isSignatory: "" } }}
      onSubmit={handleContinue}
      validationSchema={signatoryRightsSchema}
    >
      {props => {
        return (
          <Form>
            <Grid container>
              <Field
                component={InlineRadioGroup}
                name="kycDetails.isSignatory"
                options={yesNoOptions}
                label="Is this person a signatory?"
              />
              <Field
                name="accountSigningInfo.authorityType"
                options={authorityTypeOptions}
                disabled={!props.values.kycDetails.isSignatory}
                component={CustomSelect}
                label="Authority Type"
              />
            </Grid>

            <SubmitButton />
          </Form>
        );
      }}
    </Formik>
  );
};
