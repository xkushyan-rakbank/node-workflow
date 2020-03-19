import React from "react";
import { CompanyStakeholdersScreen } from "./CompanyStakeholders";
import { FullNameCompanyStakeholdersProvider } from "./components/FullNameProvider/FullNameProvider";

const CompanyStakeholders = () => (
  <FullNameCompanyStakeholdersProvider>
    <CompanyStakeholdersScreen />
  </FullNameCompanyStakeholdersProvider>
);

export default CompanyStakeholders;
