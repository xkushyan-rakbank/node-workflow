import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup } from "@material-ui/core";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { CustomRadioButton } from "../RadioButton/CustomRadioButton";
import { InfoTitle, ErrorMessage } from "../../Notifications";

export const CheckboxesWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "-30px"
});

export const CheckboxGroup = ({
  typeRadio,
  options,
  extractId = option => option.key,
  extractValue = option => option.value,
  extractLabel = item => item.label || item.displayText,
  infoTitle,
  field,
  form: { errors, touched },
  onSelect = () => {},
  textArea,
  classes
}) => {
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);

  return (
    <FormControl className="formControl">
      {typeRadio ? (
        <RadioGroup {...field}>
          <CheckboxesWrapper>
            {options.map(item => (
              <CustomRadioButton
                key={extractId(item)}
                value={extractValue(item)}
                label={extractLabel(item)}
                onSelect={onSelect}
              />
            ))}
            {textArea}
          </CheckboxesWrapper>
        </RadioGroup>
      ) : (
        <CheckboxesWrapper>
          {options.map(item => (
            <CustomCheckbox
              {...field}
              key={extractId(item)}
              value={extractValue(item)}
              label={extractLabel(item)}
              onSelect={onSelect}
              checked={(field.value || []).includes(extractValue(item))}
              classes={classes}
            />
          ))}
        </CheckboxesWrapper>
      )}

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
