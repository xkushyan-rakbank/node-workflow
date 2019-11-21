import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

export const CheckboxesWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
});

export const CheckboxGroup = ({
  options,
  keyExtractor = item => item.key,
  valueExtractor = item => item.value,
  labelExtractor = item => item.label,
  infoTitle,
  field,
  form: { errors, touched }
}) => {
  const isError = errors[field.name] && touched[field.name];

  return (
    <FormControl className="formControl">
      <CheckboxesWrapper>
        {options.map(item => (
          <CustomCheckbox
            {...field}
            key={keyExtractor(item)}
            value={valueExtractor(item)}
            label={labelExtractor(item)}
            checked={(field.value || []).includes(valueExtractor(item))}
          />
        ))}
      </CheckboxesWrapper>

      {isError && <ErrorMessage error={errors[field.name]} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
