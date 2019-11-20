import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

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
  />
);

export const Option = ({ innerRef, isFocused, isSelected, innerProps, children }) => (
  <MenuItem
    buttonRef={innerRef}
    selected={isFocused}
    component="div"
    style={{
      fontWeight: isSelected ? 500 : 400
    }}
    {...innerProps}
  >
    {children}
  </MenuItem>
);
