import React from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import { CustomSelect, InlineRadioGroup, AutoSaveField as Field } from "../Form";
import { yesNoOptions, authorityTypeOptions } from "../../constants/options";
import { SubmitButton } from "./SubmitButton/SubmitButton";

const signatoryRightsSchema = Yup.object().shape({
  isSignatory: Yup.boolean().required("Required"),
  authorityType: Yup.string().when("isSignatory", {
    is: true,
    then: Yup.string().required("Required")
  })
});

export const SignatoryRights = ({ handleContinue, index }) => {
  return (
    <Formik
      initialValues={{ authorityType: "", isSignatory: "" }}
      onSubmit={handleContinue}
      validationSchema={signatoryRightsSchema}
    >
      {({ values }) => (
        <Form>
          <Grid container>
            <Field
              name="isSignatory"
              path={`prospect.signatoryInfo[${index}].kycDetails.isSignatory`}
              component={InlineRadioGroup}
              options={yesNoOptions}
              label="Is this person a signatory?"
            />
            <Field
              name="authorityType"
              path={`prospect.signatoryInfo[${index}].accountSigningInfo.authorityType`}
              options={authorityTypeOptions}
              disabled={!values.isSignatory}
              component={CustomSelect}
              label="Authority Type"
            />
          </Grid>

          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};
