import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  companyDetails: {
    fontSize: "14px",
    lineHeight: 1.33,
    color: "#86868b",
    height: "60px"
  }
};

const CompanyDetails = props => {
  const { classes } = props;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>Abc Company Name</div>
        </Grid>
        <Grid item md={6} sm={12}>
          <div className={classes.companyDetails}>Raktrack Lead Number</div>
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(CompanyDetails);
