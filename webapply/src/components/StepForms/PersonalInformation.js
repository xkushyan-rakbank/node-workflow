import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import Grid from "@material-ui/core/Grid";
import SelectCombined from "../InputField/SelectCombined";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import CombinedSelect from "../InputField/CombinedSelect";
import DatePicker from "../InputField/DatePicker";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import {
  gender as genderOptions,
  maritalStatus as maritalStatusOptions
} from "../../constants";

const PersonalInformation = () => {
  return (
    <>
      <Grid item container spacing={3}>
        <Grid item sm={12} className="mb-25 mt-25">
          <CustomCheckbox id="UI0273" indexes={[0]} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <CombinedSelect selectId="UI0260" inputId="UI0255" indexes={[0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="UI0256" />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput id="UI0257" />
        </Grid>
        <Grid item md={6} sm={12}>
          <DatePicker id="UI0283" />
        </Grid>
      </Grid>
    </>
  );
};

export default PersonalInformation;
