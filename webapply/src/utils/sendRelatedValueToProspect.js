import { getIn } from "formik";
import get from "lodash/get";

export const sendRelatedValueToProspect = (values, fieldName, prospectPath) => (
  prospect,
  _,
  __,
  errors
) =>
  getIn(errors, fieldName) ? prospect : { ...prospect, [prospectPath]: get(values, fieldName) };
