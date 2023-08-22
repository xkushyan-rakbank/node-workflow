import React, { useCallback, useEffect, useState } from "react";
import { FieldArray, Formik } from "formik";
import { Button, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";

import {
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../constants";
import { useFormNavigation } from "../../components/FormNavigation/FormNavigationProvider";
import { useLayoutParams } from "../FormLayout";
import { useViewId } from "../../utils/useViewId";
import { useStyles } from "./styled";
import StakeholdersDetail from "../CompanyStakeholders/components/CompanyStakeholders/StakeholdersDetail";
import { AutoSaveField as Field, Input } from "../../components/Form";
import { Upload } from "../../components/Upload";
import {
  getAdditionalDocumentDetailsForBPM,
  getAdditionalDocumentDetailsFromBPM,
  getAdditionalInfoDetailsForBPM,
  getAdditionalInfoDetailsFromBPM
} from "../../store/selectors/appConfig";
import { Footer } from "../../components/Footer";
import { NextStepButton } from "../../components/Buttons/NextStepButton";
import { BackLink } from "../../components/Buttons/BackLink";
import routes from "../../routes";
import { updateProspect } from "../../store/actions/appConfig";
import { initDocumentUpload, uploadAdditionalDocuments } from "../../store/actions/uploadDocuments";

function updateAdditionalInfoBPM(newInfo, additionalInfoBPM) {
  // Create a copy of the original array
  const updatedInfoBPM = [...additionalInfoBPM];
  console.log(updatedInfoBPM);

  // Check if a matching QueryUniqueID exists in updatedInfoBPM
  const existingIndex = updatedInfoBPM.findIndex(
    info => info.QueryUniqueID === newInfo.QueryUniqueID
  );

  if (existingIndex !== -1) {
    // If it exists, update the QueryResponse in the copy
    updatedInfoBPM[existingIndex].QueryResponse = newInfo.QueryResponse;
  } else {
    // If it doesn't exist, add a new object to the copy
    updatedInfoBPM.push({
      QueryUniqueID: newInfo.QueryUniqueID,
      QueryResponse: newInfo.QueryResponse
    });
  }

  // Return the updated copy of additionalInfoBPM
  return updatedInfoBPM;
}

function updateAdditionalDocBPM(newInfo, additionalDocBPM) {
  // Create a copy of the original array
  const updatedDocBPM = [...additionalDocBPM];

  // Check if a matching QueryUniqueID exists in updatedDocBPM

  updatedDocBPM.push({
    DocUniqueID: newInfo.DocUniqueID,
    DocResponse: newInfo.DocResponse
  });

  // Return the updated copy of additionalDocBPM
  return updatedDocBPM;
}

export function AdditionalInformation({ stakeholderName }) {
  useFormNavigation([true, false]);
  useLayoutParams(true);
  useViewId();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [additionInfo, setAdditionalInfo] = useState([{}]);
  const [additionalDoc, setAdditionalDoc] = useState("");
  const [isUploading, setIsUploading] = useState({});

  //required detials requestes
  const additionalInfoDetailsFromBPM = useSelector(getAdditionalInfoDetailsFromBPM);
  const additionalDocumentDetailsFromBPM = useSelector(getAdditionalDocumentDetailsFromBPM);

  // sending details back to bpm through update prospect
  const additionalInfoDetailsForBPM = useSelector(getAdditionalInfoDetailsForBPM);
  const additionalDocumentDetailsForBPM = useSelector(getAdditionalDocumentDetailsForBPM);

  console.log(additionalInfoDetailsForBPM, "additionalInfoDetailsForBPM");
  useEffect(() => {
    dispatch(initDocumentUpload());
  }, []);

  useEffect(() => {
    const docList = {};
    const infoList = {};
    additionalDocumentDetailsFromBPM.forEach(eachDoc => {
      docList[`doc_${eachDoc.documentUniqueId}`] = [""];
    });
    additionalInfoDetailsFromBPM.forEach(eachDoc => {
      infoList[`info_${eachDoc.queryUniqueID}`] = "";
    });
    setAdditionalDoc(docList);
    setAdditionalInfo(infoList);
  }, [additionalDocumentDetailsFromBPM]);

  useEffect(() => {
    console.log(additionalDocumentDetailsForBPM, "additionalDocumentDetailsForBPM");
    console.log(additionalInfoDetailsForBPM, "additionalDocumentDetailsForBPM");
    const docFiles = {};
    if (additionalDocumentDetailsForBPM.length) {
      additionalDocumentDetailsForBPM.forEach(eachDoc => {
        const { DocUniqueID, DocResponse } = eachDoc;
        if (!docFiles[`doc_${DocUniqueID}`]) {
          docFiles[`doc_${DocUniqueID}`] = [];
        }

        // Push the current item to the corresponding array
        docFiles[`doc_${DocUniqueID}`].push({
          file: DocResponse,
          fileName: DocResponse,
          fieldDescription: DocResponse,
          documentUniqueId: DocUniqueID
        });
      });
    }
    const infoList = {};

    if (additionalInfoDetailsForBPM.length) {
      additionalInfoDetailsForBPM.forEach(eachDoc => {
        const { QueryUniqueID, QueryResponse } = eachDoc;
        if (!infoList[`info_${QueryUniqueID}`]) {
          infoList[`info_${QueryUniqueID}`] = [];
        }

        // Push the current item to the corresponding array
        infoList[`info_${QueryUniqueID}`].push(QueryResponse);
        console.log(infoList, "infoListinfoList");
      });
    }
    setAdditionalInfo(infoList);
    setAdditionalDoc(docFiles);

    console.log("docFiles", docFiles);
    console.log("infoList", infoList);
  }, []);

  const initialValues = {
    ...(additionInfo && additionInfo),
    ...(additionalDoc && additionalDoc)
  };

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index, additionalFile) => {
      const file = acceptedFiles[0];
      if (file) {
        let uploadingOBJ = { ...isUploading };
        uploadingOBJ[name] = true;
        setIsUploading(uploadingOBJ);
        dispatch(
          uploadAdditionalDocuments({
            docs: file,
            docItem: additionalFile.documentType,
            onSuccess: responseName => {
              let fileStore = new File([file], file.name, { type: file.type });
              fileStore.preview = URL.createObjectURL(fileStore);
              fileStore = {
                ...fileStore,
                ...{ fileName: fileStore.name, fileSize: fileStore.size }
              };

              setFieldValue(name, fileStore);
              setTouched({ ...touched, ...{ [name]: true } });
              uploadingOBJ[index || name] = false;
              setIsUploading(uploadingOBJ);
              const newDoc = {
                DocUniqueID: additionalFile.documentUniqueId,
                DocResponse: responseName
              };
              const payload = updateAdditionalDocBPM(newDoc, additionalDocumentDetailsForBPM);
              dispatch(
                updateProspect({ "prospect.additionalDataForBPM.additionalDocumentsBPM": payload })
              );
            },
            onFailure: () => {
              setFieldValue(name, "");
              uploadingOBJ[index || name] = false;
              setIsUploading(uploadingOBJ);
            },
            index
          })
        );
      }
    },
    [additionalDocumentDetailsForBPM]
  );

  const onChange = (ev, info, setFieldValue) => {
    // clearTimeout(timeOutId);
    const { name, value } = ev.target;
    setFieldValue([name], value);
    const newInfo = {
      QueryUniqueID: info.queryUniqueID,
      QueryResponse: value
    };
    let payload = updateAdditionalInfoBPM(newInfo, additionalInfoDetailsForBPM);
    console.log(newInfo, additionalInfoDetailsForBPM, payload, "newInfo");
    dispatch(updateProspect({ "prospect.additionalDataForBPM.additionalInfoBPM": payload }));

    // const timeOutId = setTimeout(() => {
    // }, 2000);
  };

  return additionalDoc ? (
    <Formik
      initialValues={initialValues}
      //   validateOnChange={true}
      //   validationSchema={backgroundSchema}
    >
      {({ touched, setTouched, setFieldValue, values, isValid, errors }) => {
        return (
          <div className={classes.additionalInformationWrapper}>
            <div className={classes.companyNameinfoContainer}>
              <StakeholdersDetail name={stakeholderName} />
            </div>
            <span className={classes.informationType}>Required information</span>
            {additionalInfoDetailsFromBPM.map((info, index) => {
              const queryType = `info_${info.queryUniqueID}`;
              return (
                <div key={index} className={classes.innerCards}>
                  <div className={classes.infoType}>
                    <div className={classes.infoCont}>
                      <span className={classes.infoLabel}>Nature of enquriy :</span>
                      <span className={classes.infoValue}>{info.queryCategory}</span>
                    </div>
                    <div className={classes.infoCont}>
                      <span className={classes.infoLabel}>Enquirey Detail</span>
                      <span className={classes.infoValue}>{info.queryType}</span>
                    </div>
                  </div>
                  <div className={classes.infoType}>
                    <div className={classes.infoCont}>
                      <span className={classes.infoLabel}>Query:</span>
                      <span className={classes.infoValue}>{info.queryRemarks}</span>
                    </div>
                  </div>
                  <div className={classes.textArea}>
                    <Field
                      name={queryType}
                      label="Write response:"
                      multiline
                      minRows="3"
                      InputProps={{
                        inputProps: { tabIndex: 0, maxLength: 200000, minLength: 100 }
                      }}
                      onChange={ev => onChange(ev, info, setFieldValue)}
                      component={Input}
                      classes={{
                        formControlRoot: classes.customUrlLabel,
                        input: classes.textAreaStyle
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {/* <div className={classes.innerCards}>
              <div className={classes.infoType}>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Nature of enquriy :</span>
                  <span className={classes.infoValue}>Source of fund</span>
                </div>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Enquirey Detail</span>
                  <span className={classes.infoValue}>Sample Test</span>
                </div>
              </div>
              <div className={classes.infoType}>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Query:</span>
                  <span className={classes.infoValue}>
                    Lorem Ipsum is simply dummy text of the printing
                  </span>
                </div>
              </div>
              <div className={classes.textArea}>
                <Field
                  name="backgroundInfo"
                  label="Write response:"
                  multiline
                  minRows="3"
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 1000, minLength: 100 }
                  }}
                  component={Input}
                  classes={{
                    formControlRoot: classes.customUrlLabel,
                    input: classes.textAreaStyle
                  }}
                />
              </div>
            </div>
            <div className={classes.innerCards}>
              <div className={classes.infoType}>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Nature of enquriy :</span>
                  <span className={classes.infoValue}>Source of fund</span>
                </div>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Enquirey Detail</span>
                  <span className={classes.infoValue}>Sample Test</span>
                </div>
              </div>
              <div className={classes.infoType}>
                <div className={classes.infoCont}>
                  <span className={classes.infoLabel}>Query:</span>
                  <span className={classes.infoValue}>
                    Lorem Ipsum is simply dummy text of the printingLorem Ipsum is simply dummy text
                    of the printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is
                    simply dummy text of the printingLorem Ipsum is simply dummy text of the
                    printingLorem Ipsum is simply dummy text of the printingLorem Ipsum is simply
                    dummy text of the printingLorem Ipsum is simply dummy text of the printing
                  </span>
                </div>
              </div>
              <div className={classes.textArea}>
                <Field
                  name="backgroundInfo"
                  label="Write response:"
                  multiline
                  minRows="10"
                  InputProps={{
                    inputProps: { tabIndex: 0, maxLength: 1000, minLength: 100 }
                  }}
                  component={Input}
                  classes={{
                    formControlRoot: classes.customUrlLabel,
                    input: classes.textAreaStyle
                  }}
                />
              </div>
            </div> */}

            {additionalDocumentDetailsFromBPM.length > 0 && (
              <span className={classes.informationType}>Required Document(s)</span>
            )}

            {additionalDocumentDetailsFromBPM.map((additionalFile, index) => {
              const documentUniqueId = `doc_${additionalFile.documentUniqueId}`;
              return (
                <div key={index} className={classes.innerCards}>
                  <div className={classes.infoCont}>
                    <span className={classes.infoLabel}>Document type:</span>
                    <span className={classes.infoValue}>{additionalFile.documentType}</span>
                  </div>
                  <div className={classes.infoCont}>
                    <span className={classes.infoLabel}>Query:</span>
                    <span className={classes.infoValue}>{additionalFile.documentRemarks}</span>
                  </div>
                  <FieldArray name={documentUniqueId}>
                    {({ push, remove, arrayHelpers }) => (
                      <>
                        {values[documentUniqueId].map((item, key) => (
                          <div key={key} className={classes.fileUpload}>
                            <Field
                              name={`doc_${additionalFile.documentUniqueId}.${key}`}
                              // eslint-disable-next-line max-len
                              //   path={`prospect.prospectDocuments.additionalStakeholderDocument.proofOfIncome[${index}]`}
                              type="file"
                              fieldDescription={additionalFile.documentType}
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
                                  `doc_${additionalFile.documentUniqueId}.${key}`,
                                  touched,
                                  setTouched,
                                  setFieldValue,
                                  key,
                                  additionalFile
                                )
                              }
                              file={values[documentUniqueId][key]}
                              //   onDelete={() =>
                              //     removeProofOfIncome(
                              //       index,
                              //       values,
                              //       values.proofOfIncome.length,
                              //       setFieldValue
                              //     )
                              //   }
                              content={values[documentUniqueId][key]}
                              isUploading={
                                isUploading[`doc_${additionalFile.documentUniqueId}.${key}`]
                              }
                              mobilecontentPlaceholder={"Upload your file"}
                            />
                            {key > 0 && (
                              <IconButton
                                aria-label="delete"
                                style={{
                                  padding: 0,
                                  marginTop: "5px",
                                  width: "100%",
                                  justifyContent: "end"
                                }}
                                // onClick={() => removeProofOfIncome(index, values)}
                              >
                                <HighlightOffIcon />
                              </IconButton>
                            )}
                          </div>
                        ))}
                        {values[documentUniqueId].length < 3 && (
                          <Button
                            color="primary"
                            variant="outlined"
                            className={classes.addMoreButton}
                            onClick={() => push("")}
                            disabled={!values[documentUniqueId][0]}
                          >
                            + Add more
                          </Button>
                        )}
                      </>
                    )}
                  </FieldArray>
                </div>
              );
            })}
            <Footer>
              <BackLink path={routes.comeBackLogin} isTypeButton={true} />
              <NextStepButton
                justify="flex-end"
                display="block"
                label="Submit"
                type="button"
                // disabled={!isCompanyInfoValid}
                handleClick={() => {}}
              />
            </Footer>
          </div>
        );
      }}
    </Formik>
  ) : (
    <></>
  );
}
