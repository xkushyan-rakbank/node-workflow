import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import CombinedSelect from "../InputField/CombinedSelect";
import DatePicker from "../InputField/DatePicker";
import CustomCheckbox from "../InputField/RefactoredCheckbox";

const PersonalInformation = ({ index }) => {
  return (
    <>
      <Grid item container spacing={3}>
        <Grid item sm={12} className="mb-25 mt-25">
          <CustomCheckbox id="UI0273" indexes={[index]} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <CombinedSelect
            selectId="UI0260"
            inputId="UI0255"
            indexes={[index]}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="UI0256" indexes={[index]} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput id="UI0257" indexes={[index]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <DatePicker id="UI0283" indexes={[index]} />
        </Grid>
      </Grid>
    </>
  );
};

PersonalInformation.defaultProps = {
  index: 0
};

export default PersonalInformation;
