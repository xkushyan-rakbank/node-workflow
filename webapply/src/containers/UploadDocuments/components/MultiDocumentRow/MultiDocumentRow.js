import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";

import { cloneDeep } from "../../../../utils/cloneDeep";
import { documentValidationSchema } from "../../../../utils/validation";
import { UPLOADED } from "../../../../constants";
import { docUpload, addMultiDocument } from "../../../../store/actions/uploadDocuments";
import { DocumentRow } from "../../DocumentRow";
import { useStyles } from "../styled";
import { getAdditionalConfigs } from "../../../../store/selectors/appConfig";
// import {
//   getIsEditableStatusSearchInfo,
//   getProspectStatus
// } from "../../../../store/selectors/searchProspect";
// import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "../../constants";

// ro-assist-brd2-1
export const MultiDocumentRow = ({
  documents,
  type: docOwner,
  stakeholderIndex,
  infoMessage = "",
  limit = 1
}) => {
  const classes = useStyles();
  const inputEl = useRef(null);
  const dispatch = useDispatch();
  const [multiDoc, setMultiDoc] = useState(false);
  const [addMoreDisable, setAddMoreDisable] = useState(false);
  const [multiSelectedFile, setMultiSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  // const prospectStatusInfo = useSelector(getProspectStatus);
  const additionalConfigs = useSelector(getAdditionalConfigs)
  const isDisabledUploadForRO = false;
  //isApplyEditApplication && DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(prospectStatusInfo);
  useEffect(() => {
    if (limit > 1 && (documents.length > 1 || documents[0].uploadStatus === "Uploaded")) {
      setMultiDoc(true);
    } else {
      setMultiDoc(false);
    }
    const NotUploaded = documents.some(document => document.uploadStatus === "NotUploaded");
    const addMoreStatus = NotUploaded || (documents.length >= limit ? true : false);
    setAddMoreDisable(addMoreStatus);
  }, [documents, limit]);

  const index = documents.length + 1;

  const uploadMultiDocument = useCallback(
    (file, document = "") => {
      let newDocument = {};
      let documentIndex = 0;
      if (stakeholderIndex) {
        const docSplit = stakeholderIndex.split("_");
        documentIndex = docSplit[0] ? parseInt(docSplit[0]) : 0;
      }
      if (document) {
        newDocument = document ? cloneDeep(document) : [];
      } else {
        newDocument = documents[0] ? cloneDeep(documents[0]) : [];
        newDocument.documentKey = newDocument.documentType + "-" + documents.length;
        newDocument.required = false;
        newDocument.uploadStatus = "NotUploaded";
        newDocument.isSingleDocUpdated = false;
        newDocument.fileName = null;
        newDocument.fileSize = file.size;
        newDocument.fileFormat = file.type;
        newDocument.submittedBy = null;
        newDocument.submittedDt = null;
        const docProps = {
          stakeholderIndex,
          document: newDocument
        };
        dispatch(addMultiDocument(docProps));
      }
      setMultiSelectedFile(file);
      const { documentKey, documentType = "" } = newDocument;

      const fileInfo = JSON.stringify({ documentKey, documentType, documentIndex });
      const docProps = {
        uploadStatus: UPLOADED,
        isSingleDocUpdated: true,
        fileSize: file.size,
        submittedDt: file.lastModifiedDate,
        fileFormat: file.type
      };
      const data = new FormData();
      data.append("fileInfo", fileInfo);
      data.append("file", file);

      dispatch(
        docUpload({
          data,
          docProps,
          docOwner,
          documentType,
          documentKey,
          index,
          userFileName: file.name,
          stakeholderIndex,
          isDocUpdate: true
        })
      );
    },
    [docOwner, dispatch, index, stakeholderIndex, documents]
  );

  const fileUploadClick = event => (event.target.value = null);
  const fileUploadChange = useCallback(() => {
    const file = inputEl.current.files[0];

    try {
      setErrorMessage(null);
      documentValidationSchema(additionalConfigs).validateSync({ file }, { abortEarly: false });
      uploadMultiDocument(file);
    } catch (error) {
      return setErrorMessage(error.message);
    }
  }, [uploadMultiDocument]);

  return (
    <Grid container className={multiDoc ? classes.multiGrid : ""}>
      <Grid item sm={multiDoc ? 9 : 12} xs={12}>
        {documents.map((document, index) => (
          <DocumentRow
            key={`${document.documentType}-${document.documentKey}`}
            index={index}
            document={document}
            type={docOwner}
            infoMessage={!multiDoc ? infoMessage : null}
            stakeholderIndex={stakeholderIndex}
            docRemoveWarning={!multiDoc}
            multiDoc={true}
            uploadMultiDocument={(file, document) => uploadMultiDocument(file, document)}
            required={document.required}
            multiSelectedFile={multiSelectedFile}
          />
        ))}
      </Grid>
      {multiDoc && !isDisabledUploadForRO && (
        <>
          <Grid item sm={3} xs={12}>
            <input
              className={classes.defaultInput}
              name="file"
              type="file"
              onChange={fileUploadChange}
              onClick={fileUploadClick}
              ref={inputEl}
              disabled={addMoreDisable}
            />
            <p
              className={cx(
                classes.ControlsBox,
                classes.multiAddBtn,
                addMoreDisable ? classes.disabledMultiAddBtn : ""
              )}
              justify="flex-end"
              onClick={() => inputEl.current.click()}
            >
              Add More
            </p>
          </Grid>
          {errorMessage && <p className={classes.errorExplanation}>{errorMessage}</p>}
        </>
      )}
    </Grid>
  );
};
