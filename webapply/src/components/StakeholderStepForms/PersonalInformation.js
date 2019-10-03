import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import DatePicker from "../InputField/DatePicker";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
import PureSelect from "../InputField/PureSelect";
import { getInputValueById } from "../../store/selectors/input";
import { connect } from "react-redux";

const PersonalInformation = props => {
  const { index, isShareholderACompany } = props;
  return (
    <>
      <Grid item container spacing={3}>
        <Grid item sm={12} className="mb-25 mt-25">
          <CustomCheckbox id="Okyc.isShareholderACompany" withQuestion />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="Sig.firstName"
            indexes={[index]}
            disabled={isShareholderACompany}
            select={
              <PureSelect
                id="Sig.gender"
                indexes={[index]}
                combinedSelect
                defaultValue="Male"
                disabled={isShareholderACompany}
              />
            }
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <TextInput id="Sig.middleName" indexes={[index]} disabled={isShareholderACompany} />
        </Grid>
      </Grid>
      <Grid item container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput id="Sig.lastName" indexes={[index]} disabled={isShareholderACompany} />
        </Grid>
        <Grid item md={6} sm={12}>
          <DatePicker id="SigKycd.dateOfBirth" indexes={[index]} disabled={isShareholderACompany} />
        </Grid>
      </Grid>
    </>
  );
};

PersonalInformation.defaultProps = {
  index: 0
};

const mapStateToProps = state => ({
  isShareholderACompany: getInputValueById(state, "Okyc.isShareholderACompany")
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);
