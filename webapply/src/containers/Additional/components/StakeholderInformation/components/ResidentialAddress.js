import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import {
  Input,
  AutoSaveField as Field,
  SelectAutocomplete,
  POBoxNumberInput
} from "../../../../../components/Form";
import { getInvalidMessage, getRequiredMessage } from "../../../../../utils/getValidationMessage";
import { POBOX_REGEX, SPECIAL_CHARACTERS_REGEX } from "../../../../../utils/validation";
import { MAX_STREET_NUMBER_LENGTH } from "../../../../FinalQuestions/components/CompanySummaryCard/CompanySummarySteps/CompanyPreferredMailingAddress/constants";
import { useStyles } from "../../styled";
import { useFindDocument } from "../../../../../utils/useFindDocument";
import { getDocuments, getSignatories } from "../../../../../store/selectors/appConfig";
import {
  MOA_FILE_SIZE,
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../../../../constants";
import { uploadDocuments, initDocumentUpload } from "../../../../../store/actions/uploadDocuments";
import { updateProspect } from "../../../../../store/actions/appConfig";
import { Upload } from "../../../../../components/Upload";
import { ContexualHelp } from "../../../../../components/Notifications";

export const ResidentialAddress = ({ setFieldValue: setFormFieldValue, id, refs }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const signatoryName = useSelector(getSignatories)[0]?.fullName;

  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  const basePath = "prospect.signatoryInfo[0].stakeholderAdditionalInfo.residentialAddress";
  const documents =
    useSelector(getDocuments)?.stakeholdersDocuments?.[`0_${signatoryName}`]?.additionalDocuments ??
    null;
  const addressProofeKeyToCheck =
    "prospect.prospectDocuments.stakeholderAdditionalInfo.addressProof";
  const addressProof = useFindDocument(documents, addressProofeKeyToCheck);

  const initialValues = {
    addressLine1: "",
    addressLine2: "",
    country: "AE",
    emirateCity: "",
    poBox: "",
    addressProof: addressProof || [""]
  };

  const residentialAddressSchema = Yup.object().shape({
    country: Yup.string().required(),
    addressLine1: Yup.string()
      .nullable()
      .required(getRequiredMessage("Flat, villa or building"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Flat, villa or building")),
    addressLine2: Yup.string()
      .nullable()
      .required(getRequiredMessage("Street or location"))
      // eslint-disable-next-line no-template-curly-in-string
      .max(MAX_STREET_NUMBER_LENGTH, "Maximum ${max} characters allowed")
      .matches(SPECIAL_CHARACTERS_REGEX, getInvalidMessage("Street or location")),
    poBox: Yup.string()
      .nullable()
      .required(getRequiredMessage("P.O. Box number"))
      .max(6, "Maximum ${max} characters allowed")
      .matches(POBOX_REGEX, getInvalidMessage("P.O. Box number")),
    emirateCity: Yup.string()
      .nullable()
      .required(getRequiredMessage("Emirate or city")),
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
        let path = "prospect.prospectDocuments.stakeholderAdditionalInfo.addressProof";
        let saveProspectPath = `stakeholdersDocuments.0_${[signatoryName]}.additionalDocuments`;
        let proofDoc = { ...isUploading };
        proofDoc[index || name] = true;
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
              proofDoc[index || name] = false;
              setIsUploading(proofDoc);
            },
            onFailure: () => {
              setFieldValue(name, "");
              proofDoc[index || name] = false;
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

  const removeAddressProofDocument = (indexToRemove, values, length, setFieldValue) => {
    const isMinLength = length === 1;

    if (setFieldValue) {
      setFieldValue(`addressProof[${indexToRemove}]`, null);
    } else {
      isMinLength && setFieldValue("addressProof", [""]);
      values["addressProof"].splice(indexToRemove, 1);
      dispatch(
        updateProspect({
          "prospect.prospectDocuments.additionalStakeholderDocument.addressProof": isMinLength
            ? []
            : values["addressProof"]
        })
      );
    }
    const path = `prospect.documents.stakeholdersDocuments.0_${[
      signatoryName
    ]}.additionalDocuments`;
    documents.splice(indexToRemove, 1);
    dispatch(
      updateProspect({
        [path]: isMinLength ? [] : documents
      })
    );
  };

  const { residentialFormRef, residentialAccordionRef } = refs;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={residentialAddressSchema}
      validateOnChange={true}
      innerRef={residentialFormRef}
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
        const isValidForm = residentialAddressSchema.isValidSync(values);
        return (
          <Accordion
            title={"Residential address"}
            id={id}
            setFormFieldValue={setFormFieldValue}
            isCompleted={isValidForm}
            classes={{
              accordionSummaryContent: classes.additionalInfoAccordionSummaryContent,
              accordionSummaryContentExpanded: classes.additionalInfoAccordionSummaryContentExpanded
            }}
            accordionRef={residentialAccordionRef}
          >
            <div>
              <div className={classes.descriptionSubField}>
                <p>Enter your residential address (where you are located).</p>
              </div>

              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="addressLine1"
                    path={`${basePath}.addressLine1`}
                    label="Flat, villa or building"
                    placeholder="Flat, villa or building"
                    InputProps={{
                      inputProps: { tabIndex: 1, maxLength: 50 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Field
                    name="poBox"
                    path={`${basePath}.poBox`}
                    label="P.O. Box"
                    placeholder="P.O. Box"
                    InputProps={{
                      inputComponent: POBoxNumberInput,
                      inputProps: {
                        tabIndex: 0,
                        maxLength: 6
                      }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="addressLine2"
                    path={`${basePath}.addressLine2`}
                    label="Street or location"
                    placeholder="Street or location"
                    InputProps={{
                      inputProps: { tabIndex: 1, maxLength: 50 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="emirateCity"
                    path={`${basePath}.emirateCity`}
                    label="Emirate or city"
                    placeholder="Emirate or city"
                    datalistId="emirateCity"
                    component={SelectAutocomplete}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="country"
                    path={`${basePath}.country`}
                    label="Country"
                    placeholder="Country"
                    datalistId="country"
                    component={SelectAutocomplete}
                    disabled={true}
                  />
                </Grid>
                <Grid item sm={12}>
                  <FieldArray name="addressProof">
                    {({ push, remove, arrayHelpers }) => (
                      <Grid item sm={12} xs={12}>
                        <label className="uploadFileDescription">
                          Proof of Address (max up to 3)
                          <ContexualHelp
                            title={"Tenancy contract, Utility bills"}
                            placement="right"
                            isDisableHoverListener={false}
                          >
                            <HelpOutlineIcon className={classes.helperIcon} />
                          </ContexualHelp>
                        </label>
                        {values.addressProof.map((file, index) => (
                          <div key={index} style={{ marginBottom: "20px" }}>
                            <Field
                              name={`addressProof[${index}]`}
                              // eslint-disable-next-line max-len
                              path={`prospect.prospectDocuments.additionalStakeholderDocument.addressProof[${index}]`}
                              type="file"
                              fieldDescription={""}
                              helperText={SUPPORTED_FILE_FORMAT_TEXT}
                              accept={TL_ACCEPTED_FILE_TYPES}
                              fileSize={TL_COI_FILE_SIZE}
                              component={Upload}
                              showInfoIcon={true}
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
                              file={values.addressProof[index]}
                              onDelete={() =>
                                removeAddressProofDocument(
                                  index,
                                  values,
                                  values.addressProof.length,
                                  setFieldValue
                                )
                              }
                              content={values?.addressProof[index]}
                              isUploading={isUploading[index]}
                              mobilecontentPlaceholder={"Upload your file"}
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
                                onClick={() => removeAddressProofDocument(index, values)}
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            )}
                          </div>
                        ))}
                        {values.addressProof.length < 3 && (
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.addMoreButton}
                            onClick={() => push("")}
                            disabled={!values.addressProof[0]}
                          >
                            + Add more
                          </Button>
                        )}
                      </Grid>
                    )}
                  </FieldArray>
                </Grid>
              </Grid>
            </div>
          </Accordion>
        );
      }}
    </Formik>
  );
};
