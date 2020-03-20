import React from "react";
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

  return (
    <AutoSaveField
      onChange={e => {
        setFieldValue(rest.name, e.target.value);
        getIn(values, linkedFieldName) && setFieldTouched(linkedFieldName, true);
        onChange(e);
      }}
      changeProspect={(prospect, value, path, errors) => {
        const newProspect = getIn(errors, linkedFieldName)
          ? {}
          : { ...prospect, [linkedPath]: getIn(values, linkedFieldName) };
        return changeProspect(newProspect, value, path, errors);
      }}
      {...rest}
    />
  );
};
