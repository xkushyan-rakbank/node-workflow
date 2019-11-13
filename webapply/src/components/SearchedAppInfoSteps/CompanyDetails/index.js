import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styled";
import { titles, errorMsgs } from "./constants";

const CompanyDetails = ({ classes, prospectInfo = {} }) => {
  const contactNo = `${get(prospectInfo, "applicantInfo.countryCode", "")} 
  ${get(prospectInfo, "applicantInfo.mobileNo", "")}`;

  return (
    <>
      <h4 className={classes.title}>{titles.APPLICANT_DETAIL_TITLE}</h4>
      {prospectInfo.applicantInfo ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>{prospectInfo.applicantInfo.email}</div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>{contactNo}</div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.APPLICANT_DETAIL_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.RAKTRACK_LEAD_REFERENCE_TITLE}</h4>
      {get(prospectInfo, "organizationInfo.leadNumber") ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>{prospectInfo.organizationInfo.leadNumber}</div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.RAKTRACK_LEAD_REFERENCE_ERROR}</div>
      )}
      <h4 className={classes.title}>{titles.COMPANY_DETAIL_TITLE}</h4>
      {prospectInfo.organizationInfo ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.organizationInfo.companyName}
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.organizationInfo.licenseNumber}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>{errorMsgs.COMPANY_DETAIL_ERROR}</div>
      )}
    </>
  );
};

export default withStyles(styles)(CompanyDetails);
