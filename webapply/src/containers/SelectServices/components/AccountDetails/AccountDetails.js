import React from "react";
import isEmpty from "lodash/isEmpty";
import Grid from "@material-ui/core/Grid";

import { getOptionsForSubId } from "../../../../utils/getInputSubOptions";

import CheckboxGroup from "../../../../components/InputField/CheckboxGroup";
import Checkbox from "../../../../components/InputField/RefactoredCheckbox";
import PureSelect from "../../../../components/InputField/PureSelect";
import FormWrapper from "../../../../components/StakeholderStepForms/FormWrapper";
import Subtitle from "../../../../components/Subtitle";
import Divider from "../../../../components/Divider";

import { styles } from "./styled";
import { inputIdIndex, inputIdIndexes } from "../../constants";

export const AccountDetails = props => {
  const { islamicBanking, branchCityValue, branchCityConfig, goToNext } = props;
  const subOptions = getOptionsForSubId(branchCityValue, branchCityConfig, true);
  const classes = styles();

  return (
    <FormWrapper className={classes.formWrapper} handleContinue={goToNext}>
      <Subtitle title="Select currencies" />
      <CheckboxGroup id="Acnt.accountCurrencies" indexes={inputIdIndex} />

      <Divider />

      <Subtitle title="Select branch" />
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="Org.branchCity" indexes={inputIdIndexes} />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect
            id="Org.subCategory"
            indexes={inputIdIndexes}
            subOptions={subOptions}
            disabled={isEmpty(branchCityValue)}
          />
        </Grid>
      </Grid>

      {!islamicBanking && (
        <>
          <Divider />
          <Subtitle title="Select interest" />
          <Checkbox id="Acnt.receiveInterest" indexes={inputIdIndex} />
        </>
      )}
    </FormWrapper>
  );
};
