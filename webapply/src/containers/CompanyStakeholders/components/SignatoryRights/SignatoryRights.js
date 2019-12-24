import React from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import {
  CustomSelect,
  InlineRadioGroup,
  AutoSaveField as Field
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { yesNoOptions } from "../../../../constants/options";
import { SubmitButton } from "./../SubmitButton/SubmitButton";

const signatoryRightsSchema = Yup.object().shape({
  isSignatory: Yup.boolean().required("Required"),
  authorityType: Yup.string().when("isSignatory", {
    is: true,
    then: Yup.string().required("Required")
  })
});

export const SignatoryRights = ({ handleContinue, index }) => (
  <Formik
    initialValues={{ authorityType: "", isSignatory: "" }}
    onSubmit={handleContinue}
    validationSchema={signatoryRightsSchema}
    validateOnChange={false}
  >
    {withCompanyStakeholder(index, ({ values }) => (
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
            disabled={!values.isSignatory}
            component={CustomSelect}
            label="Authority Type"
            datalistId="authorityType"
          />
        </Grid>

        <SubmitButton />
      </Form>
    ))}
  </Formik>
);
