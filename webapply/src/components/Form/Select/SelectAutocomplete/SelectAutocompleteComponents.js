import React from "react";
import classNames from "classnames";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CloseIcon from "@material-ui/icons/Close";

import { TextField, MenuItem, Chip, Checkbox } from "@material-ui/core";
import { CustomCheckbox } from "../../Checkbox/CustomCheckbox";

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

export const Control = ({ selectProps, innerRef, children, innerProps }) => (
  <TextField
    fullWidth
    variant="filled"
    className={selectProps.classes.inputCustom}
    InputProps={{
      inputComponent,
      disableUnderline: true,
      inputProps: {
        className: selectProps.classes.input,

        inputRef: innerRef,
        children,
        ...innerProps
      }
    }}
    {...selectProps.textFieldProps}
    value={selectProps.value}
    data-testid="control"
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
    className={classNames(selectProps.classes.menuItem, {
      [selectProps.classes.customMenuItem]: selectProps.customCheckbox
    })}
    style={{
      fontWeight: isSelected ? 500 : 400
    }}
    {...innerProps}
  >
    {children}

    {isMulti && !selectProps.customCheckbox && <Checkbox color="default" checked={isSelected} />}
    {isMulti && selectProps.customCheckbox && (
      <CustomCheckbox
        color="default"
        checked={isSelected}
        classes={{ root: selectProps.classes.customSeclectCheckbox }}
      />
    )}
  </MenuItem>
);

export const DropdownIndicator = ({ selectProps }) => (
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
    variant="outlined"
    tabIndex={-1}
    label={children}
    className={classNames(selectProps.classes.chip, {
      [selectProps.classes.chipFocused]: isFocused
    })}
    deleteIcon={
      <CloseIcon
        data-testid="multi-value-remove"
        style={{ width: "14px", height: "14px", fill: "#000000" }}
      />
    }
    onDelete={event => {
      removeProps.onClick();
      removeProps.onMouseDown(event);
    }}
    data-testid="multi-value"
  />
);
