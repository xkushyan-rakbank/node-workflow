import React, { useState } from "react";
import Select from "react-select";
import { getIn } from "formik";
import { FormControl } from "@material-ui/core";

import { ErrorMessage, ContexualHelp } from "./../../../Notifications";
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
  contextualHelpProps,
  onChange = value => setFieldValue(field.name, value),
  ...props
}) => {
  const classes = useStyles({
    ...props,
    disabled
  });
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const [hasFocus, setFocus] = useState(false);

  const handleChange = selected => {
    const value = multiple ? (selected || []).map(item => item.value) : extractValue(selected);

    return onChange(value);
  };

  const renderValue = !multiple
    ? options.find(option => extractValue(option) === field.value)
    : options.filter(option => (field.value || []).map(extractValue).includes(option.value));

  return (
    <FormControl
      classes={{ root: classes.formControlRoot }}
      className="formControl"
      variant="outlined"
    >
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        <Select
          {...field}
          {...props}
          classes={classes}
          isOpen
          options={options}
          styles={customStyles}
          components={components}
          value={renderValue || ""}
          onChange={handleChange}
          isMulti={multiple}
          isDisabled={disabled}
          closeMenuOnSelect={!multiple}
          hideSelectedOptions={false}
          joinValues={true}
          delimiter=","
          placeholder=""
          textFieldProps={{
            onFocus: () => setFocus(true),
            onBlur: () => setFocus(false),
            label,
            error: !!isError,
            InputLabelProps: {
              shrink: hasFocus || !!renderValue
            }
          }}
          getOptionLabel={extractLabel}
        />
      </ContexualHelp>
      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
