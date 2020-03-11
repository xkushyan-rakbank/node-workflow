import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";

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
      {prospectOverview.organizationInfo &&
      get(prospectOverview, "organizationInfo.companyName") !== "" ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectOverview.organizationInfo.companyName}
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectOverview.organizationInfo.licenseNumber}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.COMPANY_DETAIL_ERROR}</div>
      )}
    </>
  );
};
