import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Field, getIn } from "formik";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import { updateProspect } from "../../../store/actions/appConfig";
import { getInputServerValidityByPath } from "../../../store/selectors/serverValidation";

export const AutoSaveField = ({ name, path, isLoadDefaultValueFromStore = true, ...rest }) => {
  const dispatch = useDispatch();
  const appConfig = useSelector(state => state.appConfig);
  const { values, setFieldError, errors } = useFormikContext();
  const value = getIn(values, name);
  const serverValidationError = useSelector(state => getInputServerValidityByPath(state, path));

  useEffect(() => {
    if (serverValidationError) {
      setFieldError(name, serverValidationError.message);
    }
  }, [setFieldError, serverValidationError, name]);

  useEffect(() => {
    if (path && !errors[path]) {
      const oldValue = get(appConfig, path, null);

      if (!isEqual(oldValue, value)) {
        dispatch(updateProspect({ [path]: value }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <Field name={name} {...rest} />;
};
