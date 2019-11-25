import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@material-ui/core/Grid";
import { ContinueButton } from "../../../../../../components/Buttons/ContinueButton";
import CustomCheckbox from "../../../../../../components/InputField/RefactoredCheckbox";
import { useStyles } from "./styled";
import { prospect } from "../../../../../../constants/config";
import { ADDRESS_NUMBER_REGEX, PO_NUMBER_REGEX } from "../../../../../../utils/validation";
import { CustomSelect, Input } from "../../../../../../components/Form";
import { emirateCityOptions } from "../../../CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";

const signatoryPreferredMailingAddressSchema = Yup.object().shape({
  signatoryInfo: Yup.object().shape({
    addressInfo: Yup.array().of(
      Yup.object().shape({
        addressDetails: Yup.array().of(
          Yup.object().shape({
            preferredAddress: Yup.string().required("Required"),
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
  organizationPoBox,
  organizationAddressFieldDesc,
  organizationEmirateCity,
  organizationAddressLine1,
  sameAsCompanyAddress
}) => {
  const classes = useStyles();
  // const checkboxHandleClick = value => {
  //   this.props.updateProspect({
  //     [`prospect.signatoryInfo[${index}]
  // .addressInfo[0].addressDetails[0].preferredAddress`]: value
  //       ? organizationAddressFieldDesc
  //       : "",
  //     [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].addressLine1`]: value
  //       ? organizationAddressLine1
  //       : "",
  //     [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].emirateCity`]: value
  //       ? organizationEmirateCity
  //       : "",
  //     [`prospect.signatoryInfo[${index}].addressInfo[0].addressDetails[0].poBox`]: value
  //       ? organizationPoBox
  //       : ""
  //   });
  // };

  const onSubmit = values => {
    handleContinue();
    console.log(values);
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        initialValues={{
          signatoryInfo: {
            addressInfo: prospect.signatoryInfo[index].addressInfo
          }
        }}
        onSubmit={onSubmit}
        validationSchema={signatoryPreferredMailingAddressSchema}
      >
        {({ values }) => {
          return (
            <Form>
              <Grid container spacing={3} className={classes.flexContainer}>
                {values.signatoryInfo.addressInfo.map((item, index) => {
                  const pathBase = `signatoryInfo.addressInfo[${index}].addressDetails`;
                  return item.addressDetails.map((address, idx) => {
                    return (
                      <React.Fragment key={address.preferredAddress}>
                        <CustomCheckbox
                          id="Sig.sameAsCompanyAddress"
                          indexes={[index]}
                          // callback={checkboxHandleClick}
                        />
                        <Grid container spacing={3} className={classes.flexContainer}>
                          <Grid item sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].addressFieldDesc`}
                              label="Flat / Villa / Building"
                              placeholder="Flat / Villa / Building"
                              component={Input}
                            />
                          </Grid>
                          <Grid item md={6} sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].addressLine1`}
                              label="Street / Location"
                              placeholder="Street / Location"
                              component={Input}
                            />
                            <Field
                              name={`${pathBase}[${idx}].emirateCity`}
                              options={emirateCityOptions}
                              component={CustomSelect}
                              shrink={false}
                            />
                          </Grid>
                          <Grid item md={6} sm={12}>
                            <Field
                              name={`${pathBase}[${idx}].poBox`}
                              label="PO Box Number"
                              placeholder="PO Box Number"
                              component={Input}
                            />
                            <Field
                              name={`${pathBase}[${idx}].country`}
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
