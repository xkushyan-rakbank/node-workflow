import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";
import {
  MAX_COMPANY_FULL_NAME_LENGTH,
  MAX_COMPANY_SHORT_NAME_LENGTH,
  REGEX_LLC_PATTERN
} from "../../constants";
import { updateProspect } from "../../../../store/actions/appConfig";
import { triggerDecisions } from "../../../../store/actions/decisions";
import { getApplicantInfo } from "../../../../store/selectors/appConfig";

export const CompanyDetails = ({ setFieldValue }) => {
  const dispatch = useDispatch();
  const applicantInfo = useSelector(getApplicantInfo);

  const [loadedPersona, setLoadedPersona] = useState(null);

  useEffect(() => {
    setLoadedPersona(applicantInfo.persona);
  }, []);

  function triggerDecisionsForCompanyCategory(value) {
    dispatch(
      triggerDecisions({
        onValuesChanged: changedValues => {},
        inputFields: {
          decision_input: [
            {
              input_key: "prospect.organizationInfo.companyCategory",
              input_value: value
            }
          ]
        }
      })
    );
  }

  function handleBlur(ev) {
    const { value } = ev.target;
    if (loadedPersona === "SOLE") {
      if (value.trim().match(REGEX_LLC_PATTERN)) {
        setFieldValue("companyCategory", "2_SPLL");
        triggerDecisionsForCompanyCategory("2_SPLL");
        dispatch(
          updateProspect({
            "prospect.organizationInfo.companyCategory": "SLLC"
          })
        );
      } else {
        setFieldValue("companyCategory", "1_SP");
        triggerDecisionsForCompanyCategory("1_SP");
        dispatch(
          updateProspect({
            "prospect.organizationInfo.companyCategory": "SOLE"
          })
        );
      }
    }
  }

  return (
    <>
      <Field
        name="companyName"
        label="Company’s full name"
        path="prospect.organizationInfo.companyName"
        fieldDescription="This should be the same as shown on your trade licence."
        component={Input}
        onBlur={handleBlur}
        InputProps={{
          inputProps: { maxLength: MAX_COMPANY_FULL_NAME_LENGTH, tabIndex: 0 },
          onBlur: handleBlur
        }}
      />
      <Field
        name="shortName"
        label="Shortened company name"
        path="prospect.organizationInfo.shortName"
        fieldDescription="To keep things simple, we'll use this shortened name for the account and chequebook.                     "
        component={Input}
        InputProps={{
          inputProps: { maxLength: MAX_COMPANY_SHORT_NAME_LENGTH, tabIndex: 0 }
        }}
      />
      <Field
        name="companyCategory"
        label="Company category"
        path="prospect.organizationInfo.companyCategory"
        datalistId="companyCategory"
        isSearchable
        component={SelectAutocomplete}
        tabIndex="0"
      />
    </>
  );
};
