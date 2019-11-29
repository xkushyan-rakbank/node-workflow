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
  extractId = option => option.key,
  extractValue = option => option.value,
  extractLabel = item => item.label || item.displayText,
  placeholder,
  multiple = false,
  options = [],
  required,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  isMulti = false,
  shrink,
  ...rest
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const renderValue = selected =>
    !multiple
      ? extractLabel(options.find(item => extractValue(item) === selected) || {})
      : options
          .flatMap(item => (selected.includes(extractValue(item)) ? [extractLabel(item)] : []))
          .join(", ");

  return (
    <FormControl className="formControl" variant="outlined">
      <InputLabel ref={inputLabel} shrink={shrink}>
        {label}
      </InputLabel>

      <Select
        {...field}
        {...rest}
        renderValue={renderValue}
        multiple={multiple}
        input={<OutlinedInput labelWidth={labelWidth} />}
        IconComponent={KeyboardArrowDownIcon}
        className={cx(classes.selectField, classes.selectFieldBasic)}
        error={isError}
      >
        {options.map(option => (
          <MenuItem key={extractId(option)} value={extractValue(option)}>
            {multiple ? (
              <>
                <ListItemText primary={extractId(option)} />
                <Checkbox color="default" checked={field.value.includes(extractValue(option))} />
              </>
            ) : (
              extractLabel(option)
            )}
          </MenuItem>
        ))}
      </Select>

      {isError && <ErrorMessage error={errorMessage} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
