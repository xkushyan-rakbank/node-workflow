import React, { useCallback } from "react";
import { useFormikContext, getIn } from "formik";
import { AutoSaveField } from "./AutoSaveField";

export const LinkedField = ({ linkedFieldName, linkedPath, onChange, changeProspect, ...rest }) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const linkedFieldValue = getIn(values, linkedFieldName);
  const onChangeHandler = useCallback(
    e => {
      setFieldValue(rest.name, e.target.value);
      linkedFieldValue && setFieldTouched(linkedFieldName, true);
      if (typeof onChange === "function") {
        onChange(e);
      }
    },
    [onChange, linkedFieldName, linkedFieldValue]
  );

  const changeProspectHandler = useCallback((prospect, value, path, errors) => {
    const newProspect = getIn(errors, linkedFieldName)
      ? {}
      : { ...prospect, [linkedPath]: getIn(values, linkedFieldName) };
    return changeProspect ? changeProspect(newProspect, value, path, errors) : newProspect;
  }, []);

  return (
    <AutoSaveField onChange={onChangeHandler} changeProspect={changeProspectHandler} {...rest} />
  );
};
