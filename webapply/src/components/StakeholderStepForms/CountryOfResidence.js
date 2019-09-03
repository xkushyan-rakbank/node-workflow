import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/Select";
import Input from "../InputField/Input";
import { countryOfResidence as countryOfResidenceOptions } from "../../constants";

const CountryOfResidence = () => {
  const [countryOfResidence, setCountryOfResidence] = useState(
    countryOfResidenceOptions[0].value
  );
  const [emiratesID, setEmiratesID] = useState();
  const changeCountryOfResidence = event =>
    setCountryOfResidence(event.target.value);
  return (
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <Select
          name="countryOfResidence"
          label="Country of Residence"
          options={countryOfResidenceOptions}
          value={countryOfResidence}
          onChange={changeCountryOfResidence}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Input
          name="emiratesID"
          label="Emirates ID"
          placeholder="Emirates ID"
          value={emiratesID}
          onChange={setEmiratesID}
        />
      </Grid>
    </Grid>
  );
};

export default CountryOfResidence;
