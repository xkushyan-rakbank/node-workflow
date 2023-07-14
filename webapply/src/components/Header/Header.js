import React, { useContext } from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";

import { LogoTypeContext } from "../../containers/FormLayout/LogoTypeProvider";
import { isOtpVerified } from "../../store/selectors/otp";
import routes from "../../routes";

import { LOGO_ELITE, LOGO_ELITE_ISLAMIC, LOGO_ISLAMIC, LOGO_STANDART } from "./constants";
import { useStyles } from "./styled";

import { ReactComponent as EliteIslamicLogo } from "../../assets/images/logo-elite-islamic.svg";
import { ReactComponent as StandartLogo } from "../../assets/images/logo-standart.svg";
import { ReactComponent as EliteLogo } from "../../assets/images/logo-elite.svg";
import { ReactComponent as IslamicLogo } from "../../assets/images/logo-islamic.svg";
import { ReactComponent as LogoSmall } from "../../assets/images/logo-small.svg";

const HeaderComponent = ({ className, isOtpVerified }) => {
  const logoType = useContext(LogoTypeContext);

  const classes = useStyles({
    logoType
  });

  //ro-assist-brd3-16
  const queryParams = useLocation().search;

  const logoClassName = cx(classes.logo, "small-menu-hide");

  return (
    <>
      <header className={cx(classes.header, className)}>
        <Link
          to={routes.accountsComparison + queryParams}
          className={cx({ [classes.disabled]: isOtpVerified })}
        >
          {(() => {
            switch (logoType) {
              case LOGO_ELITE_ISLAMIC:
                return <EliteIslamicLogo className={logoClassName} />;
              case LOGO_ELITE:
                return <EliteLogo className={logoClassName} />;
              case LOGO_ISLAMIC:
                return <IslamicLogo className={logoClassName} />;
              case LOGO_STANDART:
              default:
                return <StandartLogo className={logoClassName} />;
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
  isOtpVerified: isOtpVerified(state)
});

export const Header = connect(mapStateToProps)(HeaderComponent);
