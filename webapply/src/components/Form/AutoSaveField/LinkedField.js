import React from "react";
import { useFormikContext, getIn } from "formik";
import get from "lodash/get";
import omit from "lodash/omit";
import { AutoSaveField } from "./AutoSaveField";

export const LinkedField = ({
  name,
  linkedFieldName,
  linkedPath,
  changeProspect = prospect => prospect,
  ...rest
}) => {
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  return (
    <AutoSaveField
      name={name}
      onChange={e => {
        setFieldValue(name, e.target.value);
        get(values, linkedFieldName) && setFieldTouched(linkedFieldName, true);
      }}
      changeProspect={(prospect, value, path, errors) => {
        const currentProspect = changeProspect(prospect, value, path, errors);
        const newProspect = getIn(errors, linkedFieldName)
          ? omit(currentProspect, path)
          : { ...currentProspect, [linkedPath]: get(values, linkedFieldName) };
        return newProspect;
      }}
      {...rest}
    />
  );
};
