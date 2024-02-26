import React, { useMemo } from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup, makeStyles } from "@material-ui/core";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { CustomRadioButton } from "../RadioButton/CustomRadioButton";
import { ErrorMessage, ContexualHelp } from "../../Notifications";
import { InfoTitle } from "../../InfoTitle";

const useStyles = makeStyles({
  formControlRoot: {
    "& > div:last-child": {
      marginTop: 10
    }
  }
});

export const CheckboxGroup = ({
  typeRadio,
  options,
  filterOptions = options => options,
  extractId = option => option.key,
  extractValue = option => option.value,
  extractLabel = item => item.label || item.displayText,
  infoTitle,
  field,
  form: { errors, touched },
  onSelect = () => {},
  textArea,
  classes: extendedClasses,
  contextualHelpText,
  contextualHelpProps = {},
  disabled = false,
  customIcon = true,
  typeOfCheckbox = "checkbox",
  isInlineStyle = true,
  clickHandled
}) => {
  const CheckboxesWrapper = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    alignContent: "start",
    flexDirection: isInlineStyle ? "row" : "column",
    gap: isInlineStyle ? "1.5rem" : "0rem"
  });
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);

  const opts = useMemo(() => filterOptions(options), [options, filterOptions]);
  const disabledCheckboxByDefault = ["AED"];

  const classes = useStyles();
  return (
    <FormControl classes={{ root: classes.formControlRoot }} className="formControl">
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
        {typeRadio ? (
          <RadioGroup {...field}>
            <CheckboxesWrapper>
              {opts.map(item => (
                <CustomRadioButton
                  key={extractId(item)}
                  value={extractValue(item)}
                  label={extractLabel(item)}
                  onSelect={onSelect}
                  classes={extendedClasses}
                  customIcon={customIcon}
                  color="primary"
                  data-testid={extractId(item)}
                />
              ))}
              {textArea}
            </CheckboxesWrapper>
          </RadioGroup>
        ) : (
          <CheckboxesWrapper>
            {opts.map(item => (
              <CustomCheckbox
                typeOfCheckbox={typeOfCheckbox}
                {...field}
                key={extractId(item)}
                value={extractValue(item)}
                label={extractLabel(item)}
                onSelect={onSelect}
                disabled={disabledCheckboxByDefault.includes(item.value) || disabled}
                checked={(field.value || []).includes(extractValue(item))}
                classes={extendedClasses}
                onChange={clickHandled ? () => {} : field.onChange}
                data-testid={extractId(item)}
              />
            ))}
          </CheckboxesWrapper>
        )}
      </ContexualHelp>

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
