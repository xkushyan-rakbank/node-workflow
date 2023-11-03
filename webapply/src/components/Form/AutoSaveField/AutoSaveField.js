import React, { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext, Field, getIn } from "formik";
import get from "lodash/get";
import isEqual from "lodash/isEqual";

import { updateProspect } from "../../../store/actions/appConfig";
import { getInputServerValidityByPath } from "../../../store/selectors/serverValidation";
import { getDatalist } from "../../../store/selectors/appConfig";
import { OthersOption } from "../../../constants/options";
import useDecisions from "../../../utils/useDecisions";
import { OverlayLoader } from "../../Loader";
import { isDecisionLoading } from "../../../store/selectors/decisions";

export const AutoSaveField = ({
  isVisible = true,
  name,
  path,
  decisionKey,
  isLoadDefaultValueFromStore = true,
  datalistId,
  filterOptionsDeps,
  filterOptions = option => option,
  changeProspect = prospect => prospect,
  initialValue = "",
  addOthers = false,
  label,
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
  const { visible, enabled, label: decisionLabel, makeDecisions } = useDecisions(path, decisionKey);
  const decisonLoad = useSelector(isDecisionLoading);

  useEffect(() => {
    if (!isLoadedDefaultValueFromStore && path) {
      const value = get(appConfig, path);

      if (value !== undefined) {
        setFieldValue(name, value);
      }
      setIsLoadedDefaultValueFromStore(true);
    }
    //ro-assist-brd1-5
    if (
      addOthers === true &&
      datalist[datalistId][datalist[datalistId].length - 1].code !== "Others"
    ) {
      datalist[datalistId].push(OthersOption);
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
            if (!getIn(errors, name) || value === "" || Array.isArray(value)) {
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

      if (timer.current) clearTimeout(timer.current);
      timer.current = newTimer;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadedDefaultValueFromStore, value]);

  const options = useMemo(() => {
    if (path && datalistId && datalist) {
      const fieldConfig = datalist[datalistId] || [];
      return filterOptions(fieldConfig);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, datalistId, filterOptions, filterOptionsDeps]);

  const handleChange = async e => {
    const fieldValue = e?.target?.value;
    const value = fieldValue === null || fieldValue === undefined ? e : fieldValue;
    setFieldValue(name, value);
    if (decisionKey) {
      setFieldValue(decisionKey, value);
    }
    // eslint-disable-next-line max-len
    //TODO : its a temporary workaround for handling invalid date, need to move the decision invocation in to onBlur
    if (!(e?.getTime && isNaN(e?.getTime()))) {
      makeDecisions && makeDecisions(value);
    }
  };
  return (
    <>
      <OverlayLoader open={decisonLoad[path] || false} text="Loading" />
      {(visible || isVisible) && (
        <Field
          onChange={handleChange}
          disabled={!enabled}
          name={name}
          options={options}
          {...rest}
          label={decisionLabel || label}
        />
      )}
    </>
  );
};
