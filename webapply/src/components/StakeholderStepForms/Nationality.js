import React from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import isObject from "lodash/isObject";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/PureSelect";
import Input from "../InputField/TextInput";
import Checkbox from "../InputField/RefactoredCheckbox";
import UICheckbox from "../InputField/Checkbox";
import { /*getInputNameById,*/ getInputValueById } from "../../store/selectors/input";
import { updateProspect } from "../../store/actions/appConfig";
import { setDualCitizenship } from "../../store/actions/stakeholders";

const styles = {
  bottomIndent: {
    marginBottom: "26px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "15px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  }
};

class Nationality extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isHasThirdCitizenship: false,
      isHasSelfGovtPosition: false,
      isHasRelativeGovtPosition: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.isDualCitizenship && this.props.isDualCitizenship) {
      this.props.setDualCitizenship(this.props.index);
    }
    // if (
    //   prevProps.isDualCitizenship !== this.props.isDualCitizenship &&
    //   !this.props.isDualCitizenship
    // ) {
    //   this.setState({ isHasThirdCitizenship: false });
    //   this.resetDualCitizenshipValues();
    //   this.resetThirdCitizenshipValues();
    // }
    // if (
    //   prevState.isHasThirdCitizenship !== this.state.isHasThirdCitizenship &&
    //   !this.state.isHasThirdCitizenship
    // ) {
    //   this.resetThirdCitizenshipValues();
    // }
  }

  resetFieldValues(list) {
    list.forEach(this.props.updateProspect);
  }

  resetDualCitizenshipValues() {
    this.resetFieldValues([
      { name: this.props.firstDualCitizenshipCountryInputName, value: "" },
      { name: this.props.secondPassportNumberInputName, value: "" },
      { name: this.props.secondDiplomatPassportInputName, value: false }
    ]);
  }

  resetThirdCitizenshipValues() {
    this.resetFieldValues([
      { name: this.props.secondDualCitizenshipCountryInputName, value: "" },
      { name: this.props.thirdPassportNumberInputName, value: "" },
      { name: this.props.thirdDiplomatPassportInputName, value: false }
    ]);
  }

  render() {
    const { classes, index, dualCitizenshipCountry } = this.props;
    const showDualCitizenship =
      isObject(dualCitizenshipCountry[0]) && !!dualCitizenshipCountry.length;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select id="SigKycd.nationality" indexes={[index]} />
            <Checkbox id="SigKycd.dualCitizenship" indexes={[index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <Input key={index} id="SigKycdPspd.passportNumber" indexes={[index, 0]} />
            <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, 0]} />
          </Grid>
          {showDualCitizenship &&
            dualCitizenshipCountry.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item sm={12} className={classes.divider} />
                <Grid item md={6} sm={12}>
                  <Select id="SigKycd.dualCitizenshipCountry" indexes={[index, 0]} />
                  <UICheckbox
                    label="This person has a third citizenship"
                    value={this.state.isHasThirdCitizenship}
                    onChange={({ target }) =>
                      this.setState({ isHasThirdCitizenship: target.checked })
                    }
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <Input key={index} id="SigKycdPspd.passportNumber" indexes={[index, 1]} />
                  <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, 1]} />
                </Grid>
              </React.Fragment>
            ))}
          {/*this.props.isDualCitizenship && (
            <>
              <Grid item sm={12} className={classes.divider} />
              <Grid item md={6} sm={12}>
                <Select id="SigKycd.dualCitizenshipCountry" indexes={[index, 0]} />
                <UICheckbox
                  label="This person has a third citizenship"
                  value={this.state.isHasThirdCitizenship}
                  onChange={({ target }) =>
                    this.setState({ isHasThirdCitizenship: target.checked })
                  }
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Input key={index} id="SigKycdPspd.passportNumber" indexes={[index, 1]} />
                <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, 1]} />
              </Grid>
            </>
          )}
          {this.state.isHasThirdCitizenship && (
            <>
              <Grid item sm={12} className={classes.divider} />
              <Grid item md={6} sm={12}>
                <Select id="SigKycd.dualCitizenshipCountry" indexes={[index, 1]} />
              </Grid>
              <Grid item md={6} sm={12}>
                <Input key={index} id="SigKycdPspd.passportNumber" indexes={[index, 2]} />
                <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, 2]} />
              </Grid>
            </>
          )*/}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  // temp - work only with wire mock data
  isDualCitizenship: getInputValueById(state, "SigKycd.dualCitizenship", [index]),
  dualCitizenshipCountry: get(
    state,
    `appConfig.prospect.signatoryInfo[${index}].kycDetails.dualCitizenshipCountry`,
    []
  )
  // firstDualCitizenshipCountryInputName:
  // getInputNameById(state, "SigKycd.dualCitizenshipCountry", [
  //   index,
  //   0
  // ]),
  // secondPassportNumberInputName:
  // getInputNameById(state, "SigKycdPspd.passportNumber", [index, 1]),
  // secondDiplomatPassportInputName: getInputNameById(state, "SigKycdPspd.diplomatPassport", [
  //   index,
  //   1
  // ]),
  // secondDualCitizenshipCountryInputName:
  // getInputNameById(state, "SigKycd.dualCitizenshipCountry", [
  //   index,
  //   1
  // ]),
  // thirdPassportNumberInputName:
  // getInputNameById(state, "SigKycdPspd.passportNumber", [index, 2]),
  // thirdDiplomatPassportInputName:
  // getInputNameById(state, "SigKycdPspd.diplomatPassport", [
  //   index,
  //   2
  // ])
});

const mapDispatchToProps = {
  updateProspect,
  setDualCitizenship
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nationality)
);
