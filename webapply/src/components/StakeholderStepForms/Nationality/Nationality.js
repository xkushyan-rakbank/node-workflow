import React from "react";
import get from "lodash/get";
// import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, getIn } from "formik";
import * as Yup from "yup";

import { getInputValueById } from "../../../store/selectors/input";
import { handleCitizenship } from "../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { AutoSaveField as Field, CustomSelect, Checkbox, Input } from "../../Form";
import { PASSPORT_NUMBER_REGEX } from "../../../utils/validation";

const MAX_ANOTHER_CITIZENSHIP = 4;
const INITIAL_VALUES = {
  nationality: "",
  hasAnotherCitizenship: "",
  passportNumber: "",
  diplomatPassport: ""
};

const nationalitySchema = Yup.object().shape({
  passportDetails: Yup.array().of(
    Yup.object().shape({
      nationality: Yup.string().required("Required"),
      passportNumber: Yup.string()
        .required("Required")
        .matches(PASSPORT_NUMBER_REGEX, "Special characters and space is not allowed")
    })
  )
});

const Nationality = ({ index, passportDetails, handleContinue }) => {
  const classes = useStyles();

  const addAnotherCitizenshipHandler = ({
    passportIndex,
    setFieldValue,
    push,
    values
  }) => event => {
    const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
    const value = JSON.parse(event.target.value);
    const previousValue = getIn(values, name);
    console.log(event.target.value);
    console.log(previousValue);
    if (!previousValue && value) {
      push(INITIAL_VALUES);
    }

    setFieldValue(name, value);
  };

  return (
    <Formik
      onSubmit={handleContinue}
      initialValues={{
        passportDetails: [INITIAL_VALUES]
      }}
      validationSchema={nationalitySchema}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form>
            <Grid container spacing={3}>
              <FieldArray
                name="passportDetails"
                render={({ push }) => {
                  return passportDetails.map((item, passportIndex) => {
                    const addAnotherCitizenship = addAnotherCitizenshipHandler({
                      passportIndex,
                      setFieldValue,
                      push,
                      values
                    });
                    return (
                      <React.Fragment key={passportIndex}>
                        {passportIndex !== 0 && <Grid item sm={12} className={classes.divider} />}
                        <Grid item md={6} sm={12}>
                          <Field
                            name={`passportDetails[${passportIndex}].nationality`}
                            // eslint-disable-next-line max-len
                            path={`prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}].nationality`}
                            label="Nationality"
                            component={CustomSelect}
                            datalistId="country"
                          />
                          {passportIndex < MAX_ANOTHER_CITIZENSHIP && (
                            <Field
                              name={`passportDetails[${passportIndex}].hasAnotherCitizenship`}
                              // eslint-disable-next-line max-len
                              path={`prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}].hasAnotherCitizenship`}
                              label="This person has another citizenship"
                              component={Checkbox}
                              onChange={addAnotherCitizenship}
                            />
                          )}
                        </Grid>
                        <Grid item md={6} sm={12}>
                          <Field
                            name={`passportDetails[${passportIndex}].passportNumber`}
                            // eslint-disable-next-line max-len
                            path={`prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}].passportNumber`}
                            label="Passport Number"
                            placeholder="Passport Number"
                            component={Input}
                          />
                          <Field
                            name={`passportDetails[${passportIndex}].diplomatPassport`}
                            // eslint-disable-next-line max-len
                            path={`prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}].diplomatPassport`}
                            label="This is a diplomatic Passport"
                            component={Checkbox}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  });
                }}
              />
            </Grid>

            <SubmitButton />
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => {
  return {
    isDualCitizenship: getInputValueById(state, "SigKycd.hasAnotherCitizenship", [index, 0]),
    passportDetails: get(
      state,
      `appConfig.prospect.signatoryInfo[${index}].kycDetails.passportDetails`,
      []
    )
  };
};

const mapDispatchToProps = {
  handleCitizenship
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nationality);
