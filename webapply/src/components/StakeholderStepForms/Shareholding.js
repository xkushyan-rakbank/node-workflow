import React, { useState } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/appConfig";
import InputAdornment from "@material-ui/core/InputAdornment";

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
  return (
    <Grid container spacing={3}>
      <Grid item md={6} sm={12}>
        <PureSelect
          id="UI0281"
          indexes={[props.index]}
          defaultValue="true"
          disabled={props.isSoleProprietor}
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <TextInput
          disabled={props.isShareholder === "false" || props.isSoleProprietor}
          id="UI0282"
          defaultValue={props.isSoleProprietor ? 100 : undefined}
          indexes={[props.index]}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
          }}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, { index }) => ({
  isShareholder: getInputValueById(state, "UI0281", [index]),
  // temp - will work only on WireMock data
  isSoleProprietor: getInputValueById(state, "UI0377", [index]) === "SP"
});

export default connect(mapStateToProps)(Shareholding);
