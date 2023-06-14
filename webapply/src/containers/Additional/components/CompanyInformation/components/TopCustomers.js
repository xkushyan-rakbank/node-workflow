import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { FieldArray } from "formik";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { useStyles } from "../styled";
import { ErrorInfo } from "../../../../../components/InfoNote/ErrorInfo";
import { updateProspect } from "../../../../../store/actions/appConfig";
import { BUSINESS_RELATIONSHIPS } from "../../../../../constants";
import useDecisions from "../../../../../utils/useDecisions";

export const TopCustomers = ({ topCustomers, values, errors, setFieldValue, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { label: topCustomersNameLabel } = useDecisions(
    "prospect.companyAdditionalInfo.topCustomers[0].name"
  );

  const addCustomers = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      name: "",
      country: "AE"
    });
    if (values.topCustomers[0].name === "Walk-in Customer") {
      setFieldValue(`topCustomers[${arrayLength}].name`, "Walk-in Customer");
      setFieldValue(`topCustomers[${arrayLength}].country`, "AE");
    }
  };

  const removeCustomer = (arrayHelpers, itemIndex) => {
    arrayHelpers.remove(itemIndex);
    topCustomers.splice(itemIndex, 1);
    dispatch(
      updateProspect({
        "prospect.companyAdditionalInfo.topCustomers": topCustomers
      })
    );
  };

  const checkIsAddButtonDisabled = () => {
    const customerArray = values.topCustomers;
    if (!customerArray.length) {
      return false;
    }
    const lastAddedItem = customerArray[customerArray.length - 1];
    return (
      customerArray.length === BUSINESS_RELATIONSHIPS.CUSTOMER_LIMIT ||
      ["name", "country"].some(item => lastAddedItem[item] === "")
    );
  };

  return (
    <>
      <p className={classes.sectionLabel}>Top customers (up to 3)</p>
      {errors?.topCustomers?.[0] && (
        <ErrorInfo text={"You should add one top customer to continue. "} />
      )}
      <FieldArray
        name="topCustomers"
        render={arrayHelpers => (
          <>
            <Grid container spacing={3} style={{ marginBottom: "20px" }}>
              {values.topCustomers.map((item, index) => (
                <Fragment key={index}>
                  <Grid item sm={6} xs={12}>
                    <Field
                      name={`topCustomers[${index}].name`}
                      label={topCustomersNameLabel || "Customer name"}
                      path={`prospect.companyAdditionalInfo.topCustomers[${index}].name`}
                      placeholder={topCustomersNameLabel || "Customer name"}
                      InputProps={{
                        inputProps: { maxLength: 255, tabIndex: 1 }
                      }}
                      component={Input}
                      classes={{ formControlRoot: classes.customLabel }}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} style={{ textAlign: "right" }}>
                    <Field
                      name={`topCustomers[${index}].country`}
                      path={`prospect.companyAdditionalInfo.topCustomers[${index}].country`}
                      label="Country"
                      placeholder="Country"
                      datalistId="country"
                      component={SelectAutocomplete}
                      classes={{ formControlRoot: classes.customLabel }}
                    />
                    {values.topCustomers.length > 1 && index > 0 && (
                      <IconButton
                        aria-label="delete"
                        style={{ padding: 0, marginTop: "5px" }}
                        onClick={() => removeCustomer(arrayHelpers, index)}
                      >
                        <HighlightOffIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Fragment>
              ))}
            </Grid>
            <Button
              color="primary"
              variant="outlined"
              className={classes.addMoreButton}
              onClick={() => addCustomers(arrayHelpers, values.topCustomers.length)}
              disabled={checkIsAddButtonDisabled()}
            >
              + Add more
            </Button>
          </>
        )}
      />
    </>
  );
};
