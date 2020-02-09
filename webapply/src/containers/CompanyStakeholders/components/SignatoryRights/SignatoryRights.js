import React, { useState } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";

import { updateProspect } from "../../../../store/actions/appConfig";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { stakeholdersSelector } from "../../../../store/selectors/stakeholder";
import {
  InlineRadioGroup,
  SelectAutocomplete,
  AutoSaveField as Field
} from "../../../../components/Form";
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { yesNoOptions } from "../../../../constants/options";
import { UAE, SOLE_PROPRIETOR } from "../../../../constants";
import { getRequiredMessage } from "../../../../utils/getValidationMessage";

const signatoryRightsSchema = Yup.object().shape({
  isSignatory: Yup.boolean().required("Field Is this person a signatory is not filled"),
  authorityType: Yup.string().when("isSignatory", {
    is: true,
    then: Yup.string().required(getRequiredMessage("Authority type"))
  })
});

const SignatoryRightsComponent = ({
  handleContinue,
  index,
  stakeholders,
  updateProspect,
  isSoleProprietor
}) => {
  const [isProspectData, allowSetDataToProspect] = useState(true);
  if (isSoleProprietor && isProspectData) {
    updateProspect({
      [`prospect.signatoryInfo[${index}].kycDetails.isShareholder`]: true,
      [`prospect.signatoryInfo[${index}].kycDetails.shareHoldingPercentage`]: 100
    });
    allowSetDataToProspect(false);
  }
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
      {withCompanyStakeholder(index, ({ values, setFieldValue, setFieldTouched }) => (
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
              inputProps={{ tabIndex: 0 }}
            />
          </Grid>

          <SubmitButton />
        </Form>
      ))}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  stakeholders: stakeholdersSelector(state),
  isSoleProprietor:
    get(getSignatories(state)[index], "accountSigningInfo.authorityType", "") === SOLE_PROPRIETOR
});

const mapDispatchToProps = {
  updateProspect
};

export const SignatoryRights = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatoryRightsComponent);
