import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher";
import AccountBenefits from "./AccountBenefits";
import AccountingSoftware from "./AccountingSoftware";

import getVideoUrl from "../../utils/getVideoUrl";

const DetailedAccount = ({ applicationInfo }) => {
  const { accountType } = applicationInfo;
  const videoUrl = getVideoUrl(applicationInfo);

  return (
    <>
      {!accountType && <Redirect to="/AccountsComparison" />}
      <IslamicBankingSwitcher />
      <VerticalPaginationWrapper videoUrl={videoUrl}>
        <div></div>
        <AccountBenefits accountType={accountType} />
        <AccountingSoftware accountType={accountType} />
      </VerticalPaginationWrapper>
    </>
  );
};

const mapStateToProps = state => ({
  applicationInfo: appConfigSelectors.getApplicationInfo(state)
});

export default connect(mapStateToProps)(withRouter(DetailedAccount));
