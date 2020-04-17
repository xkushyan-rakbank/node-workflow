import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getOverviewDocuments,
  getProspectOverviewId
} from "../../../store/selectors/searchProspect";
import { downloadDocumentFile } from "../../../store/actions/uploadDocuments";

import { Documents as DocumentsStep } from "./components/Documents";

export const Documents = props => {
  const dispatch = useDispatch();
  const prospectId = useSelector(getProspectOverviewId);
  const docs = useSelector(getOverviewDocuments) || {};

  const downloadDocument = useCallback(
    (documentKey, fileName) => dispatch(downloadDocumentFile(prospectId, documentKey, fileName)),
    [dispatch, prospectId]
  );

  return <DocumentsStep downloadDocument={downloadDocument} docs={docs} {...props} />;
};
