import React from "react";
import { action } from "@storybook/addon-actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MuiThemeProvider } from "@material-ui/core";

import { DatePicker } from "../components/Form/DatePicker/DatePicker";
import { SubmitButton } from "../components/Buttons/SubmitButton";
import { theme } from "../theme";

export default {
  title: "Form"
};

export const datePicker = () => (
  <Formik
    initialValues={{ date: new Date() }}
    validationSchema={Yup.object().shape({
      date: Yup.date().required()
    })}
    onSubmit={action("submited")}
  >
    {() => (
      <MuiThemeProvider theme={theme}>
        <Form>
          <Field name="date" label="Select Date" component={DatePicker} />
          <SubmitButton label="Submit" />
        </Form>
      </MuiThemeProvider>
    )}
  </Formik>
);
