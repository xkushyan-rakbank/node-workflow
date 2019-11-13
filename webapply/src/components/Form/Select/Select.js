import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

function SelectComponent({
  classes,
  disabled,
  placeholder,
  options,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  form,
  isMulti = false,
  ...props
}) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl className="formControl" variant="outlined">
      <InputLabel ref={inputLabel} classes={{ shrink: classes.inputLabel }}>
        Select
      </InputLabel>
      <Select
        {...field}
        {...props}
        input={<OutlinedInput labelWidth={labelWidth} />}
        IconComponent={KeyboardArrowDownIcon}
      >
        <MenuItem value=""></MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const CustomSelect = withStyles(styles)(SelectComponent);
