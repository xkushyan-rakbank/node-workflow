import React, { useState, memo, useEffect, useMemo, useRef } from "react";
import Select from "react-select";
import { getIn } from "formik";
import { FormControl } from "@material-ui/core";

import { ErrorMessage, ContexualHelp } from "./../../../Notifications";
import { Control, Option, DropdownIndicator, MultiValue } from "./SelectAutocompleteComponents";
import { areEqualFieldProps } from "../../utils";
import { useStyles, customStyles } from "./styled";
import { InfoTitle } from "../../../InfoTitle";

const SelectAutocompleteBase = ({
  extractValue = option => option?.value || (option?.value === false ? false : ""),
  extractLabel = option => option?.label || option?.displayText,
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
  isClearable = false,
  ...props
}) => {
  const selectRef = useRef();
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
    const selectInnerRef = props.innerRef || selectRef;
    if (!multiple && selectInnerRef && selectInnerRef.current) {
      setTimeout(() => {
        selectInnerRef.current.select.blur();
      }, 0);
    }

    return onChange(value, renderValue);
  };

  const components = useMemo(
    () => ({
      Control,
      Option,
      MultiValue,
      [isClearable ? "DropdownIndicator" : "IndicatorsContainer"]: DropdownIndicator
    }),
    []
  );

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
          ref={props.innerRef || selectRef}
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
          labelText={label}
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
          isClearable={isClearable}
        />
      </ContexualHelp>
      {infoTitle && <InfoTitle title={infoTitle} showIcon={infoIcon} />}
      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};

export const SelectAutocomplete = memo(SelectAutocompleteBase, areEqualFieldProps);
