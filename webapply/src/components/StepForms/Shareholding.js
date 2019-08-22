import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/Select";
import Input from "../InputField/Input";
import { personSignatory as personShareholderOptions } from "../../constants";

const styles = {
  percentageInput: {
    position: "relative",
    "& input[name='percentage']": {
      paddingRight: "40px"
    }
  },
  percentageIcon: {
    fontSize: "16px",
    color: "#517085",
    position: "absolute",
    top: "30px",
    right: "30px"
  }
};

const Shareholding = props => {
  const [personShareholder, setPersonShareholder] = useState(
    personShareholderOptions[0].value
  );
  const [percentage, setPercentage] = useState();
  const changePersonShareholder = event =>
    setPersonShareholder(event.target.value);
  return (
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <Select
          name="personShareholder"
          label="Is this person a shareholder?"
          options={personShareholderOptions}
          value={personShareholder}
          onChange={changePersonShareholder}
        />
      </Grid>
      <Grid item md={6} sm={12} className={props.classes.percentageInput}>
        <Input
          name="percentage"
          label="Percentage"
          placeholder="Percentage"
          value={percentage}
          onChange={setPercentage}
        />
        <div className={props.classes.percentageIcon}>%</div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Shareholding);
