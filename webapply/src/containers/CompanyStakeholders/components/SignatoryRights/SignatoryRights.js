import React from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import { updateProspect } from "../../../../store/actions/appConfig";
import { stakeholdersSelector } from "../../../../store/selectors/stakeholder";
import {
  InlineRadioGroup,
  SelectAutocomplete,
  AutoSaveField as Field
} from "../../../../components/Form";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { yesNoOptions } from "../../../../constants/options";
import { SOLE_PROPRIETOR } from "../../../../constants";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";

const signatoryRightsSchema = Yup.object().shape({
  isSignatory: Yup.boolean().required("Field Is this person a signatory is not filled"),
  authorityType: Yup.string().when("isSignatory", {
    is: true,
    then: Yup.string().required(getRequiredMessage("Authority type"))
  })
});

const SignatoryRightsComponent = ({ handleContinue, index, stakeholders, updateProspect }) => {
  return (
    <Formik
      initialValues={{
        authorityType: get(stakeholders, `[${index}].accountSigningInfo.authorityType`),
        isSignatory: ""
      }}
      onSubmit={handleContinue}
      validationSchema={signatoryRightsSchema}
      validateOnChange={false}
    >
      {({ values, setFieldValue, setFieldTouched }) => (
        <Form>
          <Grid container>
            <Field
              name="isSignatory"
              path={`prospect.signatoryInfo[${index}].kycDetails.isSignatory`}
              component={InlineRadioGroup}
              options={yesNoOptions}
              label="Is this person a signatory?"
              onSelect={() => {
                if (values.isSignatory) {
                  setFieldValue("authorityType", "");
                  updateProspect({
                    [`prospect.signatoryInfo[${index}].accountSigningInfo.authorityType`]: ""
                  });
                  setFieldTouched("authorityType", false);
                }
              }}
              InputProps={{
                inputProps: { tabIndex: 0 }
              }}
            />
            <Field
              name="authorityType"
              path={`prospect.signatoryInfo[${index}].accountSigningInfo.authorityType`}
              disabled={!values.isSignatory}
              isSearchable
              component={SelectAutocomplete}
              label="Authority Type"
              datalistId="authorityType"
              contextualHelpProps={{ isDisableHoverListener: false }}
              contextualHelpText="Select the authority / document through which the stakeholder is nominated as Signatory"
              tabIndex="0"
              changeProspect={(prospect, value) => {
                if (value === SOLE_PROPRIETOR) {
                  return {
                    ...prospect,
                    [`prospect.signatoryInfo[${index}].kycDetails.isShareholder`]: true,
                    [`prospect.signatoryInfo[${index}].kycDetails.shareHoldingPercentage`]: 100
                  };
                }
                return prospect;
              }}
            />
          </Grid>

          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  stakeholders: stakeholdersSelector(state)
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryRights = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryRightsComponent);
