import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as appConfigSelectors from "../../store/selectors/appConfig";

import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher";
import AccountBenefits from "./AccountBenefits";
import AccountingSoftware from "./AccountingSoftware";
import CustomerService from "./CustomerService";

import getVideoUrl from "../../utils/getVideoUrl";

const DetailedAccount = props => {
  const videoUrl = getVideoUrl(props.applicationInfo);

  return (
    <>
      <IslamicBankingSwitcher />
      <VerticalPaginationWrapper videoUrl={videoUrl}>
        <div></div>
        <AccountBenefits />
        <AccountingSoftware />
        <CustomerService />
      </VerticalPaginationWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default connect(mapStateToProps)(withRouter(DetailedAccount));
