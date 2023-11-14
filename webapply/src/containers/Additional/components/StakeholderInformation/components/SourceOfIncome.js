import React, { useCallback, useState } from "react";
import { FieldArray, Formik } from "formik";
import { Button, Grid, IconButton } from "@material-ui/core";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import PatternFormat from "react-number-format";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Upload } from "../../../../../components/Upload";
import {
  MOA_FILE_SIZE,
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../../constants";

import { useStyles } from "../../styled";
import { getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { uploadDocuments } from "../../../../../store/actions/uploadDocuments";
import { MAX_COMPANY_FULL_NAME_LENGTH } from "../../../../CompanyInfo/constants";
import { getDocuments, getSignatories } from "../../../../../store/selectors/appConfig";
import { useFindDocument } from "../../../../../utils/useFindDocument";
import { updateProspect } from "../../../../../store/actions/appConfig";
import { ALLOWED_CHAR_REGEX } from "../../../../../utils/validation";

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
    InputProps={{ inputComponent: TextMask, inputProps: { showInLineError: true } }}
    maxLength={23}
    fieldValueLength={props.field.value?.trim().length}
    {...props}
  />
);

export const SourceOfIncome = ({ id, refs }) => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState(false);
  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.sourceOfIncomeDetails";
  const signatoryName = useSelector(getSignatories)[0]?.fullName;
  const dispatch = useDispatch();

  const tradeLicenceDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.additionalDocuments ??
    null;

  const sourceOfIncomeDocuments =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.personalBankStatements
      ?.documents ?? null;

  const tradeLicenseKeyToCheck =
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.tradeLicense";

  const proofOfIncomeKeyToCheck =
    "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.proofOfIncome";

  const tradeLicense = useFindDocument(tradeLicenceDocuments, tradeLicenseKeyToCheck);
  const proofOfIncome = useFindDocument(sourceOfIncomeDocuments, proofOfIncomeKeyToCheck);
  const { showSOF } = useSelector(getSignatories)[0];

  const initialValues = {
    sourceOfIncome: [""],
    IBANType: "",
    IBAN: "",
    companyNameforSOF: "",
    proofOfIncome: proofOfIncome || [""],
    tradeLicense: tradeLicense[0] || "",
    showSOF
  };

  const { sourceOfIncomeFormRef, sourceOfIncomeAccordionRef } = refs;

  const sourceOfIncomeValidationSchema = Yup.object().shape({
    sourceOfIncome: Yup.array().test(
      "atLeastOneNonEmptyString",
      getRequiredMessage("Source of income"),
      value => {
        if (!Array.isArray(value)) {
          return false;
        }
        return value.some(str => str && str.trim() !== "");
      }
    ),
    IBANType: Yup.string().when("showSOF", (showSOF, schema) => {
      return showSOF
        ? schema.nullable().required(getRequiredMessage("IBAN type"))
        : schema.nullable();
    }),
    IBAN: Yup.string().when(["IBANType", "showSOF"], (IBANType, showSOF, schema) => {
      return IBANType !== "NOIB" && showSOF
        ? schema
            .matches(/^AE\d{21}$/, "Invalid UAE IBAN format")
            .max(23, "IBAN must have a maximum of 23 characters")
            .typeError(getRequiredMessage("IBAN"))
            .required(getRequiredMessage("IBAN"))
        : schema.nullable().notRequired();
    }),
    companyNameforSOF: Yup.string().when(["IBANType", "showSOF"], (IBANType, showSOF, schema) => {
      return IBANType === "BARO" && showSOF
        ? schema
            .typeError(getRequiredMessage("Company name"))
            .required(getRequiredMessage("Company name"))
            .max(MAX_COMPANY_FULL_NAME_LENGTH, "Maximum ${max} characters allowed")
        : schema.nullable().notRequired();
    }),
    proofOfIncome: Yup.array().when("showSOF", (showSOF, schema) => {
      return showSOF
        ? schema.of(
            Yup.mixed()
              .test("required", getRequiredMessage("Proof of income"), file => {
                if (file) return true;
                return false;
              })
              .test("fileSize", "The file is too large", file => {
                return (
                  file &&
                  (file === true ||
                    (file.fileSize >= TL_COI_FILE_SIZE.minSize &&
                      file.fileSize <= TL_COI_FILE_SIZE.maxSize))
                );
              })
          )
        : schema.nullable();
    }),
    tradeLicense: Yup.mixed().when(["IBANType", "showSOF"], (IBANType, showSOF, schema) => {
      return IBANType === "BARO" && showSOF
        ? schema
            .required(getRequiredMessage("TradeLicense"))
            .test("fileSize", "The file is too large", file => {
              return (
                file &&
                (tradeLicense ||
                  file === true ||
                  (file.fileSize >= MOA_FILE_SIZE.minSize &&
                    file.fileSize <= MOA_FILE_SIZE.maxSize))
              );
            })
        : schema.nullable();
    })
  });

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index) => {
      const file = acceptedFiles[0];
      if (file) {
        let path = "";
        let saveProspectPath = "";
        if (name.includes("proofOfIncome")) {
          path =
            "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.proofOfIncome";
          saveProspectPath = `stakeholdersDocuments.0_${[
            signatoryName
          ]}.personalBankStatements.documents`;
        } else {
          path =
            "prospect.prospectDocuments.stakeholderAdditionalInfo.sourceOfIncomeDetails.tradeLicense";
          saveProspectPath = `stakeholdersDocuments.0_${[signatoryName]}.additionalDocuments`;
        }
        let proofDoc = { ...isUploading };
        proofDoc[name || `proofOfIncome[${index}]`] = true;
        setIsUploading(proofDoc);
        dispatch(
          uploadDocuments({
            docs: {
              [path]: file
            },
            documentSection: "stakeholdersDocuments.index_stakeholderName.documents",
            onSuccess: () => {
              let fileStore = new File([file], file.name, { type: file.type });
              fileStore.preview = URL.createObjectURL(fileStore);
              fileStore = {
                ...fileStore,
                ...{ fileName: fileStore.name, fileSize: fileStore.size }
              };

              setFieldValue(name, fileStore);
              setTouched({ ...touched, ...{ [name]: true } });
              proofDoc[name || `proofOfIncome[${index}]`] = false;
              setIsUploading(proofDoc);
            },
            onFailure: () => {
              setFieldValue(name, "");
              proofDoc[name || `proofOfIncome[${index}]`] = false;
              setIsUploading(proofDoc);
            },
            index,
            saveProspectPath
          })
        );
      }
    },
    []
  );

  const initialIsValid = sourceOfIncomeValidationSchema.isValidSync(initialValues);

  const removeProofOfIncome = (indexToRemove, values, length, setFieldValue) => {
    const isMinLength = length === 1;

    if (setFieldValue) {
      setFieldValue(`proofOfIncome[${indexToRemove}]`, null);
    } else {
      isMinLength && setFieldValue("proofOfIncome", [""]);
      values["proofOfIncome"] && values["proofOfIncome"].splice(indexToRemove, 1);
      dispatch(
        updateProspect({
          "prospect.prospectDocuments.additionalStakeholderDocument.proofOfIncome": isMinLength
            ? []
            : values["proofOfIncome"]
        })
      );
    }
    const path = `prospect.documents.stakeholdersDocuments.0_${[
      signatoryName
    ]}.personalBankStatements.documents`;
    sourceOfIncomeDocuments.splice(indexToRemove, 1);
    dispatch(
      updateProspect({
        [path]: isMinLength ? [] : sourceOfIncomeDocuments
      })
    );
  };

  const removeTradeLicenseDoc = setFieldValue => {
    const path = `prospect.documents.stakeholdersDocuments.0_${[
      signatoryName
    ]}.additionalDocuments`;
    setFieldValue("tradeLicense", "");
    const updatedAdditionalDocuments = tradeLicenceDocuments?.filter(eachDoc => {
      return eachDoc.documentKey !== tradeLicenseKeyToCheck;
    });
    dispatch(
      updateProspect({
        [path]: updatedAdditionalDocuments,
        "prospect.prospectDocuments.additionalStakeholderDocument.tradeLicense": ""
      })
    );
  };

  const removeIbanNumber = (values, setFieldValue, touched, setTouched) => {
    setFieldValue("IBAN", null);
    removeTradeLicenseDoc(setFieldValue, touched, setTouched);

    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].stakeholderAdditionalInfo.sourceOfIncomeDetails.IBAN": ""
      })
    );
  };

  const setCompanyNameforSOFEmpty = setFieldValue => {
    setFieldValue("companyNameforSOF", "");
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].stakeholderAdditionalInfo.sourceOfIncomeDetails.companyNameforSOF":
          ""
      })
    );
  };

  const sourceOfIncomeInformation = (
    <div className={classes.descriptionSubField}>
      <p>
        Please provide any of the following documents (from the last 3 months) as proof of income:
      </p>
      <div className={classes.proofOfIncomePoints}>
        <ul>
          <li>Bank statement/credit card statement</li>
          <li>Salary certificate/labour contract/qualification degree</li>
          <li>Audited financial report</li>
        </ul>
      </div>
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={sourceOfIncomeValidationSchema}
      isInitialValid={initialIsValid}
      innerRef={sourceOfIncomeFormRef}
    >
      {({ values, setFieldValue, touched, setTouched, isValid, ...props }) => {
        const IsValidForm = sourceOfIncomeValidationSchema.isValidSync(values);
        const isBARO = values.IBANType === "BARO";
        const noIBAN = values.IBANType === "NOIB";
        return (
          <Accordion
            title={"Source of funds"}
            id={id}
            isCompleted={IsValidForm}
            classes={{
              accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
              accordionSummaryContentExpanded: classes.additionalInfoAccordionSummaryContentExpanded
            }}
            accordionRef={sourceOfIncomeAccordionRef}
          >
            <>
              <div className={classes.descriptionSubField}>
                <p>
                  To run a standard background check, we need the details of your employment and
                  qualifications as are relevant to your current position.
                </p>
              </div>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Field
                    multiple
                    customCheckbox
                    name="sourceOfIncome"
                    path={`${basePath}.sourceOfIncome`}
                    datalistId="sourceOfIncome"
                    label={""}
                    onChange={selectedValue => {
                      const sourceOfWealth = selectedValue.map(value => value);

                      setFieldValue("sourceOfIncome", sourceOfWealth);
                    }}
                    extractValue={value => value}
                    infoTitle={"You can select multiple options"}
                    infoIcon={true}
                    component={SelectAutocomplete}
                    tabIndex="0"
                    isSearchable
                  />
                </Grid>
                {showSOF && (
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="IBANType"
                      path={`${basePath}.IBANType`}
                      datalistId="internationalBankAccountNumber"
                      label="IBAN type"
                      placeholder="IBAN type"
                      component={SelectAutocomplete}
                      onChange={selectedValue => {
                        setFieldValue("IBANType", selectedValue);
                        if (selectedValue === "NOIB") {
                          removeIbanNumber(selectedValue, setFieldValue, touched, setTouched);
                          setCompanyNameforSOFEmpty(setFieldValue);
                        }
                      }}
                    />
                  </Grid>
                )}

                {showSOF && !noIBAN && (
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="IBAN"
                      label="IBAN of your UAE bank"
                      placeholder="IBAN of your UAE bank"
                      isLoadDefaultValueFromStore={true}
                      path={`${basePath}.IBAN`}
                      component={IBANField}
                      shrink={true}
                      disabled={noIBAN}
                    />
                  </Grid>
                )}
                {showSOF && isBARO && (
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
                        allowedCharRegex={ALLOWED_CHAR_REGEX}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <div style={{ marginBottom: "20px" }}>
                        <Field
                          name="tradeLicense"
                          path="prospect.prospectDocuments.additionalStakeholderDocument.tradeLicense"
                          type="file"
                          fieldDescription="Upload Trade License"
                          helperText={SUPPORTED_FILE_FORMAT_TEXT}
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
                          onDelete={() => removeTradeLicenseDoc(setFieldValue)}
                          component={Upload}
                          content={values?.tradeLicense}
                          isUploading={isUploading["tradeLicense"]}
                          mobilecontentPlaceholder={"Upload your file"}
                        />
                      </div>
                    </Grid>
                  </>
                )}
                {showSOF && (
                  <Grid container spacing={3} style={{ marginBottom: "20px" }}>
                    <FieldArray name="proofOfIncome">
                      {({ push, remove, arrayHelpers }) => (
                        <Grid item sm={12} xs={12}>
                          {values.proofOfIncome.map((file, index) => (
                            <div key={index} style={{ marginBottom: "20px" }}>
                              <Field
                                name={`proofOfIncome[${index}]`}
                                // eslint-disable-next-line max-len
                                path={`prospect.prospectDocuments.additionalStakeholderDocument.proofOfIncome[${index}]`}
                                type="file"
                                fieldDescription={"Proof of income"}
                                helperText={SUPPORTED_FILE_FORMAT_TEXT}
                                accept={TL_ACCEPTED_FILE_TYPES}
                                fileSize={TL_COI_FILE_SIZE}
                                component={Upload}
                                showInfoIcon={true}
                                // infoTitle={"You can select multiple options"}
                                // infoIcon={true}
                                onDrop={acceptedFile =>
                                  handleDropFile(
                                    acceptedFile,
                                    `proofOfIncome[${index}]`,
                                    touched,
                                    setTouched,
                                    setFieldValue,
                                    index
                                  )
                                }
                                file={values.proofOfIncome[index]}
                                onDelete={() =>
                                  removeProofOfIncome(
                                    index,
                                    values,
                                    values.proofOfIncome.length,
                                    setFieldValue
                                  )
                                }
                                content={values?.proofOfIncome[index]}
                                isUploading={isUploading[`proofOfIncome[${index}]`]}
                                mobilecontentPlaceholder={"Upload your file"}
                                notedText={index === 0 ? sourceOfIncomeInformation : null}
                              />
                              {index > 0 && (
                                <IconButton
                                  aria-label="delete"
                                  style={{
                                    padding: 0,
                                    marginTop: "5px",
                                    width: "100%",
                                    justifyContent: "end"
                                  }}
                                  onClick={() => removeProofOfIncome(index, values)}
                                >
                                  <HighlightOffIcon />
                                </IconButton>
                              )}
                            </div>
                          ))}
                          {values.proofOfIncome.length < 3 && (
                            <Button
                              color="primary"
                              variant="outlined"
                              className={classes.addMoreButton}
                              onClick={() => push("")}
                              disabled={!values.proofOfIncome[0]}
                            >
                              + Add more
                            </Button>
                          )}
                        </Grid>
                      )}
                    </FieldArray>
                  </Grid>
                )}
              </Grid>
            </>
          </Accordion>
        );
      }}
    </Formik>
  );
};
