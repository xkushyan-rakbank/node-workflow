import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FieldArray } from "formik";
import { Button, IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { useStyles } from "./styled";
import { updateProspect } from "../../store/actions/appConfig";
import { Upload } from "../../components/Upload";
import { AutoSaveField as Field } from "../../components/Form";

import {
  SUPPORTED_FILE_FORMAT_TEXT,
  TL_ACCEPTED_FILE_TYPES,
  TL_COI_FILE_SIZE
} from "../../constants";
import { uploadDocuments } from "../../store/actions/uploadDocuments";
import { getOtherDocuments } from "../../store/selectors/appConfig";

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

export default function AdditionalDocument({
  additionalDocumentDetailsFromBPM,
  additionalDocumentDetailsForBPM,
  values,
  touched,
  setTouched,
  setFieldValue
}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const otherDocuments = useSelector(getOtherDocuments);

  const [isUploading, setIsUploading] = useState({});

  const handleDropFile = useCallback(
    (acceptedFiles, name, touched, setTouched, setFieldValue, index, additionalFile) => {
      const file = acceptedFiles[0];
      if (file) {
        let uploadingOBJ = { ...isUploading };
        uploadingOBJ[name] = true;
        setIsUploading(uploadingOBJ);
        dispatch(
          uploadDocuments({
            docs: [file],
            otherDocuments: {
              documentType: additionalFile.documentType,
              documentTitle: additionalFile.documentType
            },
            documentSection: "otherDocuments",
            onSuccess: responseName => {
              let fileStore = new File([file], responseName, { type: file.type });
              fileStore.preview = URL.createObjectURL(fileStore);
              fileStore.documentUniqueId = additionalFile.documentUniqueId;
              fileStore = {
                ...fileStore,
                ...{ fileName: fileStore.name, fileSize: fileStore.size }
              };

              setFieldValue(name, fileStore);
              setTouched({ ...touched, ...{ [name]: true } });
              uploadingOBJ[name] = false;
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
              uploadingOBJ[name] = false;
              setIsUploading(uploadingOBJ);
            },
            index
          })
        );
      }
    },
    [additionalDocumentDetailsForBPM]
  );

  const removeDoc = (indexToRemove, values, name, item, length, setFieldValue) => {
    const isMinLength = length === 1;
    const isDocTypeExist = additionalDocumentDetailsForBPM.filter(
      eachDoc => eachDoc.DocUniqueID === item.documentUniqueId
    );
    if (isDocTypeExist.length === 1) {
      isMinLength && setFieldValue(name, [""]);
    } else {
      values[name].splice(indexToRemove, 1);
    }

    const updatedDocsFormBPM = additionalDocumentDetailsForBPM.filter(
      eachDoc => eachDoc.DocResponse !== item.fileName
    );

    const updatedOtherDocuments = otherDocuments.filter(
      eachDoc => eachDoc.fileName !== item.fileName
    );

    dispatch(
      updateProspect({
        "prospect.additionalDataForBPM.additionalDocumentsBPM": updatedDocsFormBPM,
        "prospect.documents.otherDocuments": updatedOtherDocuments
      })
    );
  };

  const getFileName = (val, item) => {
    const found =
      otherDocuments && otherDocuments.find(element => element.fileName === item.fileName);
    if (found) {
      return found;
    }
    return val;
  };

  return additionalDocumentDetailsFromBPM ? (
    additionalDocumentDetailsFromBPM.map((additionalFile, index) => {
      const documentUniqueId = `doc_${additionalFile.documentUniqueId}`;
      const documentRemarks = additionalFile.documentRemarks.split("\n");
      const additionalDocCount =
        additionalFile.documentType === "Memorandum and Other Legal Mandate" ? 5 : 3;

      return (
        <div key={index} className={classes.innerCards}>
          <div className={classes.infoCont}>
            <span className={classes.infoLabel}>Document type:</span>
            <span className={classes.infoValue}>{additionalFile.documentType}</span>
          </div>
          <div className={classes.infoCont}>
            <span className={classes.infoLabel}>Query:</span>
            <span className={classes.infoValue}>
              {documentRemarks.map((line, index) => (
                <span key={index}>
                  {line}
                  {index !== documentRemarks.length - 1 && <br />}
                </span>
              ))}
            </span>
          </div>
          <FieldArray name={documentUniqueId}>
            {({ push, remove, arrayHelpers }) => (
              <>
                {values[documentUniqueId] &&
                  values[documentUniqueId].map((item, key) => (
                    <div key={key} className={classes.fileUpload}>
                      <Field
                        name={`doc_${additionalFile.documentUniqueId}.${key}`}
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
                        onDelete={() =>
                          removeDoc(
                            key,
                            values,
                            `doc_${additionalFile.documentUniqueId}`,
                            item,
                            values[documentUniqueId].length,
                            setFieldValue
                          )
                        }
                        content={getFileName(values[documentUniqueId][key], item)}
                        isUploading={isUploading[`doc_${additionalFile.documentUniqueId}.${key}`]}
                        mobilecontentPlaceholder={"Upload your file"}
                      />
                      {key > 0 && (
                        <div
                          style={{
                            display: "flex",
                            marginTop: "5px",
                            width: "100%",
                            justifyContent: "end"
                          }}
                        >
                          <IconButton
                            aria-label="delete"
                            style={{
                              padding: 0
                            }}
                            onClick={() =>
                              removeDoc(
                                key,
                                values,
                                `doc_${additionalFile.documentUniqueId}`,
                                item,
                                values[documentUniqueId].length,
                                setFieldValue
                              )
                            }
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  ))}
                {values[documentUniqueId] && values[documentUniqueId].length < additionalDocCount && (
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
    })
  ) : (
    <></>
  );
}
