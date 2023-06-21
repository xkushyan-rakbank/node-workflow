import React from "react";
import { useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import { FieldArray } from "formik";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import IconButton from "@material-ui/core/IconButton";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { useStyles } from "../../styled";
import { BUSINESS_RELATIONSHIPS } from "../../../../../constants";
import { updateProspect } from "../../../../../store/actions/appConfig";
import useDecisions from "../../../../../utils/useDecisions";

export const TopSuppliers = ({ topSuppliers, values, errors, setFieldValue, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { label: topSupplierTitle } = useDecisions(
    "prospect.companyAdditionalInfo.topSuppliers.title"
  );

  const addSupplier = (arrayHelpers, arrayLength) => {
    arrayHelpers.insert(arrayLength, {
      name: "",
      country: "AE"
    });
  };

  const removeSupplier = (arrayHelpers, itemIndex) => {
    arrayHelpers.remove(itemIndex);
    topSuppliers.splice(itemIndex, 1);
    dispatch(
      updateProspect({
        "prospect.companyAdditionalInfo.topSuppliers": topSuppliers
      })
    );
  };

  const checkIsAddButtonDisabled = () => {
    const customerArray = values.topSuppliers;
    if (!customerArray.length) {
      return false;
    }
    const lastAddedItem = customerArray[customerArray.length - 1];
    return (
      customerArray.length === BUSINESS_RELATIONSHIPS.SUPPLIER_LIMIT ||
      ["name", "country"].some(item => lastAddedItem[item] === "")
    );
  };

  return (
    <div className={classes.supplierSection}>
      <p className={classes.sectionLabel}>
        {topSupplierTitle ? topSupplierTitle : "Top suppliers"} (up to 3)
      </p>
      <FieldArray
        name="topSuppliers"
        render={arrayHelpers => (
          <>
            {values?.topSuppliers?.map((item, index) => (
              <Grid container spacing={3} key={index} style={{ marginBottom: "20px" }}>
                <Grid item sm={6} xs={12}>
                  <Field
                    name={`topSuppliers[${index}].name`}
                    label={"Supplier name"}
                    path={`prospect.companyAdditionalInfo.topSuppliers[${index}].name`}
                    placeholder={"Supplier name"}
                    InputProps={{
                      inputProps: { maxLength: 255, tabIndex: 1 }
                    }}
                    component={Input}
                    classes={{ formControlRoot: classes.customLabel }}
                  />
                </Grid>
                <Grid item sm={6} xs={12} style={{ textAlign: "right" }}>
                  <Field
                    name={`topSuppliers[${index}].country`}
                    path={`prospect.companyAdditionalInfo.topSuppliers[${index}].country`}
                    label="Country"
                    placeholder="Country"
                    datalistId="country"
                    component={SelectAutocomplete}
                    classes={{ formControlRoot: classes.customLabel }}
                  />
                  {values.topSuppliers.length > 1 && index > 0 && (
                    <IconButton
                      aria-label="delete"
                      style={{ padding: 0, marginTop: "5px" }}
                      onClick={() => removeSupplier(arrayHelpers, index)}
                    >
                      <HighlightOffIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Button
              color="primary"
              variant="outlined"
              className={classes.addMoreButton}
              onClick={() => addSupplier(arrayHelpers, values.topSuppliers.length)}
              disabled={checkIsAddButtonDisabled()}
            >
              + Add more
            </Button>
          </>
        )}
      />
    </div>
  );
};
