import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { getIn, Field, useFormikContext } from "formik";
import isEqual from "lodash/isEqual";

export const FinalQuestionsStateContext = createContext({});

export const FinalQuestionsState = ({ children }) => {
  const [state, setState] = useState({
    isDontTradeGoodsYet: false,
    isDontHaveSuppliersYet: false
  });
  const context = useMemo(
    () => ({
      ...state,
      setFieldValue: (name, value) => setState({ ...state, [name]: value })
    }),
    [state]
  );

  return (
    <FinalQuestionsStateContext.Provider value={context}>
      {children}
    </FinalQuestionsStateContext.Provider>
  );
};

export const FinalQuestionField = ({ name, ...rest }) => {
  const { setFieldValue, ...state } = useContext(FinalQuestionsStateContext);
  const { values, setFieldValue: setFormikFieldValue } = useFormikContext();

  const oldValue = getIn(state, name);
  const value = getIn(values, name);

  useEffect(() => {
    setFormikFieldValue(name, oldValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isEqual(oldValue, value)) {
      setFieldValue(name, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <Field name={name} {...rest} />;
};
