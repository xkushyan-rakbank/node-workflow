import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher";
import AccountBenefits from "./AccountBenefits";
import AccountingSoftware from "./AccountingSoftware";
import CustomerService from "./CustomerService";

const DetailedAccount = ({ applicationInfo = {} }) => {
  const { accountType } = applicationInfo;
  return (
    <>
      {!accountType && <Redirect to="/AccountsComparison" />}
      <IslamicBankingSwitcher />
      <VerticalPaginationWrapper>
        <AccountBenefits />
        <AccountingSoftware />
        <CustomerService />
      </VerticalPaginationWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: state.appConfig.prospect.applicationInfo
});

export default connect(mapStateToProps)(DetailedAccount);
