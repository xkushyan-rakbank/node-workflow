import React, { useState } from "react";

import routes from "../../../../routes";
import { submitApplication } from "../../../../constants/index";

import { BackLink } from "../../../../components/Buttons/BackLink";
import { FormTitle } from "../../../../components/FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";
import { SubmitButton } from "../../../../components/Buttons/SubmitButton";

export const SubmitApplicationComponent = ({
  history,
  accountInfo: [account],
  signatoryInfo,
  isAgentLoggedIn,
  applicationInfo,
  organizationInfo: { companyName }
}) => {
  const handleSubmit = () => history.push(routes.ApplicationSubmitted);
  const [formFieldsValues, setFormFields] = useState({});

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      {!isAgentLoggedIn.loginStatus && <BlockConfirm setFormFields={setFormFields} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={!(formFieldsValues.isInformationProvided && formFieldsValues.areTermsAgreed)}
          label="Submit"
          justify="flex-end"
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};
