import React, { useCallback } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import cx from "classnames";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";
import set from "lodash/set";

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

export const SignatorySourceOfFundsComponent = ({
  index,
  handleContinue,
  signatories,
  updateProspect
}) => {
  const classes = useStyles();

  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          wealthType: get(signatories, `[${index}]kycDetails.sourceOfWealth`, []).map(
            ({ sourceOfWealth }) => sourceOfWealth
          ),
          others: get(signatories, `[${index}].kycDetails.sourceOfWealth[0].others`, "")
        }}
        onSubmit={handleSubmit}
        validationSchema={signatorySourceOfFundsSchema}
        validateOnChange={false}
      >
        {({ values, setFieldValue, setFieldTouched }) => (
          <Form>
            <Grid container spacing={3} className={classes.flexContainer}>
              <Grid item md={12} sm={12}>
                <Field
                  name="wealthType"
                  // eslint-disable-next-line max-len
                  path={`signatoryInfo.sourceOfFounds.signatoryInfo[${index}].kycDetails.sourceOfWealth`}
                  datalistId="wealthType"
                  label="Source of funds"
                  onChange={selectedValue => {
                    if (
                      !selectedValue.includes(OTHER_SOURCE_OF_WEALTH) &&
                      values.wealthType.includes(OTHER_SOURCE_OF_WEALTH)
                    ) {
                      setFieldValue("others", "");
                      setFieldTouched("others", false);
                    }

                    set(
                      signatories,
                      `[${index}].kycDetails.sourceOfWealth`,
                      selectedValue.map(val => ({ wealthType: val, others: values.others }))
                    );

                    updateProspect(signatories, "prospect.signatoryInfo");
                    setFieldValue("wealthType", selectedValue);
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
                  path={`signatoryInfo.sourceOfFounds.signatoryInfo[${index}].kycDetails.others`}
                  label="Other(Specify)"
                  placeholder="Other(Specify)"
                  component={Input}
                  onChange={e => {
                    const { value } = e.target;
                    set(
                      signatories,
                      `[${index}].kycDetails.sourceOfWealth`,
                      values.wealthType.map(wealthType => ({
                        wealthType,
                        others: value
                      }))
                    );

                    updateProspect(signatories, "prospect.signatoryInfo");
                    setFieldValue("others", value);
                  }}
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
