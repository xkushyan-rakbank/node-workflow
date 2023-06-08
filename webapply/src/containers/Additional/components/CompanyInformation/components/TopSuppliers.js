import React from "react";
import { Button, Grid } from "@material-ui/core";
import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
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
            name="topSuppliers[0].name"
            label="Supplier name"
            path={"prospect.companyAdditionalInfo.topSuppliers[0].name"}
            placeholder="Supplier name"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="topSuppliers[0].country"
            path={"prospect.companyAdditionalInfo.topSuppliers[0].country"}
            label="Country"
            placeholder="Country"
            datalistId="country"
            component={SelectAutocomplete}
          />
        </Grid>
      </Grid>
      <Button color="primary" variant="outlined" className={classes.addMoreButton}>
        + Add more
      </Button>
    </>
  );
};
