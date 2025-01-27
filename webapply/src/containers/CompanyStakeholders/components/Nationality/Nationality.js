import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import uniqueId from "lodash/uniqueId";
import get from "lodash/get";

import {
  AutoSaveField as Field,
  SelectAutocomplete,
  Checkbox,
  Input
} from "../../../../components/Form";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";
import { ALPHANUMERIC_REGEX } from "../../../../utils/validation";
import { MAX_PASSPORT_NUMBER_LENGTH } from "./constants";
import { NationalityCheckbox } from "./NationalityCheckbox";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { getRequiredMessage, getInvalidMessage } from "../../../../utils/getValidationMessage";
import { createAddCitizenshipHandler, isAdditionalCitizenshipDisabled } from "./utils";

import { useStyles } from "./styled";

const MAX_ANOTHER_CITIZENSHIP = 4;

const nationalitySchema = Yup.object().shape({
  passportDetails: Yup.array().of(
    Yup.object().shape({
      country: Yup.string().required(getRequiredMessage("Nationality")),
      passportNumber: Yup.string()
        .required(getRequiredMessage("Passport number"))
        .max(12, "Maximum 12 characters allowed")
        .matches(ALPHANUMERIC_REGEX, getInvalidMessage("Passport number"))
    })
  )
});

export const NationalityStep = ({
  index,
  passportDetails,
  handleContinue,
  createFormChangeHandler
}) => {
  const classes = useStyles();

  const kycDetailsPath = `prospect.signatoryInfo[${index}].kycDetails`;

  return (
    <Formik
      onSubmit={handleContinue}
      initialValues={{
        passportDetails: passportDetails.map(item => ({ ...item, id: uniqueId() }))
      }}
      validationSchema={nationalitySchema}
      validateOnChange={false}
    >
      {createFormChangeHandler(({ values, errors }) => (
        <Form>
          <FieldArray
            name="passportDetails"
            render={arrayHelper =>
              values.passportDetails.map((item, passportIndex) => {
                // eslint-disable-next-line max-len
                const passportDetailsPath = `${kycDetailsPath}.passportDetails[${passportIndex}]`;
                return (
                  <Grid container spacing={3} key={item.id}>
                    {!!passportIndex && <Grid item xs={12} className={classes.divider} />}
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`passportDetails[${passportIndex}].country`}
                        path={`${passportDetailsPath}.country`}
                        label="Nationality"
                        component={SelectAutocomplete}
                        datalistId="nationality"
                        filterOptions={options => {
                          const nationalities = values.passportDetails
                            .filter((item, index) => item.country && index !== passportIndex)
                            .map(item => item.country);

                          return options.filter(item => !nationalities.includes(item.value));
                        }}
                        changeProspect={(prospect, value) => {
                          if (passportIndex) {
                            return {
                              ...prospect,
                              [`${kycDetailsPath}.dualCitizenshipCountry`]: values.passportDetails
                                .map(p => p.country)
                                .slice(1)
                            };
                          }

                          return {
                            ...prospect,
                            [`${kycDetailsPath}.nationality`]: value
                          };
                        }}
                        shrink={true}
                        tabIndex={2 * passportIndex + 1}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`passportDetails[${passportIndex}].passportNumber`}
                        path={`${passportDetailsPath}.passportNumber`}
                        label="Passport number"
                        component={Input}
                        contextualHelpText="If Passport Number contains hyphen (-), oblique (/), spaces or any other special character please enter only alphabets and numbers.
                            Example: 'P-123/1950/456 to be entered as P1231950456'"
                        InputProps={{
                          inputProps: {
                            maxLength: MAX_PASSPORT_NUMBER_LENGTH,
                            tabIndex: 2 * passportIndex + 1
                          }
                        }}
                      />
                    </Grid>

                    <Grid item sm={6} xs={12} className={classes.anotherCitizenshipContainer}>
                      {passportIndex < MAX_ANOTHER_CITIZENSHIP && (
                        <Field
                          name={`passportDetails[${passportIndex}].hasAnotherCitizenship`}
                          path={`${passportDetailsPath}.hasAnotherCitizenship`}
                          label="This person has another citizenship"
                          component={NationalityCheckbox}
                          onChange={createAddCitizenshipHandler(arrayHelper, passportIndex)}
                          changeProspect={prospect => ({
                            ...prospect,
                            [`${kycDetailsPath}.passportDetails`]: values.passportDetails.map(
                              ({ id, ...withoutId }) => withoutId
                            ),
                            [`${kycDetailsPath}.dualCitizenshipCountry`]: values.passportDetails
                              .map(p => p.country)
                              .slice(1),
                            [`${kycDetailsPath}.dualCitizenship`]: !!passportIndex
                          })}
                          disabled={isAdditionalCitizenshipDisabled(values, passportIndex, errors)}
                          inputProps={{ tabIndex: 2 * passportIndex + 2 }}
                        />
                      )}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        name={`passportDetails[${passportIndex}].diplomatPassport`}
                        path={`${passportDetailsPath}.diplomatPassport`}
                        label="This is a diplomatic passport"
                        component={Checkbox}
                        inputProps={{ tabIndex: 2 * passportIndex + 2 }}
                      />
                    </Grid>
                  </Grid>
                );
              })
            }
          />
          <SubmitButton tabIndex={values.passportDetails.length * 2} />
        </Form>
      ))}
    </Formik>
  );
};

const mapStateToProps = (state, { index }) => ({
  passportDetails: get(getSignatories(state)[index], "kycDetails.passportDetails", [])
});

const mapDispatchToProps = {
  updateProspect
};

export const Nationality = connect(
  mapStateToProps,
  mapDispatchToProps
)(NationalityStep);
