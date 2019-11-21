import React from "react";
import cx from "classnames";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { getIn } from "formik";

import { ErrorMessage, InfoTitle } from "./../../Notifications";
import { useStyles } from "./styled";

export const CustomSelect = ({
  extractId = option => option.value,
  placeholder,
  options,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  form,
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
        input={<OutlinedInput labelWidth={labelWidth} />}
        IconComponent={KeyboardArrowDownIcon}
        className={cx(classes.selectField, classes.selectFieldBasic)}
        error={isError}
      >
        {options.map(option => (
          <MenuItem key={extractId(option)} value={extractId(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {isError && <ErrorMessage error={errorMessage} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
