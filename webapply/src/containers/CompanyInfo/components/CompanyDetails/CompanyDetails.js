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

  function makeDecisionCall(value) {
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
        makeDecisionCall("2_SPLL");
        dispatch(
          updateProspect({
            "prospect.organizationInfo.companyCategory": "SLLC"
          })
        );
      } else {
        setFieldValue("companyCategory", "1_SP");
        makeDecisionCall("1_SP");
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
        contextualHelpText="The company name given here will appear in all Bank records including Cheque Books. If the Company's name in Trade License is more than 50 characters long (including space), then an abbreviation can be used. Example If the company name is 'Airlift Global Automation and Heavy Equipment Rental LLC', mention the company name as 'Airlift Global Automation H E R'"
        fieldDescription="This should be the same as shown on your trade licence.                            "
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
