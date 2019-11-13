import React from "react";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import { InfoTitle } from "./../Notifications";

const PreferredContactInformation = props => {
  const { isSignatory, index } = props;
  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <TextInput id="SigCont.primaryEmail" indexes={[index]} disabled={!isSignatory} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="SigCont.primaryMobileNo"
            indexes={[index]}
            disabled={!isSignatory}
            select={
              <PureSelect
                id="SigCont.primaryMobCountryCode"
                indexes={[index]}
                defaultValue="UAE"
                combinedSelect
                disabled={!isSignatory}
              />
            }
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput
            id="SigCont.primaryPhoneNo"
            indexes={[index]}
            disabled={!isSignatory}
            select={
              <PureSelect
                id="SigCont.primaryPhoneCountryCode"
                indexes={[index]}
                defaultValue="UAE"
                combinedSelect
                disabled={!isSignatory}
              />
            }
          />
        </Grid>
      </Grid>
      <InfoTitle title="Heads up! We can only issue chequebooks if you use a phone number from the UAE." />
    </>
  );
};

const mapStateToProps = (state, { index }) => ({
  isSignatory: getInputValueById(state, "SigKycd.isSignatory", [index])
});

const mapDispatchToProps = { updateProspect };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferredContactInformation);
