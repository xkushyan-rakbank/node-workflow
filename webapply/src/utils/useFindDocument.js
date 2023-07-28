import { useMemo } from "react";

export const useFindDocument = (documentList, documentKey) => {
  const foundDocument = useMemo(
    () => documentList?.filter(doc => doc && doc?.documentKey.includes(documentKey)),
    [documentList, documentKey]
  );

  return foundDocument && foundDocument.length ? foundDocument : "";
};
