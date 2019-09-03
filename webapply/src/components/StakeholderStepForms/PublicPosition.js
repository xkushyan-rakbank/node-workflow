import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Select from "../InputField/Select";
import { publicPositions } from "../../constants";
import InfoTitle from "../InfoTitle";

const styles = {
  infoWrapper: {
    marginLeft: "12px",
    marginBottom: "30px"
  }
};

const PublicPositions = props => {
  const [personPublicPosition, setPersonPublicPosition] = useState(
    publicPositions[0].value
  );
  const [holdPublicPosition, setHoldPublicPosition] = useState(
    publicPositions[0].value
  );
  return (
    <Grid container spacing={3}>
      <InfoTitle
        className={props.classes.infoWrapper}
        title="This section refers to people with positions in government, government-owned companies or political organizations"
      />
      <Grid item md={6} sm={12}>
        <Select
          name="personPublicPosition"
          label="Does this person hold a public position?"
          options={publicPositions}
          value={personPublicPosition}
          onChange={setPersonPublicPosition}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Select
          name="holdPublicPosition"
          label="Does a relative of his hold a public position?"
          options={publicPositions}
          value={holdPublicPosition}
          onChange={setHoldPublicPosition}
          infoTitle="A relative can be by blood relation or by law"
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PublicPositions);
