import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Field, getIn } from "formik";

import { updateProspect } from "../../../store/actions/appConfig";
import { getInputServerValidityByPath } from "../../../store/selectors/serverValidation";

export const AutoSaveField = ({ name, path, ...rest }) => {
  const dispatch = useDispatch();
  const { values, setFieldError } = useFormikContext();
  const value = getIn(values, name);
  const serverValidationError = useSelector(state => getInputServerValidityByPath(state, path));

  useEffect(() => {
    if (serverValidationError) {
      setFieldError(name, serverValidationError.message);
    }
  }, [setFieldError, serverValidationError, name]);

  useEffect(() => {
    if (path) {
      dispatch(updateProspect({ [path]: value }));
    }
  }, [path, value, dispatch]);

  return <Field name={name} {...rest} />;
};
