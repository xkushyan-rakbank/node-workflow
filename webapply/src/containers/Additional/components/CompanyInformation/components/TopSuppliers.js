

import React from "react";
import { Field } from "formik";
import { Button, Grid } from "@material-ui/core";
import { Input } from "../../../../../components/Form";
import { useStyles } from "../styled";

export const TopSuppliers = () => {
  const classes = useStyles();
  return (
    <>
      <p className={classes.sectionLabel} style={{ marginTop: "40px" }}>
        Top suppliers (up to 3)
      </p>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Field
            name="suppliername"
            label="Supplier name"
            placeholder="Supplier name"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="country"
            label="Country"
            placeholder="Country"
            component={Input}
            InputProps={{
              inputProps: { tabIndex: 2 }
            }}
          />
        </Grid>
      </Grid>
      <Button color="primary" variant="outlined" className={classes.addMoreButton} disabled={true}>
        + Add more
      </Button>
    </>
  );
};
