import React, { useCallback, useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import PatternFormat from "react-number-format";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Upload } from "../../../../../components/Upload";
import { MOA_FILE_SIZE, TL_ACCEPTED_FILE_TYPES, TL_COI_FILE_SIZE } from "../../../../../constants";

import { useStyles } from "../../styled";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { initDocumentUpload, uploadDocuments } from "../../../../../store/actions/uploadDocuments";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../../../../CompanyInfo/constants";

const TextMask = ({ inputRef, ...rest }) => (
  <PatternFormat
    ref={ref => {
      inputRef(ref ? ref.inputElement : null);
    }}
    format="AE#####################"
    allowEmptyFormatting
    mask=" "
    {...rest}
  />
);

export const IBANField = props => (
  <Input
    label="IBAN of your UAE bank"
    placeholder="IBAN of your UAE bank"
    InputProps={{ inputComponent: TextMask }}
    {...props}
  />
);

export const SourceOfIncome = () => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const basePath = "prospect.signatoryInfo[0]stakeholderAdditionalInfo.sourceOfIncomeDetails";
  const dispatch = useDispatch();
  const initialValues = {
    sourceOfIncome: "",
    IBANType: "",
    IBAN: "",
    companyNameforSOF: "",
    proofOfIncome: "",
    tradeLicense: ""
  };

  const sourceOfIncomeValidationSchema = Yup.object().shape({
    sourceOfIncome: Yup.array().required(getRequiredMessage("Source of income")),
    IBANType: Yup.string().required(getRequiredMessage("IBAN type")),
    IBAN: Yup.string()
      .required(getRequiredMessage("IBAN"))
      .matches(/^AE\d{21}$/, "Invalid UAE IBAN format")
      .max(23, "IBAN must have a maximum of 23 characters"),
    proofOfIncome: Yup.mixed()
      .test("required", getRequiredMessage("Proof of income"), file => {
        if (file) return true;
        return false;
      })
      .test("fileSize", "The file is too large", file => {
        return (
          file &&
          (file === true ||
            (file.size >= MOA_FILE_SIZE.minSize && file.size <= MOA_FILE_SIZE.maxSize))
        );
      }),
    companyNameforSOF: Yup.string().when("IBANType", {
      is: IBANType => IBANType === "BARO",
      then: Yup.string()
        .required(getRequiredMessage("Company name"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed")
    }),
    tradeLicense: Yup.mixed().when("IBANType", {
      is: IBANType => IBANType === "BARO",
      then: Yup.mixed()
        .required(getRequiredMessage("TradeLicense"))
        .test("fileSize", "The file is too large", file => {
          return (
            file &&
            (file === true ||
              (file.size >= MOA_FILE_SIZE.minSize && file.size <= MOA_FILE_SIZE.maxSize))
          );
        })
    })
  });

  const handleDropFile = useCallback((acceptedFiles, name, touched, setTouched, setFieldValue) => {
    const file = acceptedFiles[0];
    if (file) {
      let path = "";
      if (name === "proofOfIncome") {
        path =
          "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.proofOfIncome";
      } else {
        path =
          "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.tradeLicense";
      }
      setIsUploading({ [name]: true });
      dispatch(
        uploadDocuments({
          docs: {
            [path]: file
          },
          documentSection: "stakeholdersDocuments.index_stakeholderName",
          onSuccess: () => {
            let fileStore = new File([file], file.name, { type: file.type });
            fileStore.preview = URL.createObjectURL(fileStore);
            fileStore = { ...fileStore, ...{ name: fileStore.name, size: fileStore.size } };

            setFieldValue(name, fileStore);
            setTouched({ ...touched, ...{ [name]: true } });
            setIsUploading({ [name]: false });
          },
          onFailure: () => {
            setFieldValue(name, "");
            setIsUploading({ [name]: false });
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const initialIsValid = sourceOfIncomeValidationSchema.isValidSync(initialValues);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={sourceOfIncomeValidationSchema}
      validateOnBlur={true}
      validateOnMount={true}
      isInitialValid={initialIsValid}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue, touched, setTouched, isValid, ...props }) => {
        const IsValidForm = sourceOfIncomeValidationSchema.isValidSync(values);
        const isBARO = values.IBANType === "BARO";
        return (
          <Accordion title={"Source of income"} id={"sourceOfIncome"} isCompleted={IsValidForm}>
            <>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Field
                    multiple
                    customCheckbox
                    name="sourceOfIncome"
                    path={`${basePath}.sourceOfIncome`}
                    datalistId="sourceOfIncome"
                    label={"Source of income"}
                    onChange={selectedValue => {
                      const withOption = selectedValue.includes("4");
                      const sourceOfWealth = selectedValue.map(value => ({
                        wealthType: value,
                        others: withOption ? values.others : ""
                      }));

                      setFieldValue("sourceOfIncome", sourceOfWealth);
                      if (!withOption) {
                        setFieldValue("others", "");
                      }
                    }}
                    extractValue={value => value.wealthType}
                    infoTitle={"You can select multiple options"}
                    infoIcon={true}
                    component={SelectAutocomplete}
                    tabIndex="0"
                    isSearchable
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="IBANType"
                    path={`${basePath}.IBANType`}
                    datalistId="internationalBankAccountNumber"
                    label="IBAN type"
                    placeholder="IBAN type"
                    component={SelectAutocomplete}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="IBAN"
                    isLoadDefaultValueFromStore={true}
                    path={`${basePath}.IBAN`}
                    component={IBANField}
                  />
                </Grid>
                {isBARO && (
                  <>
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="companyNameforSOF"
                        path={`${basePath}.companyNameforSOF`}
                        label="Company name"
                        placeholder="Company name"
                        InputProps={{
                          inputProps: { tabIndex: 1 }
                        }}
                        component={Input}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <Field
                        name="tradeLicense"
                        path="prospect.prospectDocuments.additionalStakeholderDocument.tradeLicense"
                        type="file"
                        fieldDescription="Upload Trade licence"
                        helperText={
                          "Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                        }
                        accept={TL_ACCEPTED_FILE_TYPES}
                        fileSize={TL_COI_FILE_SIZE}
                        onDrop={acceptedFile =>
                          handleDropFile(
                            acceptedFile,
                            "tradeLicense",
                            touched,
                            setTouched,
                            setFieldValue
                          )
                        }
                        file={values.tradeLicense}
                        onDelete={() => setFieldValue("tradeLicense", "")}
                        component={Upload}
                        content={values?.tradeLicense?.name}
                        isUploading={isUploading["tradeLicense"]}
                      />
                    </Grid>
                  </>
                )}

                <Grid item sm={12} xs={12}>
                  <div className={classes.horizontalLine} />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="proofOfIncome"
                    path="prospect.prospectDocuments.additionalStakeholderDocument.proofOfIncome"
                    type="file"
                    fieldDescription={"Proof of income"}
                    helperText={
                      "Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                    }
                    accept={TL_ACCEPTED_FILE_TYPES}
                    fileSize={TL_COI_FILE_SIZE}
                    component={Upload}
                    showInfoIcon={true}
                    // infoTitle={"You can select multiple options"}
                    // infoIcon={true}
                    onDrop={acceptedFile =>
                      handleDropFile(
                        acceptedFile,
                        "proofOfIncome",
                        touched,
                        setTouched,
                        setFieldValue
                      )
                    }
                    file={values.proofOfIncome}
                    onDelete={() => setFieldValue("proofOfIncome", "")}
                    content={values?.proofOfIncome?.name}
                    isUploading={isUploading["proofOfIncome"]}
                  />
                </Grid>
              </Grid>
            </>
          </Accordion>
        );
      }}
    </Formik>
  );
};
