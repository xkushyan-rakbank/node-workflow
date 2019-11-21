import React from "react";
import Select from "react-select";

import { getIn } from "formik";
import { FormControl } from "@material-ui/core";
import { ErrorMessage } from "./../../../Notifications";
import { Control, Option, IndicatorsContainer, MultiValue } from "./SelectAutocompleteComponents";
import { useStyles } from "./styled";

const components = {
  Control,
  Option,
  IndicatorsContainer,
  MultiValue
};

export const SelectAutocomplete = ({
  theme,
  label,
  shrink,
  field,
  form: { errors, touched, setFieldValue },
  options,
  multiple,
  ...props
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  const handleChange = value => setFieldValue(field.name, value);

  return (
    <FormControl className="formControl" variant="outlined">
      <Select
        {...field}
        {...props}
        isClearable={true}
        classes={classes}
        options={options}
        components={components}
        onChange={handleChange}
        isMulti={multiple}
        closeMenuOnSelect={!multiple}
        hideSelectedOptions={false}
        joinValues={true}
        delimiter=","
        placeholder=""
        textFieldProps={{
          label,
          error: isError
        }}
      />

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
