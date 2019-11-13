import React from "react";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { getOptionsForSubId } from "../../../../utils/getInputSubOptions";
import { getInputValueById, getFieldConfigById } from "../../../../store/selectors/input";

import CheckboxGroup from "../../../../components/InputField/CheckboxGroup";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import PureSelect from "../../../../components/InputField/PureSelect";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";

import { styled } from "./styled";

const AccountDetails = props => {
  const { classes, islamicBanking, branchCityValue, branchCityConfig, goToNext } = props;
  const subOptions = getOptionsForSubId(branchCityValue, branchCityConfig, true);

  const index = [0];
  const indexes = [0, 0];

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <Subtitle title="Select currencies" />
      <CheckboxGroup id="Acnt.accountCurrencies" indexes={index} />

      <Divider />

      <Subtitle title="Select branch" />
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="Org.branchCity" indexes={indexes} />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect
            id="Org.subCategory"
            indexes={indexes}
            subOptions={subOptions}
            disabled={isEmpty(branchCityValue)}
          />
        </Grid>
      </Grid>

      {!islamicBanking && (
        <>
          <Divider />
          <Subtitle title="Select interest" />
          <Checkbox id="Acnt.receiveInterest" indexes={index} />
        </>
      )}
    </FormWrapper>
  );
};

const mapStateToProps = state => ({
  islamicBanking: get(state.appConfig, "prospect.applicationInfo.islamicBanking"),
  branchCityValue: getInputValueById(state, "Org.branchCity", [0, 0]),
  branchCityConfig: getFieldConfigById(state, "Org.branchCity")
});

export default compose(
  withStyles(styled),
  connect(mapStateToProps)
)(AccountDetails);
