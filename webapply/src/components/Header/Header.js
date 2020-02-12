import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, useHistory } from "react-router-dom";
import cx from "classnames";

import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { isOtpVerified } from "../../store/selectors/otp";
import routes from "../../routes";
import { useStyles } from "./styled";
import { useIconsByAccount } from "../../utils/useIconsByAccount";
import { accountNames } from "../../constants";
import { ReactComponent as EliteIslamicLogo } from "../../assets/images/logo-elite-islamic.svg";
import { ReactComponent as StandartLogo } from "../../assets/images/logo-standart.svg";

const HeaderComponent = ({ isIslamicBanking, accountType, isOtpVerified }) => {
  const classes = useStyles();
  const {
    location: { pathname }
  } = useHistory();
  const { logo: Logo } = useIconsByAccount();

  const renderLogo = () => {
    if (routes.accountsComparison === pathname) return <StandartLogo className={classes.logo} />;
    if (isIslamicBanking && accountType === accountNames.elite)
      return <EliteIslamicLogo className={classes.logo} />;
    return <Logo className={classes.logo} />;
  };

  return (
    <header className={classes.header}>
      <Link to={routes.accountsComparison} className={cx({ [classes.disabled]: isOtpVerified })}>
        {renderLogo()}
      </Link>
    </header>
  );
};

const mapStateToProps = state => ({
  isIslamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  isOtpVerified: isOtpVerified(state)
});

export const Header = compose(connect(mapStateToProps))(HeaderComponent);
