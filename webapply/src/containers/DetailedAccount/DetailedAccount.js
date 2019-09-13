import React from "react";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import AccountBenefits from "./AccountBenefits";
import AccountingSoftware from "./AccountingSoftware";
import CustomerService from "./CustomerService";

const DetailedAccount = () => {
  return (
    <VerticalPaginationWrapper>
      <AccountBenefits />
      <AccountingSoftware />
      <CustomerService />
    </VerticalPaginationWrapper>
  );
};

export default DetailedAccount;
