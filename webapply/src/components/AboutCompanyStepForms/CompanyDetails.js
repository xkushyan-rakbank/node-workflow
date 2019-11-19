import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

export const CompanyDetails = () => (
  <>
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <TextInput
          id="Org.companyName"
          withContexualHelp
          placement="right"
          contexualHelpText="if the Company's name is more than 30 characters long, than an abbreviation needs to be entered and that this abbreviation will appear in all Bank records including Cheque Books."
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <PureSelect id="Okyc.companyCategory" />
      </Grid>
    </Grid>
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <TextInput id="Org.vatRegistrationNumber" />
      </Grid>
      <Grid item md={6} sm={12}>
        <TextInput id="Org.numberOfEmployees" />
      </Grid>
    </Grid>
  </>
);
