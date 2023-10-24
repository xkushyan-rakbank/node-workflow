import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Input, AutoSaveField as Field, SelectAutocomplete } from "../../../../components/Form";
import { MAX_COMPANY_FULL_NAME_LENGTH, REGEX_LLC_PATTERN } from "../../constants";
import { updateProspect } from "../../../../store/actions/appConfig";
import { triggerDecisions } from "../../../../store/actions/decisions";
import { getApplicantInfo, getCompanyDocuments } from "../../../../store/selectors/appConfig";
import { ConfirmDialog } from "../../../../components/Modals";
import useRedirectionUrl from "../../../../utils/useRedirectionUrl";
import useDecisions from "../../../../utils/useDecisions";

export const CompanyDetails = ({ setFieldValue, setTouched, touched, values }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [loadedPersona, setLoadedPersona] = useState(null);
  const dispatch = useDispatch();
  const applicantInfo = useSelector(getApplicantInfo);
  const { redirectToExternalURL } = useRedirectionUrl();

  const companyDocuments = useSelector(getCompanyDocuments) || [];
  const { visible: moaVisible } = useDecisions("prospect.prospectDocuments.companyDocument.moa");

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
    if (loadedPersona === "SP") {
      if (value.trim().match(REGEX_LLC_PATTERN)) {
        setFieldValue("companyCategory", "SLLC");
        triggerDecisionsForCompanyCategory("SLLC");
        dispatch(
          updateProspect({
            "prospect.organizationInfo.companyCategory": "SLLC"
          })
        );
      } else {
        setFieldValue("companyCategory", "SOLE");
        triggerDecisionsForCompanyCategory("SOLE");
        dispatch(
          updateProspect({
            "prospect.organizationInfo.companyCategory": "SOLE"
          })
        );
      }
    }
  }

  const removeMoaDoc = async () => {
    const path = "prospect.prospectDocuments.companyDocument.moa";
    const updatedCompanyDocs = companyDocuments.filter(eachDoc => eachDoc.documentKey !== path);
    dispatch(
      updateProspect({
        "prospect.documents.companyDocuments": updatedCompanyDocs
      })
    );
    setTouched({ ...touched, ...{ moa: false } });
    await setFieldValue("moa", null);
    dispatch(updateProspect([path], null));
  };

  useEffect(() => {
    if (!moaVisible) {
      removeMoaDoc();
    }
  }, [moaVisible, dispatch]);

  const onChange = (value, renderValue) => {
    if (value === "OTHER") {
      setIsOpen(true);
      setMessage(renderValue.displayText);
    } else {
      setFieldValue("companyCategory", value);
      triggerDecisionsForCompanyCategory(value);
    }
  };

  function redirectToUrl(externalURL) {
    const url = redirectToExternalURL(externalURL);
    window.location.href = url;
  }

  return (
    <>
      <Field
        name="companyName"
        label="Company’s full name"
        path="prospect.organizationInfo.companyName"
        fieldDescription="This should be the same as shown on your trade license."
        component={Input}
        // onBlur={handleBlur}
        InputProps={{
          inputProps: { maxLength: MAX_COMPANY_FULL_NAME_LENGTH, tabIndex: 0 },
          onBlur: handleBlur
        }}
      />
      <Field
        name="companyCategory"
        label="Company category"
        path="prospect.organizationInfo.companyCategory"
        datalistId="companyCategory"
        isSearchable
        onChange={onChange}
        component={SelectAutocomplete}
        tabIndex="0"
      />

      <ConfirmDialog
        title={"Are you sure?"}
        isOpen={isOpen}
        handleConfirm={() =>
          redirectToUrl(process.env.REACT_APP_BAU_URL + "/business/applicantinfo-redirect")
        }
        handleReject={() => {}}
        handleClose={() => setIsOpen(false)}
        // eslint-disable-next-line max-len
        message={`Are you sure the company category is not ${message}? On Confirmation, the journey will be restarted. Do you want to continue?`}
      />
    </>
  );
};
