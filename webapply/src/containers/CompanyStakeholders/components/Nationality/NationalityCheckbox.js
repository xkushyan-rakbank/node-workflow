import { memo } from "react";

import { CheckboxBase } from "../../../../components/Form/Checkbox/Checkbox";
import { areEqualFieldProps } from "../../../../components/Form/utils";

export const NationalityCheckbox = memo(
  CheckboxBase,
  (prevProps, nextProps) =>
    areEqualFieldProps(prevProps, nextProps) &&
    prevProps.form.values.passportDetails === nextProps.form.values.passportDetails
);
