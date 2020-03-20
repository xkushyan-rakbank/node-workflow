import { connect } from "formik";
import { useEffect } from "react";

import { usePrevious } from "../../utils/usePrevious";

const FormikEffectBase = ({ onChange, formik }) => {
  const { values, touched } = formik;
  const prevValues = usePrevious(values);

  useEffect(() => {
    if (prevValues) {
      onChange(formik, prevValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, touched]);

  return null;
};

export const FormikEffect = connect(FormikEffectBase);
