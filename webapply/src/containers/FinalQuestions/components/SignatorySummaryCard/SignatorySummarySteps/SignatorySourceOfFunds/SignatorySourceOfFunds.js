import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import Grid from "@material-ui/core/Grid";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { WEALTH_TYPE__REGEX } from "../../../../../../utils/validation";
import { prospect } from "../../../../../../constants/config";
import { CustomSelect, Input } from "../../../../../../components/Form";
import { wealthTypeOptions, OTHER_SOURCE_OF_WEALTH } from "./constants";

export const signatorySourceOfFundsSchema = Yup.object().shape({
  wealthType: Yup.string().required("You need to provide wealth type"),
  others: Yup.string().when("wealthType", {
    is: value => value === OTHER_SOURCE_OF_WEALTH,
    then: Yup.string()
      .required("You need to specify wealth type")
      .matches(WEALTH_TYPE__REGEX, "Invalid wealth type value")
  })
});

export const SignatorySourceOfFundsComponent = ({
  index,
  handleContinue
  // soursOfWealth,
  // updateProspect
}) => {
  const classes = useStyles();
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (
  //     prevProps.soursOfWealth !== this.props.soursOfWealth &&
  //     !this.isOtherSourceOfWealthSelected()
  //   ) {
  //     this.updateOtherWealthTypeValue("");
  //   }
  // }

  // function updateOtherWealthTypeValue(value) {
  //   updateProspect({ [otherWealthTypeInputName]: value });
  // }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          wealthType: prospect.signatoryInfo[index].kycDetails.sourceOfWealth.wealthType,
          others: prospect.signatoryInfo[index].kycDetails.sourceOfWealth.others
        }}
        onSubmit={onSubmit}
        validationSchema={signatorySourceOfFundsSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                <Grid item md={12} sm={12}>
                  <Field
                    options={wealthTypeOptions}
                    shrink={false}
                    name="wealthType"
                    placeholder="Source of funds"
                    component={CustomSelect}
                  />
                </Grid>
                {values.wealthType === OTHER_SOURCE_OF_WEALTH && (
                  <Grid item md={12} sm={12}>
                    <Field
                      name="others"
                      label="Other(Specify)"
                      placeholder="Other(Specify)"
                      component={Input}
                    />
                  </Grid>
                )}
              </Grid>
              <div className={classes.buttonWrapper}>
                <ContinueButton type="submit" />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
