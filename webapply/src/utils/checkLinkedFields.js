import { getIn } from "formik";
import get from "lodash/get";

export const checkLinkedFields = (values, fieldName, prospectPath) => (prospect, _, __, errors) =>
  getIn(errors, fieldName) ? {} : { ...prospect, [prospectPath]: get(values, fieldName) };
