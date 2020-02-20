import React from "react";
import * as Yup from "yup";
import { Formik, Form, getIn } from "formik";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";

import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { InfoTitle } from "../../../../../../components/Notifications";
import {
  SelectAutocomplete,
  Input,
  AutoSaveField as Field
} from "../../../../../../components/Form";
import { WEALTH_TYPE__REGEX } from "../../../../../../utils/validation";
import { OTHER_SOURCE_OF_WEALTH } from "./constants";
import {
  getRequiredMessage,
  getInvalidMessage
} from "../../../../../../utils/getValidationMessage";

import { useStyles } from "./styled";

export const signatorySourceOfFundsSchema = Yup.object().shape({
  wealthType: Yup.string().required(getRequiredMessage("Source of funds")),
  others: Yup.string().when("wealthType", {
    is: value => value.includes(OTHER_SOURCE_OF_WEALTH),
    then: Yup.string()
      .required(getRequiredMessage("Other"))
      .matches(WEALTH_TYPE__REGEX, getInvalidMessage("Other"))
  })
});

export const SignatorySourceOfFundsComponent = ({ index, handleContinue, signatories }) => {
  const classes = useStyles();
  const path = `prospect.signatoryInfo[${index}].kycDetails.sourceOfWealth`;

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          wealthType: getIn(signatories, `[${index}]kycDetails.sourceOfWealth`, []).map(
            ({ sourceOfWealth }) => sourceOfWealth
          ),
          others: getIn(signatories, `[${index}].kycDetails.sourceOfWealth[0].others`, "")
        }}
        onSubmit={handleContinue}
        validationSchema={signatorySourceOfFundsSchema}
        validateOnChange={false}
      >
        {({ values, setFieldTouched, setValues }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={12} sm={12}>
                <Field
                  name="wealthType"
                  path={path}
                  datalistId="wealthType"
                  label="Source of funds"
                  isLoadDefaultValueFromStore={false}
                  changeProspect={(_, value) => ({
                    [path]: value.map(val => ({ wealthType: val, others: values.others }))
                  })}
                  onChange={selectedValue => {
                    const newValues = values;
                    if (
                      !selectedValue.includes(OTHER_SOURCE_OF_WEALTH) &&
                      values.wealthType.includes(OTHER_SOURCE_OF_WEALTH)
                    ) {
                      setFieldTouched("others", false);
                      newValues.others = "";
                    }
                    setValues({
                      ...newValues,
                      wealthType: selectedValue
                    });
                  }}
                  contextualHelpText="Select the most prominent source of capital to fund the company"
                  contextualHelpProps={{ isDisableHoverListener: false }}
                  component={SelectAutocomplete}
                  isSearchable
                  multiple
                />
                <InfoTitle
                  classes={{
                    wrapper: classes.infoTitles
                  }}
                  title="You can select multiple values"
                />
              </Grid>
              <Grid
                className={cx({
                  hidden: !values.wealthType.includes(OTHER_SOURCE_OF_WEALTH)
                })}
                item
                md={12}
                sm={12}
              >
                <Field
                  name="others"
                  path={path}
                  label="Other(Specify)"
                  placeholder="Other(Specify)"
                  component={Input}
                  isLoadDefaultValueFromStore={false}
                  changeProspect={(_, value) => ({
                    [path]: values.wealthType.map(wealthType => ({
                      wealthType,
                      others: value
                    }))
                  })}
                  InputProps={{
                    inputProps: { tabIndex: 0 }
                  }}
                />
              </Grid>
            </Grid>
            <div className={classes.buttonWrapper}>
              <ContinueButton type="submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
