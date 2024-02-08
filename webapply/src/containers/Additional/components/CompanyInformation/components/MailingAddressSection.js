/* eslint-disable max-len */
import React, { forwardRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Button, Checkbox, Grid } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import {
  AutoSaveField as Field,
  Input,
  POBoxNumberInput,
  SelectAutocomplete
} from "../../../../../components/Form";
import { Upload } from "../../../../../components/Upload";
import {
  MOA_FILE_SIZE,
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES
} from "../../../../../constants";
import { TL_COI_FILE_SIZE } from "../../../../../constants";
import { useStyles } from "../../styled";
import { MAX_FLAT_NUMBER_LENGTH, MAX_STREET_NUMBER_LENGTH } from "../../../constants";
import {
  ADDRESS_REGEX,
  ADDRESS_VALIDATION_MESSAGE,
  ALLOWED_CHAR_REGEX,
  POBOX_REGEX
} from "../../../../../utils/validation";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { uploadDocuments } from "../../../../../store/actions/uploadDocuments";
import { getDocuments } from "../../../../../store/selectors/appConfig";
import { useFindDocument } from "../../../../../utils/useFindDocument";
import { updateProspect } from "../../../../../store/actions/appConfig";

// eslint-disable-next-line react/display-name
export const MailingAddressSection = forwardRef(({ id, refs }) => {
  const classes = useStyles();
  const [isUploading, setIsUploading] = useState({});
  const dispatch = useDispatch();

  const { mailAddressFormRef, mailAddressAccordionRef } = refs;
  const handleAddressTypeSelection = (event, setFieldValue) => {
    if (event.target.value === "virtual") {
      setFieldValue("typeOfAddress", "physical");
    } else {
      setFieldValue("typeOfAddress", "virtual");
    }
  };
  const documents = useSelector(getDocuments)?.companyAddressProof?.documents ?? null;

  const documentKeyToCheck =
    "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof";

  const addressProof = useFindDocument(documents, documentKeyToCheck) || [""];

  const initialValues = {
    typeOfAddress: "physical",
    addressLine1: "",
    poBox: "",
    addressLine2: "",
    emirateCity: "",
    country: "AE",
    addressProof
  };

  const mailingAddressSchema = Yup.object().shape({
    country: Yup.string().required(),
    typeOfAddress: Yup.string()
      .nullable()
      .notRequired(),
    addressLine2: Yup.string()
      .required(getRequiredMessage("Street / location"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(ADDRESS_REGEX, ADDRESS_VALIDATION_MESSAGE),
    addressLine1: Yup.string().when("typeOfAddress", {
      is: typeOfAddress => typeOfAddress === "physical",
      then: Yup.string()
        .required(getRequiredMessage("Office or shop number"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(ADDRESS_REGEX, ADDRESS_VALIDATION_MESSAGE),
      otherwise: Yup.string()
        .required(getRequiredMessage("Flat, villa or building"))
        // eslint-disable-next-line no-template-curly-in-string
        .max(MAX_FLAT_NUMBER_LENGTH, "Maximum ${max} characters allowed")
        .matches(ADDRESS_REGEX, ADDRESS_VALIDATION_MESSAGE)
    }),
    poBox: Yup.string()
      .nullable()
      .required(getRequiredMessage("PO box number"))
      .max(6, "Maximum ${max} characters allowed")
      .matches(POBOX_REGEX, getInvalidMessage("PO box bumber")),
    emirateCity: Yup.string().required(getRequiredMessage("Emirate/ City")),
    addressProof: Yup.array()
      .of(
        Yup.mixed()
          .test("required", getRequiredMessage("Proof of Address"), file => {
            if (file) return true;
            return false;
          })
          .test("fileSize", "The file is too large", file => {
            return (
              file &&
              (file === true ||
                (file.fileSize >= MOA_FILE_SIZE.minSize && file.fileSize <= MOA_FILE_SIZE.maxSize))
            );
          })
      )
      .min(1, "At least one file is required")
  });

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index) => {
      const file = acceptedFiles[0];
      if (file) {
        const path = "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof";

        let proofDoc = { ...isUploading };
        proofDoc[index] = true;
        setIsUploading(proofDoc);
        dispatch(
          uploadDocuments({
            docs: {
              [path]: file
            },
            documentSection: "companyAddressProof.documents",
            onSuccess: () => {
              let fileStore = new File([file], file.name, { type: file.type });
              fileStore.preview = URL.createObjectURL(fileStore);
              fileStore = {
                ...fileStore,
                ...{ fileName: fileStore.name, fileSize: fileStore.size }
              };

              setFieldValue(name, fileStore);
              setTouched({ ...touched, ...{ [name]: true } });
              proofDoc[index] = false;
              setIsUploading(proofDoc);
            },
            onFailure: () => {
              setFieldValue(name, "");
              proofDoc[index] = false;
              setIsUploading(proofDoc);
            },
            index
          })
        );
      }
    },
    []
  );
  const addAddressProofDocument = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, "");
  };

  const removeAddressProofDocument = (indexToRemove, values, length, setFieldValue) => {
    const isMinLength = length === 1;

    if (setFieldValue) {
      setFieldValue(`addressProof[${indexToRemove}]`, null);
    } else {
      isMinLength && setFieldValue("addressProof", [""]);
      values["addressProof"].splice(indexToRemove, 1);
      dispatch(
        updateProspect({
          "prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof": isMinLength
            ? []
            : values["addressProof"]
        })
      );
    }

    documents.splice(indexToRemove, 1);
    dispatch(
      updateProspect({
        "prospect.documents.companyAddressProof.documents": isMinLength ? [] : documents
      })
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mailingAddressSchema}
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={() => {}}
      innerRef={mailAddressFormRef}
    >
      {({
        values,
        setFieldValue,
        touched,
        setTouched,
        isValid,
        dirty,
        setFieldTouched,
        ...props
      }) => {
        const IsValidForm = mailingAddressSchema.isValidSync(values);
        const isSingleDocument = values.addressProof.length === 1;
        const hasFileName = values.addressProof[0]?.fileName;

        const isAddMoreButtonDisabled = isSingleDocument && !hasFileName;
        const typeOfAddress = values.typeOfAddress;
        return (
          <div>
            <Accordion
              title={"Mailing address"}
              id={id}
              isCompleted={IsValidForm}
              classes={{
                accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
                accordionSummaryContentExpanded:
                  classes.additionalInfoAccordionSummaryContentExpanded
              }}
              accordionRef={mailAddressAccordionRef}
            >
              <>
                <div className={classes.descriptionSubField}>
                  <p>
                    We need to know where your company receives mail and if you have a virtual or
                    physical office.
                  </p>
                </div>
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <div className={classes.virtualOrPhysicalContainer}>
                      <div className={classes.virtualOrPhysicalAddressSelection}>
                        <Field
                          name="typeOfAddress"
                          datalistId="addressInfo[0].typeOfAddress"
                          path={"prospect.companyAdditionalInfo.addressInfo[0].typeOfAddress"}
                          value={typeOfAddress}
                          component={Checkbox}
                          typeOfCheckbox="checkbox"
                          checked={typeOfAddress === "virtual"}
                          onChange={event => handleAddressTypeSelection(event, setFieldValue)}
                          tabIndex={1}
                        />
                        <label className={classes.virtualOfficeLabel}>
                          I have a virtual office
                        </label>
                      </div>
                    </div>
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {typeOfAddress === "physical" && (
                      <Field
                        name="addressLine1"
                        label="Office or shop number"
                        path={
                          "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].addressLine1"
                        }
                        placeholder="Office or shop number"
                        InputProps={{
                          inputProps: { tabIndex: 2, maxLength: 50, showInLineError: true }
                        }}
                        component={Input}
                        allowedCharRegex={ALLOWED_CHAR_REGEX}
                      />
                    )}
                    {typeOfAddress === "virtual" && (
                      <Field
                        name="addressLine1"
                        path={
                          "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].addressLine1"
                        }
                        label="Flat, villa or building"
                        placeholder="Flat, villa or building"
                        InputProps={{
                          inputProps: { tabIndex: 2, maxLength: 50, showInLineError: true }
                        }}
                        component={Input}
                        allowedCharRegex={ALLOWED_CHAR_REGEX}
                      />
                    )}
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name="poBox"
                      path={"prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].poBox"}
                      label="P.O. box"
                      placeholder="P.O. box"
                      component={Input}
                      InputProps={{
                        inputComponent: POBoxNumberInput,
                        inputProps: {
                          tabIndex: 3,
                          maxLength: 6,
                          showInLineError: true
                        }
                      }}
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
                        inputProps: {
                          tabIndex: 4,
                          maxLength: MAX_STREET_NUMBER_LENGTH,
                          showInLineError: true
                        }
                      }}
                      component={Input}
                      allowedCharRegex={ALLOWED_CHAR_REGEX}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="emirateCity"
                      path={
                        "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].emirateCity"
                      }
                      label="Emirate or City"
                      placeholder="Emirate or City"
                      datalistId="emirateCity"
                      component={SelectAutocomplete}
                      InputProps={{
                        inputProps: { tabIndex: 5 }
                      }}
                      tabIndex={5}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <Field
                      name="country"
                      path={
                        "prospect.companyAdditionalInfo.addressInfo[0].addressDetails[0].country"
                      }
                      label="Country"
                      placeholder="Country"
                      datalistId="country"
                      component={SelectAutocomplete}
                      disabled={true}
                      tabIndex={6}
                    />
                  </Grid>
                  <Grid item sm={12} xs={12}>
                    <FieldArray
                      name="addressProof"
                      render={arrayHelpers => (
                        <>
                          {values.addressProof?.map((item, index) => {
                            return (
                              <Grid
                                item
                                sm={12}
                                xs={12}
                                style={{
                                  textAlign: "right",
                                  marginBottom: index === 0 ? "25px" : ""
                                }}
                                key={index}
                              >
                                <Field
                                  name={`addressProof[${index}]`}
                                  path={`prospect.prospectDocuments.additionalCompanyDocument.companyAddressProof[${index}]`}
                                  type="file"
                                  fieldDescription="Proof of company address"
                                  helperText={SUPPORTED_FILE_FORMAT_TEXT}
                                  accept={TL_ACCEPTED_FILE_TYPES}
                                  fileSize={TL_COI_FILE_SIZE}
                                  onDrop={acceptedFile =>
                                    handleDropFile(
                                      acceptedFile,
                                      `addressProof[${index}]`,
                                      touched,
                                      setTouched,
                                      setFieldValue,
                                      index
                                    )
                                  }
                                  file={values.addressProof[index]?.fileName}
                                  onDelete={() =>
                                    removeAddressProofDocument(
                                      index,
                                      values,
                                      values.addressProof.length,
                                      setFieldValue
                                    )
                                  }
                                  // () => setFieldValue(`addressProof[${index}]`, null)}
                                  component={Upload}
                                  content={values.addressProof[index]}
                                  isUploading={isUploading[index]}
                                  mobilecontentPlaceholder={"Upload your file"}
                                />
                                {values.addressProof.length > 1 && index > 0 && (
                                  <IconButton
                                    aria-label="delete"
                                    style={{ padding: 0, marginTop: "5px" }}
                                    onClick={() => removeAddressProofDocument(index, values)}
                                  >
                                    <HighlightOffIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            );
                          })}
                          {values.addressProof.length < 3 && (
                            <Button
                              disabled={isAddMoreButtonDisabled}
                              color="primary"
                              variant="outlined"
                              className={classes.addMoreButton}
                              onClick={() =>
                                addAddressProofDocument(arrayHelpers, values.addressProof.length)
                              }
                            >
                              + Add more
                            </Button>
                          )}
                        </>
                      )}
                    />
                  </Grid>
                </Grid>
              </>
            </Accordion>
          </div>
        );
      }}
    </Formik>
  );
});
