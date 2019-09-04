import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/PureSelect";
import Input from "../InputField/TextInput";
import Checkbox from "../InputField/RefactoredCheckbox";

const styles = {
  bottomIndent: {
    marginBottom: "26px"
  }
};

const Nationality = props => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <Select id="SigKycd.nationality" indexes={[0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <Input id="SigKycdPspd.passportNumber" indexes={[0, 0]} />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={props.classes.bottomIndent}>
        <Grid item md={6} sm={12}>
          <Checkbox id="SigKycd.dualCitizenship" indexes={[0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[0, 0]} />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Nationality);
