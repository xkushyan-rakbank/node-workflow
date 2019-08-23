import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/Select";
import Input from "../InputField/Input";
import Checkbox from "../InputField/Checkbox";
import { nationality as nationalityOptions } from "../../constants";

const styles = {
  bottomIndent: {
    marginBottom: "26px"
  }
};

const Nationality = props => {
  const [nationality, setNationality] = useState(nationalityOptions[0].value);
  const [passportNumber, setPassportNumber] = useState();
  const changeNationality = event => setNationality(event.target.value);
  const [secondCitizenships, setSecondCitizenships] = useState(false);
  const [diplomaticPassport, setDiplomaticPassport] = useState(false);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <Select
            name="nationality"
            label="Nationality"
            options={nationalityOptions}
            value={nationality}
            onChange={changeNationality}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Input
            name="passportNumber"
            label="Passport Number"
            placeholder="Passport Number"
            value={passportNumber}
            onChange={setPassportNumber}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3} className={props.classes.bottomIndent}>
        <Grid item md={6} sm={12}>
          <Checkbox
            name="secondCitizenships"
            label="This person has a second citizenships"
            value={secondCitizenships}
            onChange={setSecondCitizenships}
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Checkbox
            name="diplomaticPassport"
            label="This is a diplomatic Passport"
            value={diplomaticPassport}
            onChange={setDiplomaticPassport}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(Nationality);
