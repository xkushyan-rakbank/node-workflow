import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup } from "@material-ui/core";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

export const CheckboxesWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
});

export const CheckboxGroup = ({
  type = "checkbox",
  options,
  extractId = option => option.key,
  extractValue = option => option.value,
  extractLabel = item => item.label,
  infoTitle,
  field,
  form: { errors, touched },
  onSelect = () => {}
}) => {
  const errorMessage = getIn(errors, field.name);
  const hasError = errorMessage && getIn(touched, field.name);

  return (
    <FormControl className="formControl">
      {type !== "radio" ? (
        <CheckboxesWrapper>
          {options.map(item => (
            <CustomCheckbox
              {...field}
              type={type}
              key={extractId(item)}
              value={extractValue(item)}
              label={extractLabel(item)}
              onSelect={onSelect}
              checked={(field.value || []).includes(extractValue(item))}
            />
          ))}
        </CheckboxesWrapper>
      ) : (
        <RadioGroup {...field}>
          <CheckboxesWrapper>
            {options.map(item => (
              <CustomCheckbox
                type={type}
                key={extractId(item)}
                value={extractValue(item)}
                label={extractLabel(item)}
                onSelect={onSelect}
              />
            ))}
          </CheckboxesWrapper>
        </RadioGroup>
      )}

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
