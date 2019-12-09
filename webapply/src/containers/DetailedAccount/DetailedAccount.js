import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as appConfigSelectors from "../../store/selectors/appConfig";
import VerticalPaginationWrapper from "../../components/VerticalPaginationWrapper";
import IslamicBankingSwitcher from "../../components/IslamicBankingSwitcher/IslamicBankingSwitcher";
import AccountBenefits from "./AccountBenefits";
import { AccountingSoftware } from "./AccountingSoftware";

import getVideoUrl from "../../utils/getVideoUrl";
import routes from "../../routes";

const DetailedAccount = ({ applicationInfo }) => {
  const { accountType } = applicationInfo;

  let videoUrl, posterUrl;
  if (Object.keys(applicationInfo).length && accountType.length) {
    videoUrl = getVideoUrl(applicationInfo).videoUrl;
    posterUrl = getVideoUrl(applicationInfo).posterUrl;
  }

  return (
    <>
      {!accountType && <Redirect to={routes.accountsComparison} />}
      <div className="hide-on-mobile">
        <IslamicBankingSwitcher />
      </div>
      <VerticalPaginationWrapper videoUrl={videoUrl} posterUrl={posterUrl}>
        <div />
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
