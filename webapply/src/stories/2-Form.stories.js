import React from "react";
import { action } from "@storybook/addon-actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MuiThemeProvider } from "@material-ui/core";

import { SubmitButton } from "../components/Buttons/SubmitButton";
import { theme } from "../theme";
import { CheckboxGroup, DatePicker } from "../components/Form";

export default {
  title: "Form"
};

export const datePicker = () => (
  <MuiThemeProvider theme={theme}>
    <Formik
      initialValues={{ date: new Date() }}
      validationSchema={Yup.object().shape({
        date: Yup.date().required()
      })}
      onSubmit={action("submited")}
    >
      {() => (
        <Form>
          <Field name="date" label="Select Date" component={DatePicker} />
          <SubmitButton label="Submit" />
        </Form>
      )}
    </Formik>
  </MuiThemeProvider>
);

const options = [
  {
    key: "1",
    value: "value1",
    label: "checkbox1"
  },
  {
    key: 2,
    value: "value2",
    label: "checkbox2"
  }
];

export const checkboxGroup = () => (
  <MuiThemeProvider theme={theme}>
    <Formik
      initialValues={{ checkbox: ["value1"] }}
      validationSchema={Yup.object().shape({
        checkbox: Yup.array()
      })}
      onSubmit={action("submited")}
    >
      {() => (
        <Form>
          <Field
            options={options}
            infoTitle="infoTitle"
            name="checkbox"
            component={CheckboxGroup}
          />
          <SubmitButton label="Submit" />
        </Form>
      )}
   </Formik>
  </MuiThemeProvider>
);
