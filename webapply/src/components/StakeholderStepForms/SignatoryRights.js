import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/Select";
import {
  personSignatory as personSignatoryOptions,
  authorityType as authorityTypeOptions
} from "../../constants";

const SignatoryRights = () => {
  const [personSignatory, setPersonSignatory] = useState(
    personSignatoryOptions[0].value
  );
  const [authorityType, setAuthorityType] = useState();
  const changePersonSignatory = event => setPersonSignatory(event.target.value);
  const changeAuthorityType = event => setAuthorityType(event.target.value);
  return (
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <Select
          name="personSignatory"
          label="Is this person a signatory?"
          options={personSignatoryOptions}
          value={personSignatory}
          onChange={changePersonSignatory}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Select
          name="maritalStatus"
          label="Marital Status"
          options={authorityTypeOptions}
          value={authorityType}
          onChange={changeAuthorityType}
        />
      </Grid>
    </Grid>
  );
};

export default SignatoryRights;
