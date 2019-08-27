import React from "react";
import cx from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { withStyles } from "@material-ui/core/styles";
import InfoTitle from "../InfoTitle";

const style = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    }
  },
  selectFieldBasic: {
    position: "relative",
    "&::after": {
      content: "''",
      position: " absolute",
      width: " 1px",
      height: " 100%",
      backgroundColor: " #ddd",
      right: " 56px"
    },
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)",
      "& + div": {
        paddingRight: "56px"
      }
    },
    "& svg": {
      position: "absolute",
      right: "20px"
    }
  }
};

const CustomSelect = props => {
  const {
    field,
    id,
    name,
    type,
    label,
    helperText,
    placeholder,
    options,
    classes,
    infoTitle,
    ...rest
  } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl className="formControl" variant="outlined">
      <InputLabel ref={inputLabel} htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        {...field}
        {...rest}
        input={<OutlinedInput labelWidth={labelWidth} name={name} id={id} />}
        IconComponent={KeyboardArrowDownIcon}
        className={cx(classes.selectField, classes.selectFieldBasic)}
      >
        <MenuItem value=""></MenuItem>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {!!infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};

export default withStyles(style)(CustomSelect);
