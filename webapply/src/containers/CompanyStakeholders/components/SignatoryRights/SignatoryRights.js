import React from "react";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import {
  InlineRadioGroup,
  SelectAutocomplete,
  AutoSaveField as Field
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { yesNoOptions } from "../../../../constants/options";
import { UAE } from "../../../../constants";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";

const signatoryRightsSchema = Yup.object().shape({
  isSignatory: Yup.boolean().required("Field Is this person a signatory is not filled"),
  authorityType: Yup.string().when("isSignatory", {
    is: true,
    then: Yup.string().required(getRequiredMessage("Authority type"))
  })
});

export const SignatoryRights = ({ handleContinue, index }) => (
  <Formik
    initialValues={{ authorityType: "", isSignatory: "" }}
    onSubmit={handleContinue}
    validationSchema={signatoryRightsSchema}
    validateOnChange={false}
  >
    {withCompanyStakeholder(index, ({ values, setFieldValue }) => (
      <Form>
        <Grid container>
          <Field
            name="isSignatory"
            path={`prospect.signatoryInfo[${index}].kycDetails.isSignatory`}
            component={InlineRadioGroup}
            options={yesNoOptions}
            label="Is this person a signatory?"
            changeProspect={prospect => ({
              ...prospect,
              [`prospect.signatoryInfo[${index}].kycDetails.residenceCountry`]: UAE
            })}
            onSelect={() => setFieldValue("authorityType", "")}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
          />
          <Field
            name="authorityType"
            path={`prospect.signatoryInfo[${index}].accountSigningInfo.authorityType`}
            disabled={!values.isSignatory}
            isSearchable={false}
            component={SelectAutocomplete}
            label="Authority Type"
            datalistId="authorityType"
            contextualHelpProps={{ isDisableHoverListener: false }}
            contextualHelpText="Select the authority / document through which the stakeholder is nominated as Signatory"
            inputProps={{ tabIndex: 0 }}
          />
        </Grid>

        <SubmitButton />
      </Form>
    ))}
  </Formik>
);
