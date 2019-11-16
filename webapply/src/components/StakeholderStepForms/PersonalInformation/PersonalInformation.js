import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextInput from "../../InputField/TextInput";
import DatePicker from "../../InputField/DatePicker";
import CustomCheckbox from "../../InputField/RefactoredCheckbox";
import PureSelect from "../../InputField/PureSelect";
import { getInputValueById } from "../../../store/selectors/input";
import { updateProspect } from "../../../store/actions/appConfig";
import InlineRadioGroup from "../../InputField/InlineRadioGroup";
import InfoTitle from "../../InfoTitle";
import { useStyles } from "./styled";

const PersonalInformation = props => {
  const classes = useStyles();
  const { index, isShareholderACompany } = props;
  return (
    <>
      <Grid item container spacing={3}>
        <Grid item sm={12} className="mb-25 mt-25">
          <CustomCheckbox id="Okyc.isShareholderACompany" indexes={[index]} withQuestion />
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
      <InfoTitle title="The details of this section should be the same as in the person’s passport" />
      <div className={classes.divider} />
      <InlineRadioGroup id="SigKycd.isPEP" indexes={[index]} />
    </>
  );
};

const mapStateToProps = (state, { index }) => ({
  isShareholderACompany: getInputValueById(state, "Okyc.isShareholderACompany", [index])
});

const mapDispatchToProps = { updateProspect };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalInformation);
