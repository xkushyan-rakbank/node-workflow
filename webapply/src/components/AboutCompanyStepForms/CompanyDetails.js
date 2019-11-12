import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { contexualHelpMessages } from "./../../constants/index";

const CompanyDetails = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="Org.companyName"
            withContexualHelp
            placement="right"
            contexualHelpText={contexualHelpMessages.companyName}
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
};

export default CompanyDetails;
