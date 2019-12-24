import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import uniqueId from "lodash/uniqueId";
import get from "lodash/get";

import {
  AutoSaveField as Field,
  SelectAutocomplete,
  Checkbox,
  Input
} from "../../../../components/Form";
import { withCompanyStakeholderFormik } from "../StakeholderFormik";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { ALPHANUMERIC_REGEX } from "../../../../utils/validation";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { useStyles } from "./styled";

const MAX_ANOTHER_CITIZENSHIP = 4;
const initialPassportDetails = {
  nationality: "",
  hasAnotherCitizenship: false,
  passportNumber: "",
  diplomatPassport: false
};

const nationalitySchema = Yup.object().shape({
  passportDetails: Yup.array().of(
    Yup.object().shape({
      nationality: Yup.string().required("Required"),
      passportNumber: Yup.string()
        .required("Required")
        .max(12, "Maximum 12 characters allowed")
        .matches(ALPHANUMERIC_REGEX, "Special characters and space is not allowed")
    })
  )
});

export const NationalityStep = ({
  index,
  passportDetails,
  handleContinue,
  filledStakeholder,
  setFillStakeholder
}) => {
  const classes = useStyles();
  const setUnfilledStakeholder = () => setFillStakeholder(index, false);

  const createAddCityshipHandler = (values, arrayHelper, passportIndex, setFieldValue) => () => {
    const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
    const value = values.passportDetails[passportIndex].hasAnotherCitizenship;

    if (!value) {
      arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
    } else {
      values.passportDetails.forEach((el, index) => index >= passportIndex && arrayHelper.pop());
    }
    setFieldValue(name, !value);
  };

  const isDisabled = (values, passportIndex) => {
    if (values && values.passportDetails.length > 1 && passportIndex) {
      const passportDetailsLength = values.passportDetails.length;
      const prevPassportIndex = passportDetailsLength - 2;
      const prevNationalityPath = `passportDetails[${prevPassportIndex}].nationality`;

      return passportDetailsLength - 1 === passportIndex && !getIn(values, prevNationalityPath);
    }
  };

  return (
    <Formik
      onSubmit={handleContinue}
      initialValues={{
        passportDetails: passportDetails.map(item => ({ ...item, id: uniqueId() }))
      }}
      validationSchema={nationalitySchema}
      validateOnChange={false}
    >
      {withCompanyStakeholderFormik(
        { filledStakeholder, setUnfilledStakeholder },
        ({ values, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <FieldArray
                name="passportDetails"
                render={arrayHelper =>
                  values.passportDetails.map((item, passportIndex) => {
                    // eslint-disable-next-line max-len
                    const passportDetails = `prospect.signatoryInfo[${index}].kycDetails.passportDetails[${passportIndex}]`;
                    return (
                      <React.Fragment key={item.id}>
                        {!!passportIndex && <Grid item sm={12} className={classes.divider} />}
                        <Grid item md={6} sm={12}>
                          <Field
                            name={`passportDetails[${passportIndex}].nationality`}
                            path={`${passportDetails}.country`}
                            label="Nationality"
                            component={SelectAutocomplete}
                            datalistId="country"
                            disabled={isDisabled()}
                            changeProspect={(prospect, value) => {
                              if (passportIndex) {
                                return prospect;
                              }

                              return {
                                ...prospect,
                                [`prospect.signatoryInfo[${index}].kycDetails.nationality`]: value
                              };
                            }}
                            shrink={true}
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
                          />
                          <Field
                            name={`passportDetails[${passportIndex}].diplomatPassport`}
                            path={`${passportDetails}.diplomatPassport`}
                            label="This is a diplomatic Passport"
                            component={Checkbox}
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
        )
      )}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  passportDetails: get(getSignatories(state)[index], "kycDetails.passportDetails", [])
});

export const Nationality = connect(mapStateToProps)(NationalityStep);
