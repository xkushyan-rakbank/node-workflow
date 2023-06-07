import React from "react";
import { Formik, Form } from "formik";

import { Accordion } from "../../../../../components/Accordion/Accordion";
import { useStyles } from "../styled";
import { TopCustomers } from "./TopCustomers";
import { TopSuppliers } from "./TopSuppliers";

export const BusinessRelationship = () => {
  const classes = useStyles();

  const handleSubmit = () => {
    console.log("-handleSubmit-");
  };

  return (
    <div>
      <Formik initialValues={{}} onSubmit={handleSubmit} validateOnChange={false}>
        <Form>
          <Accordion title={"Business relationships"} custom={true}>
            <TopCustomers />
            <TopSuppliers />
          </Accordion>
        </Form>
      </Formik>
    </div>
  );
};
