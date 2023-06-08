import React from "react";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { useStyles } from "../styled";

export const TopCustomers = () => {
  const classes = useStyles();

  return (
    <>
      <p className={classes.sectionLabel}>Top customers (up to 3)</p>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Field
            name="topCustomers[0].name"
            label="Customer name"
            path={"prospect.companyAdditionalInfo.topCustomers[0].name"}
            placeholder="Customer name"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="topCustomers[0].country"
            path={"prospect.companyAdditionalInfo.topCustomers[0].country"}
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
