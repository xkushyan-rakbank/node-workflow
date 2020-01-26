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
import { withCompanyStakeholder } from "../withCompanyStakeholder";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { updateProspect } from "../../../../store/actions/appConfig";
import { ALPHANUMERIC_REGEX } from "../../../../utils/validation";
import { MAX_PASSPORT_NUMBER_LENGTH } from "./constants";
import { SubmitButton } from "./../SubmitButton/SubmitButton";
import { getRequiredMessage, getInvalidMessage } from "../../../../utils/getValidationMessage";
import { useStyles } from "./styled";

const MAX_ANOTHER_CITIZENSHIP = 4;
const initialPassportDetails = {
  country: "",
  hasAnotherCitizenship: false,
  passportNumber: "",
  diplomatPassport: false
};

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

export const NationalityStep = ({ index, passportDetails, handleContinue, updateProspect }) => {
  const classes = useStyles();

  const createAddCitizenshipHandler = (values, arrayHelper, passportIndex, setFieldValue) => () => {
    const name = `passportDetails[${passportIndex}].hasAnotherCitizenship`;
    const value = values.passportDetails[passportIndex].hasAnotherCitizenship;

    if (!value) {
      arrayHelper.push({ ...initialPassportDetails, id: uniqueId() });
    } else {
      values.passportDetails.forEach((el, index) => index >= passportIndex && arrayHelper.pop());
    }
    setFieldValue(name, !value);
  };

  const isAdditionalCitizenshipDisabled = (values, passportIndex, errors) => {
    return (
      !(
        getIn(values, `passportDetails[${passportIndex}].country`, false) &&
        getIn(values, `passportDetails[${passportIndex}].passportNumber`, false)
      ) || !!getIn(errors, `passportDetails[${passportIndex}].passportNumber`, false)
    );
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
      {withCompanyStakeholder(index, ({ values, setFieldValue, errors }) => (
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
                          name={`passportDetails[${passportIndex}].country`}
                          path={`${passportDetails}.country`}
                          label="Nationality"
                          component={SelectAutocomplete}
                          datalistId="country"
                          filterOptions={options => {
                            const nationalities = values.passportDetails
                              .filter((item, index) => item.country && index !== passportIndex)
                              .map(item => item.country);

                            return options.filter(item => !nationalities.includes(item.value));
                          }}
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
                          InputProps={{
                            inputProps: { tabIndex: 0 }
                          }}
                        />
                        {passportIndex < MAX_ANOTHER_CITIZENSHIP && (
                          <Field
                            name={`passportDetails[${passportIndex}].hasAnotherCitizenship`}
                            path={`${passportDetails}.hasAnotherCitizenship`}
                            label="This person has a second citizenship"
                            component={Checkbox}
                            onChange={createAddCitizenshipHandler(
                              values,
                              arrayHelper,
                              passportIndex,
                              setFieldValue
                            )}
                            changeProspect={prospect => {
                              if (passportIndex > 0) {
                                return prospect;
                              }

                              return {
                                ...prospect,
                                // eslint-disable-next-line max-len
                                [`prospect.signatoryInfo[${index}].kycDetails.passportDetails`]: values.passportDetails.map(
                                  ({ id, ...withoutId }) => withoutId
                                )
                              };
                            }}
                            disabled={isAdditionalCitizenshipDisabled(
                              values,
                              passportIndex,
                              errors
                            )}
                            inputProps={{ tabIndex: 0 }}
                          />
                        )}
                      </Grid>
                      <Grid item md={6} sm={12}>
                        <Field
                          name={`passportDetails[${passportIndex}].passportNumber`}
                          path={`${passportDetails}.passportNumber`}
                          label="Passport number"
                          placeholder="Passport number"
                          component={Input}
                          contextualHelpText="If Passport Number contains hyphen (-), oblique (/), spaces or any other special character please enter only alphabets and numbers.
                            Example: 'P-123/1950/456 to be entered as P1231950456'"
                          InputProps={{
                            inputProps: { maxLength: MAX_PASSPORT_NUMBER_LENGTH, tabIndex: 0 }
                          }}
                        />
                        <Field
                          name={`passportDetails[${passportIndex}].diplomatPassport`}
                          path={`${passportDetails}.diplomatPassport`}
                          label="This is a diplomatic passport"
                          component={Checkbox}
                          inputProps={{ tabIndex: 0 }}
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
