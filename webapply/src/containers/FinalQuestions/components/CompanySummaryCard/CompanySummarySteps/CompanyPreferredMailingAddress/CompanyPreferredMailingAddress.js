import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import InfoTitle from "../../../../../../components/InfoTitle";
import { CustomSelect, Input, AutoSaveField as Field } from "../../../../../../components/Form";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { ADDRESS_NUMBER_REGEX, PO_NUMBER_REGEX } from "../../../../../../utils/validation";
import { emirateCityOptions, spaceTypeOptions, OTHER_OPTION_CODE } from "./constants";

const companyPreferredMailingAddressSchema = Yup.object().shape({
  organizationInfo: Yup.object().shape({
    addressInfo: Yup.array().of(
      Yup.object().shape({
        addressDetails: Yup.array().of(
          Yup.object().shape({
            addressFieldDesc: Yup.string().required("Required"),
            addressLine1: Yup.string()
              .required("Required")
              .matches(ADDRESS_NUMBER_REGEX, "Invalid address value"),
            poBox: Yup.string()
              .required("Required")
              .matches(PO_NUMBER_REGEX, "Invalid PO box number"),
            emirateCity: Yup.string().required("Required"),
            typeOfSpaceOccupied: Yup.object().shape({
              spaceType: Yup.string().required("Required"),
              others: Yup.string().when("spaceType", {
                is: value => value === OTHER_OPTION_CODE,
                then: Yup.string().required("Required")
              })
            })
          })
        )
      })
    )
  })
});

export const CompanyPreferredMailingAddressComponent = ({ handleContinue, addressInfo }) => {
  const classes = useStyles();

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          organizationInfo: {
            addressInfo
          }
        }}
        onSubmit={onSubmit}
        validationSchema={companyPreferredMailingAddressSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                {values.organizationInfo.addressInfo.map((item, index) => {
                  const pathBase = `organizationInfo.addressInfo[${index}].addressDetails`;
                  return item.addressDetails.map((address, idx) => {
                    return (
                      <React.Fragment key={address.preferredAddress}>
                        <Grid item md={6} sm={12}>
                          <Field
                            name={`${pathBase}[${idx}].addressFieldDesc`}
                            path={`prospect.${pathBase}[${idx}].addressFieldDesc`}
                            label="Office / Shop Number"
                            placeholder="Office / Shop Number"
                            component={Input}
                          />
                          <Field
                            name={`${pathBase}[${idx}].addressLine1`}
                            path={`prospect.${pathBase}[${idx}].addressLine1`}
                            label="Street / Location"
                            placeholder="Street / Location"
                            component={Input}
                          />
                          <Field
                            name={`${pathBase}[${idx}].emirateCity`}
                            path={`prospect.${pathBase}[${idx}].emirateCity`}
                            options={emirateCityOptions}
                            component={CustomSelect}
                            shrink={false}
                          />
                        </Grid>
                        <Grid item md={6} sm={12}>
                          <Field
                            name={`${pathBase}[${idx}].typeOfSpaceOccupied.spaceType`}
                            path={`prospect.${pathBase}[${idx}].typeOfSpaceOccupied.spaceType`}
                            options={spaceTypeOptions}
                            component={CustomSelect}
                            shrink={false}
                          />
                          {values.organizationInfo.addressInfo[index].addressDetails[idx]
                            .typeOfSpaceOccupied.spaceType === OTHER_OPTION_CODE && (
                            <Field
                              name={`${pathBase}[${idx}].typeOfSpaceOccupied.others`}
                              path={`prospect.${pathBase}[${idx}].typeOfSpaceOccupied.others`}
                              label="Other(Specify)"
                              placeholder="Other(Specify)"
                              component={Input}
                            />
                          )}
                          <Field
                            name={`${pathBase}[${idx}].poBox`}
                            path={`prospect.${pathBase}[${idx}].poBox`}
                            label="PO Box Number"
                            placeholder="PO Box Number"
                            component={Input}
                          />
                          <Field
                            name={`${pathBase}[${idx}].country`}
                            path={`prospect.${pathBase}[${idx}].country`}
                            label="Country"
                            placeholder="Country"
                            disabled
                            component={Input}
                          />
                        </Grid>
                      </React.Fragment>
                    );
                  });
                })}
              </Grid>
              <div className={classes.infoTitleWrap}>
                <InfoTitle
                  classes={{ wrapper: classes.infoTitle }}
                  title="You guessed it, we will use this section for our communication with you"
                />
              </div>
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
