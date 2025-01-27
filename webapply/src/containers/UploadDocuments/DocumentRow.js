/* eslint-disable max-len */
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DocumentRowComponent } from "./components/DocumentRow/DocumentRow";
import //getIsEditableStatusSearchInfo
//getProspectStatus
"../../store/selectors/searchProspect";
import { updateProspect } from "../../store/actions/appConfig";
import { cancelDocUpload, docUpload } from "../../store/actions/uploadDocuments";
import { getProgress, getUploadErrors } from "../../store/selectors/uploadDocuments";
import {
  getProspect,
  getOrganizationInfo,
  getOrgKYCDetails,
  getAdditionalConfigs
} from "../../store/selectors/appConfig";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import {
  COMPANY_DOCUMENTS,
  STAKEHOLDER_DOCUMENTS,
  UPLOADED,
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND
} from "../../constants";
//import { DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS } from "./constants";
import { appendDocumentKey } from "../../utils/documents";
import { multiDocumentValidation } from "../../utils/multiDocumentValidaton";

export const DocumentRow = ({
  document,
  type: docOwner,
  index,
  stakeholderIndex,
  docRemoveWarning = true,
  infoMessage = "",
  multiDoc = false,
  uploadMultiDocument = null,
  multiSelectedFile = null
}) => {
  let documentIndex = 0;
  if (stakeholderIndex) {
    const docSplit = stakeholderIndex.split("_");
    documentIndex = docSplit[0] ? parseInt(docSplit[0]) : 0;
  }
  const dispatch = useDispatch();
  //const isApplyEditApplication = useSelector(getIsEditableStatusSearchInfo);
  //const prospectStatusInfo = useSelector(getProspectStatus);
  const uploadErrors = useSelector(getUploadErrors);
  const progress = useSelector(getProgress);
  const prospect = useSelector(getProspect);
  const organizationInfo = useSelector(getOrganizationInfo);
  const orgKYCDetails = useSelector(getOrgKYCDetails);
  const additionalConfigs = useSelector(getAdditionalConfigs);
  const [selectedFile, setSelectedFile] = useState(null);
  // const isDisabledUploadForRO =
  //   isApplyEditApplication &&
  //DISABLED_STATUSES_FOR_UPLOAD_DOCUMENTS.includes(prospectStatusInfo);
  const isDisabledUploadForRO = false;
  const { documentKey, documentType = "", required } = document;
  const isUploaded = document.uploadStatus === UPLOADED;

  // ro-assist-brd2-1
  useEffect(() => {
    if (multiSelectedFile) {
      setSelectedFile(multiSelectedFile);
    }
  }, [multiSelectedFile]);

  const uploadDocument = useCallback(
    file => {
      if (!multiDoc) {
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
        setSelectedFile(file);
      } else {
        uploadMultiDocument(file, document);
        setSelectedFile(file);
      }
    },
    [
      documentKey,
      documentType,
      docOwner,
      dispatch,
      index,
      stakeholderIndex,
      multiDoc,
      uploadMultiDocument
    ]
  );

  // ro-assist-brd2-1
  const companyMultiDocDelete = (docs, docOwner) => {
    if (docs.length === 1) {
      dispatch(
        updateProspect({
          [`prospect.documents[${docOwner}].documents[${index}].uploadStatus`]: "NotUploaded",
          [`prospect.documents[${docOwner}].documents[${index}].isSingleDocUpdated`]: false,
          [`prospect.documents[${docOwner}].isDocUpdate`]: false
        })
      );
    } else {
      let newDocs = docs.filter((doc, docIndex) => parseInt(docIndex) !== parseInt(index));
      newDocs = appendDocumentKey(newDocs);
      newDocs = multiDocumentValidation(newDocs, docOwner, organizationInfo, orgKYCDetails);

      dispatch(
        updateProspect({
          [`prospect.documents[${docOwner}].documents`]: newDocs
        })
      );
    }
  };

  const stakeholderMultiDocDelete = (docs, docOwner) => {
    if (docs.length === 1) {
      dispatch(
        updateProspect({
          [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}][${docOwner}].documents[${index}].uploadStatus`]: "NotUploaded",
          [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}][${docOwner}].documents[${index}].isSingleDocUpdated`]: false,
          [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}][${docOwner}].isDocUpdate`]: false
        })
      );
    } else {
      let newDocs = docs.filter((doc, docIndex) => parseInt(docIndex) !== parseInt(index));
      newDocs = appendDocumentKey(newDocs);
      newDocs = multiDocumentValidation(newDocs, docOwner, organizationInfo, orgKYCDetails);

      dispatch(
        updateProspect({
          // eslint-disable-next-line max-len
          [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}][${docOwner}].documents`]: newDocs
        })
      );
    }
  };

  const fileUploadCancel = useCallback(() => {
    if (docOwner === COMPANY_DOCUMENTS) {
      var isLastCompDocUpdate = prospect.documents[docOwner].filter(
        companyDoc => companyDoc.uploadStatus === UPLOADED
      );
      if (isLastCompDocUpdate.length === 1) {
        dispatch(
          updateProspect({
            [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded",
            [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].isSingleDocUpdated`]: false,
            "prospect.documents.isCompanyDocUpdate": false
          })
        );
      } else {
        dispatch(
          updateProspect({
            [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].uploadStatus`]: "NotUploaded",
            [`prospect.documents[${COMPANY_DOCUMENTS}][${index}].isSingleDocUpdated`]: false
          })
        );
      }
    } else if (docOwner === COMPANY_BANK_STATEMENTS) {
      const existingDocs = prospect.documents[COMPANY_BANK_STATEMENTS].documents;
      companyMultiDocDelete(existingDocs, COMPANY_BANK_STATEMENTS);
    } else if (docOwner === COMPANY_ADDRESS_PROOF) {
      const existingDocs = prospect.documents[COMPANY_ADDRESS_PROOF].documents;
      companyMultiDocDelete(existingDocs, COMPANY_ADDRESS_PROOF);
    } else if (docOwner === COMPANY_INVOICES) {
      const existingDocs = prospect.documents[COMPANY_INVOICES].documents;
      companyMultiDocDelete(existingDocs, COMPANY_INVOICES);
    } else if (docOwner === STAKEHOLDER_DOCUMENTS) {
      var isLastStakholderDocUpdate = prospect.documents[docOwner][
        stakeholderIndex
      ].documents.filter(stakholderDoc => stakholderDoc.uploadStatus === UPLOADED);
      if (isLastStakholderDocUpdate.length === 1) {
        dispatch(
          updateProspect({
            [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].uploadStatus`]: "NotUploaded",
            [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].isSingleDocUpdated`]: false,
            [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].isDocUpdate`]: false
          })
        );
      } else {
        dispatch(
          updateProspect({
            [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].uploadStatus`]: "NotUploaded",
            [`prospect.documents[${STAKEHOLDER_DOCUMENTS}][${stakeholderIndex}].documents[${index}].isSingleDocUpdated`]: false
          })
        );
      }
    } else if (docOwner === PERSONAL_BANK_STATEMENTS) {
      const existingDocs =
        prospect.documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex].personalBankStatements
          .documents;
      stakeholderMultiDocDelete(existingDocs, PERSONAL_BANK_STATEMENTS);
    } else if (docOwner === PERSONAL_BACKGROUND) {
      const existingDocs =
        prospect.documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex].personalBackground.documents;
      stakeholderMultiDocDelete(existingDocs, PERSONAL_BACKGROUND);
    }
    dispatch(cancelDocUpload(documentKey));
    setSelectedFile(null);
    dispatch(sendProspectToAPI());
  }, [dispatch, docOwner, documentKey, index, stakeholderIndex, prospect]);

  const reUploadHandler = useCallback(() => {
    setSelectedFile(null);
  }, []);

  return (
    <DocumentRowComponent
      isUploadError={uploadErrors[documentKey]}
      isUploaded={isUploaded}
      isUploading={!!selectedFile && !isUploaded}
      percentComplete={isUploaded ? 100 : progress[documentKey] || 0}
      selectedFile={selectedFile}
      uploadDocument={uploadDocument}
      isDisabledUploadForRO={isDisabledUploadForRO}
      reUploadHandler={reUploadHandler}
      cancelHandler={fileUploadCancel}
      document={document}
      docRemoveWarning={docRemoveWarning}
      required={required}
      infoMessage={infoMessage}
      multiDoc={multiDoc}
      additionalConfigs={additionalConfigs}
    />
  );
};
