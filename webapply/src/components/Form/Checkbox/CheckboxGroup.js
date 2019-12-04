import React from "react";
import { getIn } from "formik";
import FormControl from "@material-ui/core/FormControl";
import { RadioGroup } from "@material-ui/core";
import { styled } from "@material-ui/styles";

import { CustomCheckbox } from "./CustomCheckbox";
import { InfoTitle } from "../../Notifications/index";
import { ErrorMessage } from "../../Notifications/index";
import { ICONS, Icon } from "../../../components/Icons/Icon";

export const CheckboxesWrapper = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr"
});

export const CheckboxGroup = ({
  useRadioIcon,
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
      {useRadioIcon ? (
        <RadioGroup {...field}>
          <CheckboxesWrapper>
            {options.map(item => (
              <CustomCheckbox
                useRadioIcon={useRadioIcon}
                key={extractId(item)}
                value={extractValue(item)}
                label={extractLabel(item)}
                onSelect={onSelect}
                icon={<Icon name={ICONS.unCheckedRadio} alt="select icon" />}
                checkedIcon={<Icon name={ICONS.checkedRadio} alt="unselected icon" />}
              />
            ))}
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
              icon={<Icon name={ICONS.uncheckedIcon} alt="checked icon" />}
              checkedIcon={<Icon name={ICONS.checkedIcon} alt="unchecked icon" />}
            />
          ))}
        </CheckboxesWrapper>
      )}

      {hasError && <ErrorMessage error={errorMessage} />}
      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
