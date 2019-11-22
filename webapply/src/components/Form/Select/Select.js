import React from "react";
import cx from "classnames";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl
} from "@material-ui/core";
import { getIn } from "formik";

import { ErrorMessage, InfoTitle } from "./../../Notifications";
import { useStyles } from "./styled";

export const CustomSelect = ({
  disabled,
  extractId = option => option.key,
  placeholder,
  multiple = false,
  options,
  required,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  isMulti = false,
  shrink,
  ...props
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const getSelectedValueText = selected => {
    const { label } = options.find(option => option.code === selected);
    return label;
  };

  const renderValue = selected =>
    !multiple ? getSelectedValueText(selected) : selected.join(", ");

  return (
    <FormControl className="formControl" variant="outlined">
      {shrink ? (
        <InputLabel ref={inputLabel} shrink>
          {label}
        </InputLabel>
      ) : (
        <InputLabel ref={inputLabel}>{label}</InputLabel>
      )}

      <Select
        {...field}
        {...props}
        renderValue={renderValue}
        multiple={multiple}
        input={<OutlinedInput labelWidth={labelWidth} />}
        IconComponent={KeyboardArrowDownIcon}
        className={cx(classes.selectField, classes.selectFieldBasic)}
        error={isError}
      >
        {options.map(option => (
          <MenuItem key={extractId(option)} value={extractId(option)}>
            {multiple ? (
              <>
                <ListItemText primary={extractId(option)} />
                <Checkbox color="default" checked={field.value.includes(extractId(option))} />
              </>
            ) : (
              option.label
            )}
          </MenuItem>
        ))}
      </Select>

      {isError && <ErrorMessage error={errorMessage} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
