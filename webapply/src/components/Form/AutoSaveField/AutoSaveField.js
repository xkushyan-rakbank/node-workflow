import React, { useEffect, useMemo, useState, useRef } from "react";
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
  filterOptionsDeps,
  filterOptions,
  changeProspect,
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
  const timer = useRef(null);

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
              let prospect;
              if (typeof changeProspect === "function") {
                prospect = changeProspect({ [path]: value }, value, path, errors);
              } else {
                prospect = { [path]: value };
              }
              dispatch(updateProspect(prospect));
            } else if (!touch) {
              setFieldTouched(name);
            }
          });
        } else {
          setFieldError(name);
        }
      }, 500);

      if (timer.current) clearTimeout(timer.current);
      timer.current = newTimer;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedDefaultValueFromStore, value]);

  const options = useMemo(() => {
    if (path && datalistId && datalist) {
      const fieldConfig = datalist[datalistId] || [];
      if (typeof filterOptions === "function") {
        return filterOptions(fieldConfig);
      }
      return fieldConfig;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, datalistId, filterOptions, filterOptionsDeps]);

  return <Field name={name} options={options} {...rest} />;
};
