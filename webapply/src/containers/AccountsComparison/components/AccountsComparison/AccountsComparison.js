/* eslint-disable max-len */
import React, { useContext, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import cx from "classnames";
import { AccountCard } from "../AccountCard";
import { useStyles } from "./styled";
import { Button, Container } from "@material-ui/core";
import { getAccountType } from "../../../../store/selectors/appConfig";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { ISLAMIC, detailedAccountRoutesMap } from "../../../../constants";
import { accountsInfo } from "../../../../components/FormNavigation/AccountInfo/constants";
import { ReactComponent as BgBlob } from "../../../../assets/images/bg-blobs/bg-blob.svg";
import { landingVideo } from "../../../../constants/videos";
import StandardLogo from "../../../../assets/images/logo-standart.svg";
import StandardRedLogo from "../../../../assets/images/logo-red.svg";
import { featuresDataRows, feesChargesDataRows, perksDataRows } from "../../constants";
import { AccountFeatureListing } from "./AccountFeatureListing";
import routes, { smeBaseName } from "../../../../routes";
import { ExpandMoreButton } from "../../../QuickapplyLanding/components/LandingVideoPlayer/ExpandMoreButton";
import { sendGoogleAnalyticsMetrics } from "../../../../store/actions/googleAnalytics";
import { GA_EVENTS } from "../../../../utils/ga";

export const AccountsComparisonComponent = ({ handleSetAccountType, servicePricingGuideUrl }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isAccountTypeSticky, setIsAccountTypeSticky] = useState(false);

  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  const accountTypeRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.scrollY === 0) {
      document.body.classList.add("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const checkIfScrolled = () => {
    if (window.scrollY >= window.innerHeight - 40) {
      setIsFullyScrolled(true);
    } else {
      setIsFullyScrolled(false);
    }
  };
  useEffect(() => {
    const accountTypeDiv = accountTypeRef?.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsAccountTypeSticky(e.intersectionRatio < 1);
      },
      { threshold: 1 }
    );
    if (accountTypeDiv) {
      observer.observe(accountTypeDiv);
    }
    // clean up the observer
    return () => {
      observer.unobserve(accountTypeDiv);
    };
  }, [accountTypeRef]);

  useEffect(() => {
    checkIfScrolled();
    window.addEventListener("scroll", checkIfScrolled);
  });

  const handleRedirection = path => {
    pushHistory(path);
  };

  const queryParams = useLocation().search;

  const handleClick = () => {
    document.body.classList.remove("no-scroll");
    accountTypeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    dispatch(sendGoogleAnalyticsMetrics(GA_EVENTS.LANDING_PAGE_ACCOUNT_CHOSEN));
  };

  const redirectInToFinance = url => {
    dispatch(sendGoogleAnalyticsMetrics(GA_EVENTS.LANDING_PAGE_FINANCE_CHOSEN));
    if (queryParams) {
      window.location.href = url + queryParams;
    } else {
      window.location.href = url;
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{"Quick Apply | Online Application for Business Accounts | RAKBANK"}</title>
        </Helmet>
      </HelmetProvider>
      <div
        className={classes.bgContainer}
        style={{ backgroundImage: `url(${landingVideo.poster})` }}
      >
        <video
          muted
          id="video-background"
          className={classes.videoBg}
          key={landingVideo.mp4}
          poster={landingVideo.poster}
          playsInline
          autoPlay
          loop
        >
          <source src={landingVideo.webm} type="video/webm" />
          <source src={landingVideo.mp4} type="video/mp4" />
        </video>
        <BgBlob className={classes.blob} />
        <nav
          className={cx(
            classes.accountInfoNav,
            isFullyScrolled && isAccountTypeSticky ? classes.accountInfoNavScrolled : ""
          )}
        >
          <div className={classes.accountInfoNavLinks}>
            <Link to={routes.quickapplyLanding + queryParams}>
              <img
                src={isFullyScrolled ? StandardRedLogo : StandardLogo}
                alt="logo"
                className={classes.logo}
              />
            </Link>
            <div className={classes.trackNSwitchAccountBtnWrapper}>
              <Button
                variant="outlined"
                className={cx(
                  classes.trackNSwitchAccountBtn,
                  isFullyScrolled ? classes.black : classes.white
                )}
                onClick={() => handleRedirection(routes.comeBackLogin)}
              >
                Track my application
              </Button>
              {/* <Button
                variant="outlined"
                className={cx(
                  classes.trackNSwitchAccountBtn,
                  isScrollPast800 ? classes.black : classes.white
                )}
                onClick={() =>
                  handleRedirection(detailedAccountRoutesMap[accountType][ISLAMIC] + queryParams)
                }
              >
                Switch to RAKislamic
              </Button> */}
            </div>
          </div>
        </nav>
        <div className={classes.accountsInfoBannerContentWrapper}>
          <h2>{accountsInfo.landingPage.title}</h2>
          <img
            alt=""
            className={cx(classes.sectionTitleImg)}
            src={accountsInfo.landingPage.image}
          />
          <p>{accountsInfo.landingPage.subtitle}</p>
        </div>
        <div className={classes.accountInfoMain}>
          <h2>Let’s get down to business</h2>
          <p>How can we help you?</p>
          <div className={classes.btnWrapper}>
            <div onClick={handleClick}>
              <ExpandMoreButton label="Business Account" className={classes.accountBtn} />
            </div>
            <div
              onClick={() =>
                redirectInToFinance(process.env.REACT_APP_API_PATH + smeBaseName + "/finances")
              }
            >
              <ExpandMoreButton
                label="Business Finance"
                className={classes.accountBtn}
                style={{ backgroundColor: "#252525" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Container maxWidth="md" className={classes.mainWrapper}>
        <div
          ref={accountTypeRef}
          className={cx(classes.landingPageHeader, !isAccountTypeSticky ? classes.withPadding : "")}
        >
          <h3>Whatever the size of your business, we’ve got the account for you</h3>
          <p>Available for conventional or Islamic banking.</p>
        </div>
        <div className={classes.stickyDiv}>
          <AccountCard
            handleSetAccountType={handleSetAccountType}
            accountSticky={isAccountTypeSticky}
          />
        </div>
        <AccountFeatureListing title={"Features"} featureData={featuresDataRows} />
        <AccountFeatureListing title={"Perks"} featureData={perksDataRows} />
        <AccountFeatureListing title={"Fees & charges"} featureData={feesChargesDataRows} />
        <div className={classes.featureInfo}>
          <p>Note: 5% VAT will be added to all applicable fees for business customers.</p>
          <p>
            See our{" "}
            <a target="_blank" rel="noopener noreferrer" href={servicePricingGuideUrl}>
              Service & Price guide.
            </a>
          </p>
        </div>
      </Container>
    </>
  );
};
