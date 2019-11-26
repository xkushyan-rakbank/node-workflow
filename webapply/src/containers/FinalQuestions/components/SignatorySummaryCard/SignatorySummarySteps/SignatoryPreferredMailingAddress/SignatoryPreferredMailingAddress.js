import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import { useStyles } from "./styled";
import { ADDRESS_NUMBER_REGEX, PO_NUMBER_REGEX } from "../../../../../../utils/validation";
import {
  CustomSelect,
  Input,
  AutoSaveField as Field,
  Checkbox
} from "../../../../../../components/Form";
import { emirateCityOptions } from "../../../CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";

const signatoryPreferredMailingAddressSchema = Yup.object().shape({
  signatoryInfo: Yup.object().shape({
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
            emirateCity: Yup.string().required("Required")
          })
        )
      })
    )
  })
});

export const SignatoryPreferredMailingAddressComponent = ({
  index,
  handleContinue,
  organizationAddressInfo,
  signatoryAddressInfo,
  sameAsCompanyAddress,
  updateProspect
}) => {
  const classes = useStyles();

  function checkboxHandleClick({ addressFieldDesc, addressLine1, emirateCity, poBox }) {
    const basePath = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;
    updateProspect({
      [`${basePath}.addressFieldDesc`]: addressFieldDesc,
      [`${basePath}.addressLine1`]: addressLine1,
      [`${basePath}.emirateCity`]: emirateCity,
      [`${basePath}.poBox`]: poBox
    });
  }

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  const autoSavePathBase = `prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0]`;

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          signatoryInfo: {
            addressInfo: signatoryAddressInfo,
            sameAsCompanyAddress
          }
        }}
        onSubmit={onSubmit}
        validationSchema={signatoryPreferredMailingAddressSchema}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                {values.signatoryInfo.addressInfo.map((item, index) => {
                  const pathBase = `signatoryInfo.addressInfo[${index}].addressDetails`;
                  return item.addressDetails.map((address, idx) => {
                    return (
                      <React.Fragment key={`${address.country}${index}`}>
                        <Field
                          name="signatoryInfo.sameAsCompanyAddress"
                          path={`prospect.signatoryInfo[${index}].sameAsCompanyAddress`}
                          label="I don't have any suppliers"
                          component={Checkbox}
                          onChange={() => {
                            setFieldValue(
                              "signatoryInfo.sameAsCompanyAddress",
                              !values.signatoryInfo.sameAsCompanyAddress
                            );
                            const fieldValues = {
                              addressFieldDesc: !values.signatoryInfo.sameAsCompanyAddress
                                ? organizationAddressInfo[0].addressDetails[0].addressFieldDesc
                                : "",
                              addressLine1: !values.signatoryInfo.sameAsCompanyAddress
                                ? organizationAddressInfo[0].addressDetails[0].addressLine1
                                : "",
                              emirateCity: !values.signatoryInfo.sameAsCompanyAddress
                                ? organizationAddressInfo[0].addressDetails[0].emirateCity
                                : "",
                              poBox: !values.signatoryInfo.sameAsCompanyAddress
                                ? organizationAddressInfo[0].addressDetails[0].poBox
                                : ""
                            };
                            console.log(fieldValues);
                            checkboxHandleClick(fieldValues);
                            setFieldValue(
                              `${pathBase}[${idx}].addressFieldDesc`,
                              fieldValues.addressFieldDesc
                            );
                            setFieldValue(
                              `${pathBase}[${idx}].addressLine1`,
                              fieldValues.addressLine1
                            );
                            setFieldValue(
                              `${pathBase}[${idx}].emirateCity`,
                              fieldValues.emirateCity
                            );
                            setFieldValue(`${pathBase}[${idx}].poBox`, fieldValues.poBox);
                          }}
                        />
                        <Grid container spacing={3} className={classes.flexContainer}>
                          <Grid item sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].addressFieldDesc`}
                              path={`${autoSavePathBase}.addressFieldDesc`}
                              disabled={values.signatoryInfo.sameAsCompanyAddress}
                              label="Flat / Villa / Building"
                              placeholder="Flat / Villa / Building"
                              component={Input}
                            />
                          </Grid>
                          <Grid item md={6} sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].addressLine1`}
                              path={`${autoSavePathBase}.addressLine1`}
                              disabled={values.signatoryInfo.sameAsCompanyAddress}
                              label="Street / Location"
                              placeholder="Street / Location"
                              component={Input}
                            />
                            <Field
                              name={`${pathBase}[${idx}].emirateCity`}
                              path={`${autoSavePathBase}.emirateCity`}
                              disabled={values.signatoryInfo.sameAsCompanyAddress}
                              options={emirateCityOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                          </Grid>
                          <Grid item md={6} sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].poBox`}
                              path={`${autoSavePathBase}.poBox`}
                              disabled={values.signatoryInfo.sameAsCompanyAddress}
                              label="PO Box Number"
                              placeholder="PO Box Number"
                              component={Input}
                            />
                            <Field
                              name={`${pathBase}[${idx}].country`}
                              path={`${autoSavePathBase}.country`}
                              label="Country"
                              placeholder="Country"
                              disabled
                              component={Input}
                            />
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    );
                  });
                })}
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
