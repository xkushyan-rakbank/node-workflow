import React from "react";
import FormControl from "@material-ui/core/FormControl";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";

const CheckboxesWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
});

export const CheckboxGroup = ({ options, infoTitle, field, form: { errors, touched } }) => {
  const isError = errors[field.name] && touched[field.name];

  return (
    <FormControl className="formControl">
      <CheckboxesWrapper>
        {options.map(({ key, value, displayText }) => (
          <CustomCheckbox key={key} valueData={value} label={displayText} {...field} />
        ))}
      </CheckboxesWrapper>

      {isError && <ErrorMessage error={errors[field.name]} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
