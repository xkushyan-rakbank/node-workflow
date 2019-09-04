import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import PureSelect from "../InputField/PureSelect";

const PersonalInformation = ({ index }) => {
  return (
    <>
      <Grid item container spacing={3}>
        <Grid item sm={12} className="mb-25 mt-25">
          <CustomCheckbox id="Sig.kycVerified" indexes={[index]} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="Sig.firstName"
            indexes={[index]}
            select={
              <PureSelect id="Sig.gender" indexes={[index]} combinedSelect />
            }
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="Sig.middleName" indexes={[index]} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput id="Sig.lastName" indexes={[index]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="SigKycd.dateOfBirth" indexes={[index]} />
        </Grid>
      </Grid>
    </>
  );
};

PersonalInformation.defaultProps = {
  index: 0
};

export default PersonalInformation;
