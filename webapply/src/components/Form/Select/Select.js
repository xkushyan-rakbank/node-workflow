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
  placeholder,
  multiple = false,
  options,
  required,
  label,
  field,
  infoTitle,
  form: { errors, touched, setFieldValue },
  isMulti = false,
  shrink,
  callback,
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

  const renderValue = selected => (!multiple ? selected : selected.join(", "));

  return (
    <FormControl className="formControl" variant="outlined">
      <InputLabel ref={inputLabel} shrink={shrink}>
        {label}
      </InputLabel>
      <Select
        {...field}
        {...props}
        renderValue={renderValue}
        multiple={multiple}
        onChange={(e, value) => {
          setFieldValue(field.name, value.props.value);
          if (callback) {
            callback(value.props.value);
          }
        }}
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
