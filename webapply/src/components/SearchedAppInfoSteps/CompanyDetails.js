import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  companyDetails: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    height: "60px"
  },
  title: {
    marginTop: "0px",
    color: "#373737",
    fontSize: "15px",
    alignItems: "center",
    fontWeight: "600"
  },
  errorMsg: {
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: "24px"
  }
};

const CompanyDetails = props => {
  const { classes, prospectInfo = [] } = props;

  return (
    <>
      <h4 className={classes.title}>Applicant&apos;s Detail</h4>
      {prospectInfo.applicantInfo ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.applicantInfo.email && prospectInfo.applicantInfo.email}
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.applicantInfo.countryCode &&
                prospectInfo.applicantInfo.countryCode +
                  " " +
                  (prospectInfo.applicantInfo.mobileNo && prospectInfo.applicantInfo.mobileNo)}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>Applicant details are not found</div>
      )}
      <h4 className={classes.title}>Company Detail</h4>
      {prospectInfo.organizationInfo ? (
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.organizationInfo.companyName &&
                prospectInfo.organizationInfo.companyName}
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.companyDetails}>
              {prospectInfo.organizationInfo.licenseNumber &&
                prospectInfo.organizationInfo.licenseNumber}
            </div>
          </Grid>
        </Grid>
      ) : (
        <div className={classes.errorMsg}>Company details are not found</div>
      )}
    </>
  );
};

export default withStyles(styles)(CompanyDetails);
