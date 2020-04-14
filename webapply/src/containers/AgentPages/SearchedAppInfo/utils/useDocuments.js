import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getOverviewDocuments,
  getProspectOverviewId
} from "../../../../store/selectors/searchProspect";
import { downloadDocumentFile } from "../../../../store/actions/uploadDocuments";

export const useDocuments = () => {
  const dispatch = useDispatch();
  const prospectId = useSelector(getProspectOverviewId);

  const downloadDocument = useCallback(
    (documentKey, fileName) => dispatch(downloadDocumentFile(prospectId, documentKey, fileName)),
    [dispatch, prospectId]
  );

  return {
    downloadDocument,
    prospectId,
    docs: useSelector(getOverviewDocuments) || {}
  };
};
