import { useMemo } from "react";

export const useFindDocument = (documentList, documentKey) => {
  const foundDocument = useMemo(() => documentList?.some(doc => doc.documentKey === documentKey), [
    documentList,
    documentKey
  ]);

  return foundDocument || "";
};
