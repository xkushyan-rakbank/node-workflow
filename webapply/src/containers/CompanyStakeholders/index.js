import React from "react";
import { CompanyStakeholdersScreen } from "./CompanyStakeholders";
import { StakeholdersNameProvider } from "./components/StakeholdersNameProvider/StakeholdersNameProvider";

const CompanyStakeholders = () => (
  <StakeholdersNameProvider>
    <CompanyStakeholdersScreen />
  </StakeholdersNameProvider>
);

export default CompanyStakeholders;
