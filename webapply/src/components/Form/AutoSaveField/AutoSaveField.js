import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Field, getIn } from "formik";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import { updateProspect } from "../../../store/actions/appConfig";
import { getInputServerValidityByPath } from "../../../store/selectors/serverValidation";
import { getUiConfig } from "../../../store/selectors/appConfig";

export const AutoSaveField = ({
  name,
  path,
  isLoadDefaultValueFromStore = true,
  isSelectOptions = false,
  filterOptions = () => true,
  ...rest
}) => {
  const dispatch = useDispatch();
  const appConfig = useSelector(state => state.appConfig);
  const uiConfig = useSelector(getUiConfig);
  const { values, setFieldError, setFieldValue } = useFormikContext();
  const value = getIn(values, name);
  const serverValidationError = useSelector(state => getInputServerValidityByPath(state, path));

  useEffect(() => {
    if (isLoadDefaultValueFromStore && path) {
      const value = get(appConfig, path, null);

      if (value !== null) {
        setFieldValue(name, value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverValidationError) {
      setFieldError(name, serverValidationError.message);
    }
  }, [setFieldError, serverValidationError, name]);

  useEffect(() => {
    if (path) {
      const oldValue = get(appConfig, path, null);

      if (!isEqual(oldValue, value)) {
        dispatch(updateProspect({ [path]: value }));
      }
    }
  }, [path, value, dispatch]);

  const options = useMemo(() => {
    if (path && isSelectOptions) {
      const fieldConfig = Object.values(uiConfig).find(item => item.name === path);

      return get(fieldConfig, "datalist", []).filter(filterOptions);
    }
  }, [isSelectOptions, uiConfig]);

  return <Field name={name} options={options} {...rest} />;
};
