import React from "react";
import RadioGroup from "@material-ui/core/RadioGroup";
import { getIn } from "formik";

import { RadioButton } from "./RadioButton";
import { ErrorMessage } from "../../Notifications";

import { useStyledRadioGroup } from "./styled";

export const RadioGroupWrapper = ({
  options,
  keyExtractor = item => item.key,
  valueExtractor = item => item.value,
  labelExtractor = item => item.label,
  form: { errors, touched },
  field,
  children,
  ...props
}) => {
  const classes = useStyledRadioGroup();
  const error = getIn(errors, field.name);

  return (
    <>
      <RadioGroup classes={{ root: classes.radioGroup }}>
        <div className={classes.gridGroup}>
          {options.map(option => (
            <RadioButton
              {...field}
              key={keyExtractor(option)}
              value={valueExtractor(option)}
              label={labelExtractor(option)}
              checked={(field.value || []).includes(valueExtractor(option))}
              {...props}
            />
          ))}

          {children}
        </div>
      </RadioGroup>
      {error && <ErrorMessage error={error} />}
    </>
  );
};
