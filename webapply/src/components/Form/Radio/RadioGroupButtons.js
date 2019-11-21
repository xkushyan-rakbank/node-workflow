import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";

import { RadioButton } from "./RadioButton";
import { ErrorMessage } from "../../Notifications";

import { useStyledRadioGroup } from "./styled";

export const RadioGroupWrapper = ({
  options,
  keyExtractor = item => item.key,
  valueExtractor = item => item.value,
  labelExtractor = item => item.displayText,
  form: { errors, touched },
  field,
  children
}) => {
  const classes = useStyledRadioGroup();
  const isError = errors[field.name] && touched[field.name];

  return (
    <>
      <RadioGroup classes={{ root: classes.radioGroup }}>
        <div className={classes.gridGroup}>
          {options.map(option => {
            return (
              <RadioButton
                {...field}
                key={keyExtractor(option)}
                value={valueExtractor(option)}
                label={labelExtractor(option)}
                checked={(field.value || []).includes(valueExtractor(option))}
              />
            );
          })}

          {children}
        </div>
      </RadioGroup>
      {isError && <ErrorMessage error={errors[field.name]} />}
    </>
  );
};
