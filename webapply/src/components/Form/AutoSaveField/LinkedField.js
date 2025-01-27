import React, { useCallback } from "react";
import { useFormikContext, getIn } from "formik";
import { AutoSaveField } from "./AutoSaveField";

export const LinkedField = ({
  linkedFieldName,
  linkedPath,
  onChange = () => {},
  changeProspect = prospect => prospect,
  ...rest
}) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();
  const linkedFieldValue = getIn(values, linkedFieldName);

  const onChangeHandler = useCallback(
    e => {
      setFieldValue(rest.name, e.target.value);
      linkedFieldValue && setFieldTouched(linkedFieldName, true);
      onChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linkedFieldValue]
  );

  const changeProspectHandler = useCallback(
    (prospect, value, path, errors) => {
      const newProspect = getIn(errors, linkedFieldName)
        ? {}
        : { ...prospect, [linkedPath]: linkedFieldValue };
      return changeProspect(newProspect, value, path, errors);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [linkedFieldValue]
  );

  return (
    <AutoSaveField onChange={onChangeHandler} changeProspect={changeProspectHandler} {...rest} />
  );
};
