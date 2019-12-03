import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import uniqueId from "lodash/uniqueId";
import get from "lodash/get";

import { handleCitizenship } from "../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { SubmitButton } from "../SubmitButton/SubmitButton";
import { AutoSaveField as Field, SelectAutocomplete, Checkbox, Input } from "../../Form";
import { PASSPORT_NUMBER_REGEX } from "../../../utils/validation";
import { getSignatories } from "./../../../store/selectors/appConfig";

const MAX_ANOTHER_CITIZENSHIP = 4;
const initialPassportDetails = {
  nationality: "",
  hasAnotherCitizenship: false,
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

const NationalityStep = ({ index, passportDetails, handleContinue }) => {
  const classes = useStyles();

  const createAddCityshipHandler = (values, arrayHelper, passportIndex, setFieldValue) => event => {
    const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
    const value = values.passportDetails[passportIndex].hasAnotherCitizenship;

    if (!value) {
      arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
    } else {
      if (!passportIndex) {
        values.passportDetails.forEach((el, index) => arrayHelper.remove(index));
      } else {
        arrayHelper.pop();
      }
    }
    setFieldValue(name, !value);
  };

  const isDisabled = (values, passportIndex) => {
    if (values && values.passportDetails.length > 1 && passportIndex) {
      const passportDetailsLength = values.passportDetails.length;
      const prevPassportIndex = passportDetailsLength - 2;
      const prevNationalityPath = `passportDetails[${prevPassportIndex}].nationality`;
      const isDisabled =
        passportDetailsLength - 1 === passportIndex && !getIn(values, prevNationalityPath);

      return isDisabled;
    }
  };

  return (
    <Formik
      onSubmit={handleContinue}
      initialValues={{
        passportDetails: passportDetails.map(item => ({ ...item, id: uniqueId() }))
      }}
      validationSchema={nationalitySchema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Grid container spacing={3}>
            <FieldArray
              name="passportDetails"
              render={arrayHelper =>
                values.passportDetails.map((item, passportIndex) => {
                  // eslint-disable-next-line max-len
                  const passportDetails = `prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}]`;
                  console.log(item);
                  return (
                    <React.Fragment key={item.id}>
                      {!!passportIndex && <Grid item sm={12} className={classes.divider} />}
                      <Grid item md={6} sm={12}>
                        <Field
                          name={`passportDetails[${passportIndex}].nationality`}
                          path={`${passportDetails}.nationality`}
                          label="Nationality"
                          component={SelectAutocomplete}
                          datalistId="country"
                          disabled={isDisabled()}
                          shrink={true}
                          isLoadDefaultValueFromStore={false}
                        />
                        {passportIndex < MAX_ANOTHER_CITIZENSHIP && (
                          <Field
                            name={`passportDetails[${passportIndex}].hasAnotherCitizenship`}
                            path={`${passportDetails}.hasAnotherCitizenship`}
                            label="This person has another citizenship"
                            component={Checkbox}
                            onChange={createAddCityshipHandler(
                              values,
                              arrayHelper,
                              passportIndex,
                              setFieldValue
                            )}
                            disabled={isDisabled(values, passportIndex)}
                            isLoadDefaultValueFromStore={false}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <Field
                          name={`passportDetails[${passportIndex}].passportNumber`}
                          path={`${passportDetails}.passportNumber`}
                          label="Passport Number"
                          placeholder="Passport Number"
                          component={Input}
                          isLoadDefaultValueFromStore={false}
                        />
                        <Field
                          name={`passportDetails[${passportIndex}].diplomatPassport`}
                          path={`${passportDetails}.diplomatPassport`}
                          label="This is a diplomatic Passport"
                          component={Checkbox}
                          isLoadDefaultValueFromStore={false}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })
              }
            />
          </Grid>
          <SubmitButton />
        </Form>
      )}
    </Formik>
  );
};

const mapDispatchToProps = {
  handleCitizenship
};

const mapStateToProps = (state, { index }) => {
  return {
    passportDetails: get(getSignatories(state)[index], "kycDetails.passportDetails", [])
  };
};

export const Nationality = connect(
  mapStateToProps,
  mapDispatchToProps
)(NationalityStep);
