import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Field, getIn } from "formik";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import { updateProspect } from "../../../store/actions/appConfig";
import { getInputServerValidityByPath } from "../../../store/selectors/serverValidation";
import { getDatalist } from "../../../store/selectors/appConfig";

export const AutoSaveField = ({
  name,
  path,
  isLoadDefaultValueFromStore = true,
  datalistId,
  filterOptions = option => option,
  changeProspect = prospect => prospect,
  initialValue = "",
  ...rest
}) => {
  const dispatch = useDispatch();
  const appConfig = useSelector(state => state.appConfig);
  const datalist = useSelector(getDatalist);
  const {
    values,
    touched,
    setFieldError,
    setFieldValue,
    validateForm,
    setFieldTouched
  } = useFormikContext();
  const value = getIn(values, name);
  const touch = getIn(touched, name);
  const serverValidationError = useSelector(state => getInputServerValidityByPath(state, path));
  const [isLoadedDefaultValueFromStore, setIsLoadedDefaultValueFromStore] = useState(
    !isLoadDefaultValueFromStore
  );
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (!isLoadedDefaultValueFromStore && path) {
      const value = get(appConfig, path);

      if (value !== undefined) {
        setFieldValue(name, value);
      }
      setIsLoadedDefaultValueFromStore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (serverValidationError) {
      setFieldError(name, serverValidationError.message);
    }
  }, [setFieldError, serverValidationError, name]);

  useEffect(() => {
    if (isLoadedDefaultValueFromStore && path && appConfig) {
      const newTimer = setTimeout(() => {
        const oldValue = get(appConfig, path, initialValue);

        if (!isEqual(oldValue, value)) {
          validateForm().then(errors => {
            if (!getIn(errors, name)) {
              const prospect = changeProspect({ [path]: value }, value, path, errors);
              dispatch(updateProspect(prospect));
            } else if (!touch) {
              setFieldTouched(name);
            }
          });
        } else {
          setFieldError(name);
        }
      }, 500);

      if (timer) clearTimeout(timer);
      setTimer(newTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedDefaultValueFromStore, value]);

  const options = useMemo(() => {
    if (path && datalistId && datalist) {
      const fieldConfig = datalist[datalistId] || [];

      return filterOptions(fieldConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, datalistId, filterOptions]);

  return <Field name={name} options={options} {...rest} />;
};
