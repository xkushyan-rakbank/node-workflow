import React from "react";
import classNames from "classnames";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { TextField, MenuItem, Chip, Checkbox } from "@material-ui/core";

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

export const Control = ({ selectProps, innerRef, children, innerProps }) => (
  <TextField
    fullWidth
    variant="outlined"
    InputProps={{
      inputComponent,
      inputProps: {
        className: selectProps.classes.input,
        inputRef: innerRef,
        children,
        ...innerProps
      }
    }}
    {...selectProps.textFieldProps}
    value={selectProps.value}
  />
);

export const Option = ({
  selectProps,
  innerRef,
  isFocused,
  isSelected,
  innerProps,
  children,
  isMulti
}) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    className={selectProps.classes.menuItem}
    style={{
      fontWeight: isSelected ? 500 : 400
    }}
    {...innerProps}
  >
    {children}

    {isMulti && <Checkbox color="default" checked={isSelected} />}
  </MenuItem>
);

export const IndicatorsContainer = ({ selectProps }) => (
  <div className={selectProps.classes.indicator}>
    <KeyboardArrowDownIcon />
    <IndicatorSeparator selectProps={selectProps} />
  </div>
);

const IndicatorSeparator = ({ selectProps }) => (
  <span className={selectProps.classes.indicatorSeparator} />
);

export const MultiValue = ({ selectProps, children, isFocused, removeProps }) => (
  <Chip
    tabIndex={-1}
    label={children}
    className={classNames(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused
    })}
    onDelete={event => {
      removeProps.onClick();
      removeProps.onMouseDown(event);
    }}
  />
);
