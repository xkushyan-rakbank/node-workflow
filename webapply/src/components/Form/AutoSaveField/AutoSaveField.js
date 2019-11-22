import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFormikContext, Field } from "formik";

import { updateProspect } from "../../../store/actions/appConfig";

export const AutoSaveField = ({ name, path, ...rest }) => {
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  const value = values[name];

  useEffect(() => {
    if (path) {
      dispatch(updateProspect({ [path]: value }));
    }
  }, [path, value, dispatch]);

  return <Field name={name} {...rest} />;
};
