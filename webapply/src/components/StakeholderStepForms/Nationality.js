import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Select from "../InputField/PureSelect";
import Input from "../InputField/TextInput";
import Checkbox from "../InputField/RefactoredCheckbox";
import UICheckbox from "../InputField/Checkbox";
import {
  getInputNameById,
  getInputValueById
} from "../../store/selectors/appConfig";
import { updateField } from "../../store/actions/appConfig";

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
    if (
      prevProps.isDualCitizenship !== this.props.isDualCitizenship &&
      !this.props.isDualCitizenship
    ) {
      this.setState({ isHasThirdCitizenship: false });
      this.resetDualCitizenshipValues();
      this.resetThirdCitizenshipValues();
    }
    if (
      prevState.isHasThirdCitizenship !== this.state.isHasThirdCitizenship &&
      !this.state.isHasThirdCitizenship
    ) {
      this.resetThirdCitizenshipValues();
    }
  }

  /**
   * @param {Object[]} list
   * @param {String} list[].name
   * @param {Any} list[].value
   */
  resetFieldValues(list) {
    list.forEach(this.props.updateField);
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
    const { classes, index } = this.props;

    return (
      <>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <Select id="SigKycd.nationality" indexes={[index]} />
            <Checkbox id="SigKycd.dualCitizenship" indexes={[index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <Input
              key={index}
              id="SigKycdPspd.passportNumber"
              indexes={[index, 0]}
            />
            <Checkbox id="SigKycdPspd.diplomatPassport" indexes={[index, 0]} />
          </Grid>
          {this.props.isDualCitizenship && (
            <>
              <Grid item sm={12} className={classes.divider} />
              <Grid item md={6} sm={12}>
                <Select
                  id="SigKycd.dualCitizenshipCountry"
                  indexes={[index, 0]}
                />
                <UICheckbox
                  label="This person has a third citizenship"
                  value={this.state.isHasThirdCitizenship}
                  onChange={({ target }) =>
                    this.setState({ isHasThirdCitizenship: target.checked })
                  }
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Input
                  key={index}
                  id="SigKycdPspd.passportNumber"
                  indexes={[index, 1]}
                />
                <Checkbox
                  id="SigKycdPspd.diplomatPassport"
                  indexes={[index, 1]}
                />
              </Grid>
            </>
          )}
          {this.state.isHasThirdCitizenship && (
            <>
              <Grid item sm={12} className={classes.divider} />
              <Grid item md={6} sm={12}>
                <Select
                  id="SigKycd.dualCitizenshipCountry"
                  indexes={[index, 1]}
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <Input
                  key={index}
                  id="SigKycdPspd.passportNumber"
                  indexes={[index, 2]}
                />
                <Checkbox
                  id="SigKycdPspd.diplomatPassport"
                  indexes={[index, 2]}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Grid container spacing={3} className={classes.bottomIndent}>
          <Grid item sm={12} className={classes.divider} />
          <Grid item md={6} sm={12}>
            <UICheckbox
              value={this.state.isHasSelfGovtPosition}
              onChange={({ target }) =>
                this.setState({ isHasSelfGovtPosition: target.checked })
              }
              label="This person has held a position at the government or in a government-owned company/organisation in the last 5 years"
            />
          </Grid>

          <Grid item md={6} sm={12}>
            <UICheckbox
              value={this.state.isHasRelativeGovtPosition}
              onChange={({ target }) =>
                this.setState({ isHasRelativeGovtPosition: target.checked })
              }
              label="A relative of this person, by blood or law, holds a position at the goverment or in a goverment-owned company/organisation"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.bottomIndent}>
          <Grid item md={6} sm={12}>
            {this.state.isHasSelfGovtPosition && (
              <Input id="SigKycd.selfGovtPosition" indexes={[index]} />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            {this.state.isHasRelativeGovtPosition && (
              <Input id="SigKycd.relativeGovtPosition" indexes={[index]} />
            )}
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state, { index }) => ({
  // temp - work only with wire mock data
  isDualCitizenship: getInputValueById(state, "SigKycd.dualCitizenship", [
    index
  ]),
  firstDualCitizenshipCountryInputName: getInputNameById(
    state,
    "SigKycd.dualCitizenshipCountry",
    [index, 0]
  ),
  secondPassportNumberInputName: getInputNameById(
    state,
    "SigKycdPspd.passportNumber",
    [index, 1]
  ),
  secondDiplomatPassportInputName: getInputNameById(
    state,
    "SigKycdPspd.diplomatPassport",
    [index, 1]
  ),
  secondDualCitizenshipCountryInputName: getInputNameById(
    state,
    "SigKycd.dualCitizenshipCountry",
    [index, 1]
  ),
  thirdPassportNumberInputName: getInputNameById(
    state,
    "SigKycdPspd.passportNumber",
    [index, 2]
  ),
  thirdDiplomatPassportInputName: getInputNameById(
    state,
    "SigKycdPspd.diplomatPassport",
    [index, 2]
  )
});

const mapDispatchToProps = {
  updateField
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Nationality)
);
