import React, { useCallback } from "react";
import { Formik } from "formik";

export const FormikWithSubmitHandler = ({
  initialValues,
  validationSchema,
  handleContinue,
  children
}) => {
  const handleSubmit = useCallback(() => {
    handleContinue();
  }, [handleContinue]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {children}
    </Formik>
  );
};
