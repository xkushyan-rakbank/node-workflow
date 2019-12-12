import React from "react";

import { OTPform } from "../../components/OTPform";

import routes from "../../routes";

export const FormConfirm = () => {
  return (
    <>
      <h2>Confirm It’s You</h2>
      <OTPform redirectRoute={routes.companyInfo} />
    </>
  );
};
