import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/appConfig";

const SignatoryRights = ({ index, isSignatory }) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <PureSelect
          id="SigKycd.isSignatory"
          defaultValue="true"
          indexes={[index]}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <PureSelect
          disabled={isSignatory === "false"}
          id="SigAcntSig.authorityType"
          indexes={[index]}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "UI0280", [index])
});

export default connect(mapStateToProps)(SignatoryRights);
