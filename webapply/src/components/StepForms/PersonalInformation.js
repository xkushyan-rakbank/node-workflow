import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import SelectCombined from "../InputField/SelectCombined";
import TextInput from "../InputField/Input";
import Select from "../InputField/Select";
import {
  gender as genderOptions,
  maritalStatus as maritalStatusOptions
} from "../../constants";

const PersonalInformation = () => {
  const [gender, setGender] = useState(genderOptions[0].value);
  const [maritalStatus, setMaritalStatus] = useState();
  const changeGender = event => setGender(event.target.value);
  const changeMaritalStatus = event => setMaritalStatus(event.target.value);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <FormGroup className="selectCombined">
            <SelectCombined
              options={genderOptions}
              value={gender}
              onChange={changeGender}
            />
            <TextInput
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
          </FormGroup>
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            name="middleName"
            label="Middle Name (Optional)"
            placeholder="Middle Name (Optional)"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            name="lastName"
            label="Last Name"
            placeholder="Last Name"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            name="dateOfBirth"
            label="Date Of Birth"
            placeholder="Date Of Birth"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <Select
            name="maritalStatus"
            label="Marital Status"
            options={maritalStatusOptions}
            value={maritalStatus}
            onChange={changeMaritalStatus}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            name="mothersMaidenName"
            label="Mother's maiden name"
            placeholder="Mother's maiden name"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformation;
