import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import cx from "classnames";

import { getAccountType, getIsIslamicBanking } from "../../store/selectors/appConfig";
import { isOtpVerified } from "../../store/selectors/otp";
import routes from "../../routes";
import { useStyles } from "./styled";
import { accountNames } from "../../constants";
import { ReactComponent as EliteIslamicLogo } from "../../assets/images/logo-elite-islamic.svg";
import { ReactComponent as StandartLogo } from "../../assets/images/logo-standart.svg";
import { ReactComponent as EliteLogo } from "../../assets/images/logo-elite.svg";
import { ReactComponent as IslamicLogo } from "../../assets/images/logo-islamic.svg";
import { ReactComponent as LogoSmall } from "../../assets/images/logo-small.svg";
import { LOGO_ELITE, LOGO_ELITE_ISLAMIC, LOGO_ISLAMIC, LOGO_STANDART } from "./constants";

const HeaderComponent = ({ className, isIslamicBanking, accountType, isOtpVerified }) => {
  const {
    location: { pathname }
  } = useHistory();

  const logoType = (() => {
    const isAccountsComparison = routes.accountsComparison === pathname;
    if (!isAccountsComparison && accountType === accountNames.elite && isIslamicBanking)
      return LOGO_ELITE_ISLAMIC;
    if (!isAccountsComparison && accountType === accountNames.elite) return LOGO_ELITE;
    if (!isAccountsComparison && isIslamicBanking) return LOGO_ISLAMIC;
    return LOGO_STANDART;
  })();

  const classes = useStyles({
    logoType
  });

  return (
    <>
      <header className={cx(classes.header, "small-menu-hide", className)}>
        <Link to={routes.accountsComparison} className={cx({ [classes.disabled]: isOtpVerified })}>
          {(() => {
            switch (logoType) {
              case LOGO_ELITE_ISLAMIC:
                return <EliteIslamicLogo className={classes.logo} />;
              case LOGO_ELITE:
                return <EliteLogo className={classes.logo} />;
              case LOGO_ISLAMIC:
                return <IslamicLogo className={classes.logo} />;
              case LOGO_STANDART:
              default:
                return <StandartLogo className={classes.logo} />;
            }
          })()}
        </Link>
      </header>
      <header className={cx(classes.header, "small-menu-show", className)}>
        <LogoSmall />
      </header>
    </>
  );
};

const mapStateToProps = state => ({
  isIslamicBanking: getIsIslamicBanking(state),
  accountType: getAccountType(state),
  isOtpVerified: isOtpVerified(state)
});

export const Header = connect(mapStateToProps)(HeaderComponent);
