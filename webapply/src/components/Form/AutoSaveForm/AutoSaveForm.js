import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";
import isEqual from "lodash/isEqual";

export const AutoSaveForm = ({ children, updateProspect, mapValues }) => {
  const { values } = useFormikContext();
  const ref = useRef();

  useEffect(() => {
    if (!isEqual(values, ref.current)) {
      ref.current = values;
      updateProspect(mapValues(values));
    }
  }, [values, updateProspect, mapValues]);

  return children;
};
