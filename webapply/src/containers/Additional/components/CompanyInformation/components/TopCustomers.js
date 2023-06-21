import React, { Fragment, useCallback } from "react";
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
  const { label: topCustomersTitle } = useDecisions(
    "prospect.companyAdditionalInfo.topCustomers.title"
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

  const isError = useCallback(() => {
    const atleastOneError = values?.topCustomers?.length === 1 && errors?.topCustomers?.[0];
    const morethanOneError =
      errors?.topCustomers && errors?.topCustomers.filter(eachItem => eachItem);
    return (
      atleastOneError ||
      (morethanOneError && morethanOneError.length === values.topCustomers.length)
    );
  }, [errors, values]);

  return (
    <>
      <p className={classes.sectionLabel}>
        {topCustomersTitle ? topCustomersTitle : "Top customers"} (up to 3)
      </p>
      {isError() && (
        <ErrorInfo
          text={`You should add one ${
            topCustomersTitle ? "potential" : "top"
          } customer to continue. `}
        />
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
                      label={"Customer name"}
                      path={`prospect.companyAdditionalInfo.topCustomers[${index}].name`}
                      placeholder={"Customer name"}
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
