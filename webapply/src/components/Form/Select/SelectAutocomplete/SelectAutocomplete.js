import React from "react";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import FormControl from "@material-ui/core/FormControl";
import { Control, Option } from "./SelectAutocompleteComponents";

const styles = theme => ({
  input: {
    display: "flex",
    padding: 0,
    height: "56px"
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center"
  },
  chip: {
    margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light" ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  menu: {
    marginTop: theme.spacing(1),
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  }
});

const components = {
  Control,
  Option
};

class Autocomplete extends React.PureComponent {
  render() {
    const {
      classes,
      theme,
      label,
      field,
      placeholder,
      form: { setFieldValue },
      options,
      isMultiple,
      ...props
    } = this.props;

    return (
      <FormControl className="formControl" variant="outlined">
        <Select
          {...field}
          {...props}
          classes={classes}
          placeholder={placeholder}
          options={options}
          components={components}
          onChange={value => setFieldValue(field.name, value)}
          isMulti={isMultiple}
        />
      </FormControl>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Autocomplete);
