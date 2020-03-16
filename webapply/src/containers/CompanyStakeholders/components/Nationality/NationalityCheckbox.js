import { memo } from "react";
import { getIn } from "formik";

import { CheckboxBase } from "../../../../components/Form/Checkbox/Checkbox";

export const NationalityCheckbox = memo(
  CheckboxBase,
  (prevProps, nextProps) =>
    getIn(prevProps.form.values, prevProps.field.name) ===
      getIn(nextProps.form.values, nextProps.field.name) &&
    getIn(prevProps.form.touched, prevProps.field.name) ===
      getIn(nextProps.form.touched, nextProps.field.name) &&
    getIn(prevProps.form.errors, prevProps.field.name) ===
      getIn(nextProps.form.errors, nextProps.field.name) &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.form.values.passportDetails.length === nextProps.form.values.passportDetails.length
);
