import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import DatePicker from "../InputField/DatePicker";

const LicenseInformation = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput id="Org.licenseNumber" />
        </Grid>
        <Grid item md={6} sm={12}>
          <DatePicker id="Org.licenseIssueDate" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="Org.licenseIssuingAuthority" />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect id="Org.countryOfIncorporation" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <DatePicker id="Org.dateOfIncorporation" />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="Okyc.yearsInBusiness" />
        </Grid>
      </Grid>
    </>
  );
};

export default LicenseInformation;
