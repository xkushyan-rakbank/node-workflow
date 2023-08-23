import React, { useState, memo, useEffect } from "react";
import Select from "react-select";
import { getIn } from "formik";
import { FormControl } from "@material-ui/core";

import { ErrorMessage, ContexualHelp } from "./../../../Notifications";
import { Control, Option, IndicatorsContainer, MultiValue } from "./SelectAutocompleteComponents";
import { areEqualFieldProps } from "../../utils";
import { useStyles, customStyles } from "./styled";
import { InfoTitle } from "../../../InfoTitle";

const components = {
  Control,
  Option,
  IndicatorsContainer,
  MultiValue
};

const SelectAutocompleteBase = ({
  extractValue = option => option.value,
  extractLabel = option => option.label || option.displayText,
  theme,
  label,
  shrink,
  options,
  infoTitle,
  field: { onBlur, ...field },
  form: { errors, touched, setFieldValue, setFieldTouched },
  multiple = false,
  disabled,
  contextualHelpText,
  contextualHelpProps,
  onChange = value => setFieldValue(field.name, value),
  customCheckbox = false,
  infoIcon = false,
  ...props
}) => {
  const classes = useStyles({
    ...props,
    disabled
  });
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const [hasFocus, setFocus] = useState(false);

  const renderValue = !multiple
    ? options.find(option => extractValue(option) === field.value)
    : options.filter(option => (field.value || []).map(extractValue).includes(option.value));

  const handleChange = selected => {
    const value = multiple ? (selected || []).map(item => item.value) : extractValue(selected);

    return onChange(value, renderValue);
  };

  useEffect(() => {
    if (disabled) {
      if (props.innerRef && props.innerRef.current) {
        props.innerRef.current.onMenuClose();
      }
    }
  }, [disabled]);

  return (
    <FormControl classes={{ root: classes.formControlRoot }} variant="filled">
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        <Select
          {...field}
          {...props}
          ref={props.innerRef}
          classes={classes}
          isOpen
          options={options}
          styles={customStyles}
          components={components}
          value={renderValue || ""}
          onChange={handleChange}
          isMulti={multiple}
          customCheckbox={customCheckbox}
          isDisabled={disabled}
          closeMenuOnSelect={!multiple}
          tabSelectsValue={!multiple}
          hideSelectedOptions={false}
          joinValues={true}
          delimiter=","
          placeholder=""
          menuPlacement="auto"
          minMenuHeight={300}
          textFieldProps={{
            onFocus: () => setFocus(true),
            onBlur: () => {
              setFocus(false);
              setFieldTouched(field.name);
            },
            label,
            error: !!isError,
            InputLabelProps: {
              shrink: hasFocus || !!(Array.isArray(renderValue) ? renderValue.length : renderValue),
              classes: { filled: classes.filledLabel, shrink: classes.filledLabelShrink }
            }
          }}
          getOptionLabel={extractLabel}
        />
      </ContexualHelp>
      {infoTitle && <InfoTitle title={infoTitle} showIcon={infoIcon} />}
      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};

export const SelectAutocomplete = memo(SelectAutocompleteBase, areEqualFieldProps);
