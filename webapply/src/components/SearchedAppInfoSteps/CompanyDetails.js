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
  }
};

const CompanyDetails = props => {
  const { classes } = props;
  return (
    <>
      <h4 className={classes.title}>Applicant&apos;s Deatil</h4>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>abcd@gmail.com</div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>456734567</div>
        </Grid>
      </Grid>
      <h4 className={classes.title}>Company Detail</h4>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>Abc Company Name</div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>Trade Licence Number</div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CompanyDetails);
