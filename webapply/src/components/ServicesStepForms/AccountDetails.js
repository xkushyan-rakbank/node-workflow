import React from "react";
import cx from "classnames";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { compose } from "recompose";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { getInputValueById, getFieldConfigById } from "../../store/selectors/input";
import Checkbox from "../InputField/RefactoredCheckbox";
import CheckboxGroup from "../InputField/CheckboxGroup";
import FormWrapper from "../StakeholderStepForms/FormWrapper";
import PureSelect from "../InputField/PureSelect";
import { getOptionsForSubId } from "../../utils/getInputSubOptions";

const style = {
  formWrapper: {
    margin: 0
  },
  checkboxesWrapper: {
    marginBottom: "30px"
  },
  checkboxWrapper: {
    marginTop: "10px"
  },
  sectionLabel: {
    padding: "30px 0 20px"
  },
  topDivider: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    marginTop: "30px"
  }
};

class AccountDetails extends React.Component {
  render() {
    const { classes, islamicBanking, branchCityValue, branchCityConfig } = this.props;
    const subOptions = getOptionsForSubId(branchCityValue, branchCityConfig, true);

    return (
      <FormWrapper className={classes.formWrapper} handleContinue={this.props.goToNext}>
        <div className={cx("text", classes.sectionLabel)}>Select currencies</div>
        <CheckboxGroup id="Acnt.accountCurrencies" indexes={[0]} />

        <div className={cx("text", classes.topDivider, classes.sectionLabel)}>Select branch</div>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <PureSelect id="Org.branchCity" indexes={[0, 0]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <PureSelect
              id="Org.subCategory"
              indexes={[0, 0]}
              subOptions={subOptions}
              disabled={isEmpty(branchCityValue)}
            />
          </Grid>
        </Grid>

        {!islamicBanking && (
          <>
            <div className={cx("text", classes.topDivider, classes.sectionLabel)}>
              Select interest
            </div>
            <Checkbox id="Acnt.receiveInterest" indexes={[0]} />
          </>
        )}
      </FormWrapper>
    );
  }
}

const mapStateToProps = state => ({
  islamicBanking: get(state.appConfig, "prospect.applicationInfo.islamicBanking"),
  branchCityValue: getInputValueById(state, "Org.branchCity", [0, 0]),
  branchCityConfig: getFieldConfigById(state, "Org.branchCity")
});

export default compose(
  withStyles(style),
  connect(
    mapStateToProps,
    {}
  )
)(AccountDetails);
