import React from "react";
import { Formik } from "formik";
import { Grid } from "@material-ui/core";

import { AutoSaveField as Field, Input, SelectAutocomplete } from "../../../../../components/Form";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { Upload } from "../../../../../components/Upload";
import { TL_ACCEPTED_FILE_TYPES, TL_COI_FILE_SIZE } from "../../../../../constants";

import { useStyles } from "../../styled";

export const SourceOfIncome = () => {
  const classes = useStyles();
  const basePath = "prospect.stakeholderAdditionalInfo.sourceOfIncomeDetails";

  const initialValues = {
    sourceOfIncome: [],
    IBANType: "",
    IBAN: "",
    companyNameforSOF: ""
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}} validateOnChange={false}>
      {({ values, setFieldValue }) => {
        return (
          <Accordion title={"Source of income"} id={"sourceOfIncome"} isCompleted={true}>
            <>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <Field
                    multiple
                    customCheckbox
                    name="sourceOfIncome"
                    path={`${basePath}.sourceOfIncome`}
                    datalistId="sourceOfIncome"
                    label={"Source of income"}
                    onChange={selectedValue => {
                      const withOption = selectedValue.includes("4");
                      const sourceOfWealth = selectedValue.map(value => ({
                        wealthType: value,
                        others: withOption ? values.others : ""
                      }));

                      setFieldValue("sourceOfIncome", sourceOfWealth);
                      if (!withOption) {
                        setFieldValue("others", "");
                      }
                    }}
                    extractValue={value => value.wealthType}
                    infoTitle={"You can select multiple options"}
                    infoIcon={true}
                    component={SelectAutocomplete}
                    tabIndex="0"
                    isSearchable
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="IBANType"
                    path={`${basePath}.IBANType`}
                    datalistId="internationalBankAccountNumber"
                    label="IBAN type"
                    placeholder="IBAN type"
                    component={SelectAutocomplete}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="IBAN"
                    path={`${basePath}.IBAN`}
                    label="IBAN of your UAE bank"
                    placeholder="IBAN of your UAE bank"
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="companyNameforSOF"
                    path={`${basePath}.companyNameforSOF`}
                    label="Company name"
                    placeholder="Company name"
                    InputProps={{
                      inputProps: { tabIndex: 1 }
                    }}
                    component={Input}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="tradeLicenceFile"
                    type="file"
                    fieldDescription={"Upload Trade licence"}
                    helperText={
                      "Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                    }
                    accept={TL_ACCEPTED_FILE_TYPES}
                    fileSize={TL_COI_FILE_SIZE}
                    component={Upload}
                    showUploadInfoIcon={true}
                    contextualHelpText="Upload your other company's trade license for which the IBAN is shared above has context menu"
                    contextualHelpProps={{
                      isDisableHoverListener: false,
                      placement: "left"
                    }}
                  />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <div className={classes.horizontalLine} />
                </Grid>
                <Grid item sm={12} xs={12}>
                  <Field
                    name="proofOfIncome"
                    type="file"
                    fieldDescription={"Proof of income"}
                    helperText={
                      "Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"
                    }
                    accept={TL_ACCEPTED_FILE_TYPES}
                    fileSize={TL_COI_FILE_SIZE}
                    component={Upload}
                    showInfoIcon={true}
                    infoTitle={"You can select multiple options"}
                    infoIcon={true}
                  />
                </Grid>
              </Grid>
            </>
          </Accordion>
        );
      }}
    </Formik>
  );
};
