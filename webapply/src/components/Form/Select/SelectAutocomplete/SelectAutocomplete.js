import React from "react";
import Select from "react-select";
import { getIn } from "formik";
import { FormControl } from "@material-ui/core";

import { ErrorMessage, ContextualHelp } from "./../../../Notifications";
import { Control, Option, IndicatorsContainer, MultiValue } from "./SelectAutocompleteComponents";
import { useStyles, customStyles } from "./styled";

const components = {
  Control,
  Option,
  IndicatorsContainer,
  MultiValue
};

export const SelectAutocomplete = ({
  extractValue = option => option.value,
  extractLabel = option => option.label || option.displayText,
  theme,
  label,
  shrink,
  options,
  field,
  form: { errors, touched, setFieldValue },
  multiple = false,
  disabled,
  contextualHelpText,
  ...props
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  const handleChange = selected => {
    const value = multiple
      ? (selected || []).map(item => extractValue(item))
      : extractValue(selected);

    return setFieldValue(field.name, value);
  };

  const renderValue = !multiple
    ? options.find(option => extractValue(option) === field.value)
    : options.filter(option => field.value.includes(option.value));

  return (
    <FormControl className="formControl" variant="outlined">
      <ContextualHelp title={contextualHelpText}>
        <Select
          {...field}
          {...props}
          options={options}
          classes={classes}
          styles={customStyles}
          components={components}
          value={renderValue}
          onChange={handleChange}
          isMulti={multiple}
          isDisabled={disabled}
          closeMenuOnSelect={!multiple}
          hideSelectedOptions={false}
          joinValues={true}
          delimiter=","
          placeholder=""
          textFieldProps={{
            label,
            error: isError,
            InputLabelProps: {
              shrink: !!renderValue
            }
          }}
          getOptionLabel={extractLabel}
        />
      </ContextualHelp>
      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
