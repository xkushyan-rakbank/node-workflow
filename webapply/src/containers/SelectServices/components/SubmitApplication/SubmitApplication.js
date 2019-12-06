import React, { useState } from "react";

import routes from "../../../../routes";
import { submitApplication } from "../../../../constants/index";

import { SubmitButton } from "../../../../components/Buttons/SubmitButton";
import { BackLink } from "../../../../components/Buttons/BackLink";
import { FormTitle } from "../../../../components/FormTitle";
import { CompanyCard } from "./CompanyCard";
import { BlockConfirm } from "./BlockConfirm";

export const SubmitApplicationComponent = ({
  history,
  accountInfo: [account],
  signatoryInfo,
  isAgentLoggedIn,
  applicationInfo,
  organizationInfo: { companyName }
}) => {
  const handleSubmit = () => history.push(routes.ApplicationSubmitted);
  const [isDisabledSubmit, setDisabledSubmit] = useState(true);

  return (
    <>
      <FormTitle title={submitApplication.formTitle} info={submitApplication.formInfo} />
      <CompanyCard
        companyName={companyName}
        applicationInfo={applicationInfo}
        signatoryInfo={signatoryInfo}
        account={account}
      />

      {!isAgentLoggedIn.loginStatus && <BlockConfirm handleValid={setDisabledSubmit} />}

      <div className="linkContainer">
        <BackLink path={routes.selectServices} />
        <SubmitButton
          disabled={isDisabledSubmit}
          label="Submit"
          justify="flex-end"
          handleClick={handleSubmit}
        />
      </div>
    </>
  );
};
