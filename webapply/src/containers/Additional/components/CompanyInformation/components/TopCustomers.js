import React from "react";
import { Field } from "formik";
import { Button, IconButton, withStyles } from "@material-ui/core";
import MuiGrid from "@material-ui/core/Grid";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Input, SelectAutocomplete } from "../../../../../components/Form";
import { useStyles } from "../styled";

export const TopCustomers = () => {
  const classes = useStyles();

  const Grid = withStyles({
    root: {
      "&$-container": {
        position: "relative"
      }
    }
  })(MuiGrid);
  return (
    <>
      <p className={classes.sectionLabel}>Top customers (up to 3)</p>
      <Grid container spacing={3} className="testing">
        <Grid item sm={6} xs={12}>
          <Field
            name="customername"
            label="Customer name"
            placeholder="Customer name"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="Country"
            label="Country"
            placeholder="Country"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={12}>
          <IconButton aria-label="delete" color="#757575" className={classes.removeButton}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Field
            name="customername"
            label="Customer name"
            placeholder="Customer name"
            className={classes.marginZero}
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="Country"
            label="Country"
            placeholder="Country"
            InputProps={{
              inputProps: { tabIndex: 1 }
            }}
            component={Input}
          />
        </Grid>
        <Grid item sm={12}>
          <IconButton aria-label="delete" color="#757575" className={classes.removeButton}>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Button color="primary" variant="outlined" className={classes.addMoreButton} disabled={true}>
        + Add more
      </Button>
    </>
  );
};
