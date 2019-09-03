import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import DatePicker from "../InputField/DatePicker";
import CustomCheckbox from "../InputField/RefactoredCheckbox";

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
          <TextInput id="UI0255" selectId="UI0260" withSelect indexes={[0]} />
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
