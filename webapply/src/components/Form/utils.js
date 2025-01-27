import { getIn } from "formik";
import omit from "lodash/omit";

export const areEqualFieldProps = (prevProps, nextProps) =>
  getIn(prevProps.form.values, prevProps.field.name) ===
    getIn(nextProps.form.values, nextProps.field.name) &&
  getIn(prevProps.form.touched, prevProps.field.name) ===
    getIn(nextProps.form.touched, nextProps.field.name) &&
  getIn(prevProps.form.errors, prevProps.field.name) ===
    getIn(nextProps.form.errors, nextProps.field.name) &&
  prevProps.options === nextProps.options &&
  prevProps.disabled === nextProps.disabled &&
  prevProps.exhaustiveDeps === nextProps.exhaustiveDeps;

export const omitProps = props => omit(props, ["exhaustiveDeps"]);
