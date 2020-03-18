import { connect } from "formik";
import { useEffect } from "react";

import { usePrevious } from "../../utils/usePrevious";

const FormikEffectBase = ({ onChange, formik }) => {
  const { values } = formik;
  const prevValues = usePrevious(values);

  useEffect(() => {
    if (prevValues) {
      onChange(prevValues, formik);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return null;
};

export const FormikEffect = connect(FormikEffectBase);
