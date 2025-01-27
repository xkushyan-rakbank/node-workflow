import React, { memo } from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../../components/InfoTitle";
import { ContexualHelp, ErrorMessage } from "../../Notifications";
import { areEqualFieldProps, omitProps } from "../utils";

const useStyles = makeStyles({
  formControlRoot: {
    margin: "12px 0 24px",
    width: "100%",
    display: "flex",
    "& > div:last-child": {
      marginTop: 10
    }
  },
  checkbox: {},
  label: {},
  infoTitle: {}
});

export const CheckboxBase = ({
  infoTitle,
  label = "",
  value = true,
  field,
  form: { errors, touched },
  classes: extendedClasses,
  contextualHelpText,
  contextualHelpProps = {},
  ...rest
}) => {
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);
  const classes = useStyles({ classes: extendedClasses });

  return (
    <FormControl classes={{ root: classes.formControlRoot }} className="formControlContainer">
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        <CustomCheckbox
          {...field}
          {...omitProps(rest)}
          classes={{ label: classes.label, checkbox: classes.checkbox }}
          label={label}
          value={value}
          checked={field.value === value}
        />
      </ContexualHelp>
      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle classes={{ wrapper: classes.infoTitle }} title={infoTitle} />}
    </FormControl>
  );
};

export const Checkbox = memo(CheckboxBase, areEqualFieldProps);
