import React from "react";
import cx from "classnames";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { ErrorMessage, InfoTitle } from "./../../Notifications";
import {
  Select,
  ListItemText,
  Checkbox,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl
} from "@material-ui/core";
import { useStyles } from "./styled";

export const CustomSelect = ({
  extractId = option => option.label,
  disabled,
  placeholder,
  multiple = false,
  options,
  required,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  form,
  shrink,
  ...props
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const error = errors[field.name] && touched[field.name];
  const value = field.value;
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
        value={value}
        renderValue={renderValue}
        multiple={multiple}
        input={<OutlinedInput labelWidth={labelWidth} />}
        IconComponent={KeyboardArrowDownIcon}
        className={cx(classes.selectField, classes.selectFieldBasic)}
        error={error}
      >
        {options.map(option => (
          <MenuItem key={extractId(option)} value={extractId(option)}>
            {multiple ? (
              <>
                <ListItemText primary={extractId(option)} />
                <Checkbox color="default" checked={value.indexOf(extractId(option)) > -1} />
              </>
            ) : (
              option.label
            )}
          </MenuItem>
        ))}
      </Select>

      {error && <ErrorMessage error={errors[field.name]} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
