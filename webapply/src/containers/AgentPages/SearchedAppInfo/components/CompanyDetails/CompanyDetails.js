import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { titles, errorMsgs } from "./constants";

import { useStyles } from "./styled";

export const CompanyDetails = ({ prospectOverview = {}, searchResult }) => {
  const classes = useStyles();

  return (
    <>
      <h4 className={classes.title}>{titles.APPLICANT_DETAIL_TITLE}</h4>
      {prospectOverview.applicantInfo ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>{prospectOverview.applicantInfo.email}</div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {`${get(prospectOverview, "applicantInfo.countryCode", "")} ${get(
                prospectOverview,
                "applicantInfo.mobileNo",
                ""
              )}`}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.APPLICANT_DETAIL_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.RAKTRACK_LEAD_REFERENCE_TITLE}</h4>
      {get(searchResult, "organizationInfo.leadNumber") ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>{searchResult.organizationInfo.leadNumber}</div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.RAKTRACK_LEAD_REFERENCE_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.COMPANY_DETAIL_TITLE}</h4>
      {get(prospectOverview, "organizationInfo.companyName") ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={cx(classes.companyDetails, classes.companyNameColumn)}>
              {prospectOverview.organizationInfo.companyName}
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectOverview.organizationInfo.licenseOrCOINumber}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.COMPANY_DETAIL_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.PARTNER_CODE_TITLE}</h4>
      {get(prospectOverview, "applicantInfo.allianceCode") ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectOverview.applicantInfo.allianceCode}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.PARTNER_CODE_ERROR}</div>
      )}
    </>
  );
};
