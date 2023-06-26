import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  Input,
  SelectAutocomplete
} from "../../../../../components/Form";
import { Upload } from "../../../../../components/Upload";
import { MOA_FILE_SIZE, TL_ACCEPTED_FILE_TYPES } from "../../../../../constants";
import { TL_COI_FILE_SIZE } from "../../../../../constants";
import { useStyles } from "../../styled";
import { virtualOrPhysicalAddressOptions } from "../../../../../constants/options";
import {
  MAX_FLAT_NUMBER_LENGTH,
  MAX_STREET_NUMBER_LENGTH
} from "../../../../FinalQuestions/components/CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";
import { POBOX_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../../utils/validation";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { initDocumentUpload, uploadDocuments } from "../../../../../store/actions/uploadDocuments";

export const MailingAddressSection = ({ setFieldValue: setFormFieldValue, id }) => {
  const classes = useStyles();
  const [isVirtualAddress, setIsVirtualAddress] = useState(true);
  const dispatch = useDispatch();
  const handleAddressTypeSelection = event => {
    if (event.target.value !== "virtual") {
      setIsVirtualAddress(false);
    } else {
      setIsVirtualAddress(true);
    }
  };

  const initialValues = {
    typeOfAddress: "virtual",
    addressLine1: "",
    poBox: "",
    addressLine2: "",
    emirateCity: "",
    country: "AE",
    addressProof: ""
  };

  const mailingAddressSchema = Yup.object().shape({
    country: Yup.string().required(),
    typeOfAddress: Yup.string().required(),
    addressLine2: Yup.string()
      .required(getRequiredMessage("Street / location"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street / Location")),
    addressLine1: Yup.string().when("typeOfAddress", {
      is: typeOfAddress => typeOfAddress === "physical",
      then: Yup.string()
        .required(getRequiredMessage("Office or shop number"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Office or shop number")),
      otherwise: Yup.string()
        .required(getRequiredMessage("Flat, villa or building"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat, villa or building"))
    }),
    poBox: Yup.string()
      .required(getRequiredMessage("PO Box Number"))
      .max(10, "Maximum ${max} characters allowed")
      .matches(POBOX_REGEX, getInvalidMessage("PO Box Number")),
    emirateCity: Yup.string().required(getRequiredMessage("Emirate/ City")),
    addressProof: Yup.mixed()
      .test("required", getRequiredMessage("Proof of address"), file => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", file => {
        return (
          file &&
          (file === true ||
            (file.size >= MOA_FILE_SIZE.minSize && file.size <= MOA_FILE_SIZE.maxSize))
        );
      })
  });

  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const handleDropFile = useCallback((acceptedFiles, name, touched, setTouched, setFieldValue) => {
    let file = acceptedFiles[0];
    if (file) {
      file.preview = URL.createObjectURL(file);
      file = { ...file, ...{ name: file.name, size: file.size } };
      setFieldValue(name, file);
      setTouched({ ...touched, ...{ [name]: true } });
      dispatch(
        uploadDocuments({
          docs: {
            "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof": file
          },
          documentSection: "companyAddressProof",
          onSuccess: () => () => {},
          onFailure: () => () => {}
        })
      );
    }
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mailingAddressSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, touched, setTouched, isValid, dirty, ...props }) => {
        const IsValidForm = mailingAddressSchema.isValidSync(values);
        return (
          <div>
            <Accordion
              title={"Mailing address"}
              id={id}
              setFormFieldValue={setFormFieldValue}
              isCompleted={IsValidForm}
            >
              <Grid container spacing={3}>
                <Grid item sm={12} xs={12}>
                  <div className={classes.virtualOrPhysicalAddressSelection}>
                    <Field
                      name="typeOfAddress"
                      datalistId="addressInfo[0].typeOfAddress"
                      path={"prospect.companyAdditionalInfo.addressInfo[0].typeOfAddress"}
                      options={virtualOrPhysicalAddressOptions}
                      component={CheckboxGroup}
                      typeOfCheckbox="radio"
                      onSelect={event => handleAddressTypeSelection(event)}
                    />
                  </div>
                </Grid>
                <Grid item sm={6} xs={12}>
                  {!isVirtualAddress && (
                    <Field
                      name="addressLine1"
                      label="Office or shop number"
                      path={
                        "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].addressLine1"
                      }
                      placeholder="Office or shop number"
                      InputProps={{
                        inputProps: { tabIndex: 1 }
                      }}
                      component={Input}
                    />
                  )}
                  {isVirtualAddress && (
                    <Field
                      name="addressLine1"
                      path={
                        "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].addressLine1"
                      }
                      label="Flat, villa or building"
                      placeholder="Flat, villa or building"
                      InputProps={{
                        inputProps: { tabIndex: 1 }
                      }}
                      component={Input}
                    />
                  )}
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="poBox"
                    path={"prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].poBox"}
                    label="P.O. Box"
                    placeholder="P.O. Box"
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="addressLine2"
                    label="Street or location"
                    path={
                      "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].addressLine2"
                    }
                    placeholder="Street or location"
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="emirateCity"
                    path={
                      "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].emirateCity"
                    }
                    label="Emirate or city"
                    placeholder="Emirate or city"
                    datalistId="emirateCity"
                    component={SelectAutocomplete}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="country"
                    path={"prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].country"}
                    label="Country"
                    placeholder="Country"
                    datalistId="country"
                    component={SelectAutocomplete}
                    disabled={true}
                  />
                </Grid>
                <Grid item sm={12}>
                  <Field
                    name="addressProof"
                    path="prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof"
                    type="file"
                    fieldDescription="Proof of Company Address"
                    helperText={
                      "Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                    }
                    accept={TL_ACCEPTED_FILE_TYPES}
                    fileSize={TL_COI_FILE_SIZE}
                    onDrop={acceptedFile =>
                      handleDropFile(
                        acceptedFile,
                        "addressProof",
                        touched,
                        setTouched,
                        setFieldValue
                      )
                    }
                    file={values.addressProof}
                    onDelete={() => setFieldValue("addressProof", "")}
                    component={Upload}
                    content={values?.addressProof?.name}
                  />
                </Grid>
              </Grid>
            </Accordion>
          </div>
        );
      }}
    </Formik>
  );
};
