/* eslint-disable max-len */
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import cx from "classnames";
import { Button, Container } from "@material-ui/core";
import { AccountCard } from "../AccountCard";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
import { accountsInfo } from "../../../../components/FormNavigation/AccountInfo/constants";
import { ReactComponent as BgBlob } from "../../../../assets/images/bg-blobs/bg-blob.svg";
import { landingVideo } from "../../../../constants/videos";
import StandardLogo from "../../../../assets/images/logo-standart.svg";
import StandardRedLogo from "../../../../assets/images/logo-red.svg";
import { featuresDataList, feesChargesDataRows, perksDataRows } from "../../constants";
import { AccountFeatureListing } from "./AccountFeatureListing";
import routes, { smeBaseName } from "../../../../routes";
import { ExpandMoreButton } from "../../../QuickapplyLanding/components/LandingVideoPlayer/ExpandMoreButton";
import { sendGoogleAnalyticsMetrics } from "../../../../store/actions/googleAnalytics";
import { GA_EVENTS } from "../../../../utils/ga";
import { useBlobColor } from "../../../../utils/useBlobColor/useBlobColor";

import { COMPARED_ACCOUNTS_TYPES } from "../TableCompare/components/StyledTableBodyMobile/constants";
import { useStyles } from "./styled";

export const AccountsComparisonComponent = ({ handleSetAccountType, servicePricingGuideUrl }) => {
  const blobColor = useBlobColor();
  const classes = useStyles({
    color: blobColor
  });
  const pushHistory = useTrackingHistory();
  const dispatch = useDispatch();
  const history = useHistory();

  const [mobileAccounts, setMobileAccounts] = useState(COMPARED_ACCOUNTS_TYPES.starter);

  const [isAccountTypeSticky, setIsAccountTypeSticky] = useState(false);

  const [isFullyScrolled, setIsFullyScrolled] = useState(false);

  const accountTypeRef = useRef(null);
  const businessButton = useRef(null);
  const [accountNavTop, setAccountNavTop] = useState(0);
  const [accountNavLeft, setAccountNavLeft] = useState(0);
  const [accountNavHeight, setAccountNavHeight] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
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
  useLayoutEffect(() => {
    const accountTypeDiv = accountTypeRef?.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsAccountTypeSticky(e.intersectionRatio < 1);
      },
      { threshold: 1 }
    );
    observer.observe(accountTypeDiv);
    // clean up the observer
    return () => {
      observer.unobserve(accountTypeDiv);
    };
  }, [accountTypeRef]);

  useLayoutEffect(() => {
    const businessButtonref = businessButton?.current;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio === 0) {
          document.body.classList.remove("no-scroll");
        }
      },
      { threshold: 1 }
    );
    observer.observe(businessButtonref);
    // clean up the observer
    return () => {
      observer.unobserve(businessButtonref);
    };
  }, [businessButton]);

  useEffect(() => {
    checkIfScrolled();
    window.addEventListener("scroll", checkIfScrolled);

    return () => {
      window.removeEventListener("scroll", checkIfScrolled);
    };
  });

  const handleRedirection = path => {
    pushHistory(path);
  };

  const queryParams = useLocation().search;

  const handleClick = () => {
    /**
     * overwrite current entry in history to store the scroll position
     * so that on navagition back it comes back to this state
     * */

    let stateData = {
      path: window.location.href,
      scrollTop: 0
    };
    window.history.pushState(stateData, "");

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
        className={cx(classes.bgContainer)}
        // style={{ backgroundImage: `url(${landingVideo.poster})` }}
      >
        <div className={classes.blobMobile}></div>
        <video
          muted={true}
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
          <div className={classes.navOutline}>
            <Button
              variant="outlined"
              className={classes.navButton}
              onClick={() => handleRedirection(routes.comeBackLogin)}
            >
              Track my Application
            </Button>
            {/* <Button variant="outlined" className={classes.navButton}>
              Switch to RAKIslamic
            </Button> */}
          </div>
        </div>

        <div className={classes.accountInfoMain}>
          <h2>Let’s get down to business</h2>
          <p>How can we help you?</p>
          <div className={classes.btnWrapper} id="businessAccountButton" ref={businessButton}>
            <div onClick={handleClick}>
              <ExpandMoreButton label="Business Account" className={classes.accountBtn} />
            </div>
            <div
              onClick={() =>
                redirectInToFinance(process.env.REACT_APP_BAU_URL + smeBaseName + "/finances")
              }
            >
              <ExpandMoreButton label="Business Finance" className={classes.accountBtn} />
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
            mobileAccounts={mobileAccounts}
            onChangeMobileAccounts={newComparisonData => setMobileAccounts(newComparisonData)}
          />
        </div>
        <AccountFeatureListing
          title={"Features"}
          featureData={featuresDataList}
          mobileAccountsData={mobileAccounts}
        />
        <AccountFeatureListing
          title={"Perks"}
          featureData={perksDataRows}
          mobileAccountsData={mobileAccounts}
        />
        <AccountFeatureListing
          title={"Fees & charges"}
          featureData={feesChargesDataRows}
          mobileAccountsData={mobileAccounts}
        />
        <div className={classes.featureDataInfo}>
          <div className={classes.featureInfo}>
            <p>*Waiver only applies to RAKBANK charges.</p>
            <p>
              **Services are part of RAKValue SME PLUS and MAX Packages. Please refer to the{" "}
              <a target="_blank" rel="noopener noreferrer" href={servicePricingGuideUrl}>
                Service & Price guide.
              </a>
            </p>
          </div>
          <br />
          <div>
            <p>For RAKstarter and Business Current Account customers:</p>
            <ul>
              <li>
                {
                  "If the monthly average credit balance is greater than or equal to AED 250,000.00 the monthly maintenance fee will be waived, but the Digital Banking fee will apply."
                }
              </li>
              <li>
                {
                  "If the monthly average credit balance is less than AED 250,000.00 the monthly maintenance fee will apply, but the Digital Banking fee will be waived."
                }
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.featureInfo}>
          <p>
            Note: The above charges include 5% VAT. For additional details, please see our&nbsp;
            <a target="_blank" rel="noopener noreferrer" href={servicePricingGuideUrl}>
              Service & Price guide.
            </a>
          </p>
        </div>
      </Container>
    </>
  );
};
