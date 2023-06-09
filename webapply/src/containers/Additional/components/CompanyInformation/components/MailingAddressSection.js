import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import {
  CheckboxGroup,
  AutoSaveField as Field,
  Input,
  SelectAutocomplete
} from "../../../../../components/Form";
import { Upload } from "../../../../../components/Upload";
import { TL_ACCEPTED_FILE_TYPES } from "../../../../../constants";
import { TL_COI_FILE_SIZE } from "../../../../../constants";
import { useStyles } from "../styled";
import { virtualOrPhysicalAddressOptions } from "../../../../../constants/options";

export const MailingAddressSection = () => {
  const classes = useStyles();
  const [isVirtualAddress, setIsVirtualAddress] = useState(true);

  const handleAddressTypeSelection = event => {
    if (event.target.value !== "virtual") {
      setIsVirtualAddress(false);
    }
  };

  return (
    <div>
      <Accordion title={"Mailing address"} id={"mailingAddress"}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <div className={classes.virtualOrPhysicalAddressSelection}>
              <Field
                name="addressInfo[0].typeOfAddress"
                datalistId="addressInfo[0].typeOfAddress"
                path={"prospect.companyAdditionalInfo.addressInfo[0].typeOfAddress"}
                options={virtualOrPhysicalAddressOptions}
                component={CheckboxGroup}
                typeOfCheckbox="radio"
                onSelect={event => handleAddressTypeSelection(event)}
              />
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            {!isVirtualAddress && (
              <Field
                name="officeNumber"
                label="Office or shop number"
                placeholder="Office or shop number"
                InputProps={{
                  inputProps: { tabIndex: 1 }
                }}
                component={Input}
              />
            )}
            {isVirtualAddress && (
              <Field
                name="villa"
                label="Flat, villa or building"
                placeholder="Flat, villa or building"
                InputProps={{
                  inputProps: { tabIndex: 1 }
                }}
                component={Input}
              />
            )}
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              name="pobox"
              label="P.O. Box"
              placeholder="P.O. Box"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="location"
              label="Street or location"
              placeholder="Street or location"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="city"
              label="Emirate or city"
              placeholder="Emirate or city"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              name="addressInfo[0].addressDetails.country"
              path={"prospect.companyAdditionalInfo.addressInfo[0].addressDetails.country"}
              label="Country"
              placeholder="Country"
              datalistId="country"
              component={SelectAutocomplete}
              disabled={true}
            />
          </Grid>
          <Grid item sm={12}>
            <Field
              name="proofOfAddress"
              type="file"
              fieldDescription="Proof of Company Address"
              helperText={"Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum"}
              accept={TL_ACCEPTED_FILE_TYPES}
              fileSize={TL_COI_FILE_SIZE}
              // onDrop={acceptedFile => handleDropFile(acceptedFile, "tradeLicenseOrCOI")}
              // file={values.tradeLicenseOrCOI}
              // onDelete={() => setFieldValue("tradeLicenseOrCOI", "")}
              component={Upload}
            />
          </Grid>
        </Grid>
      </Accordion>
    </div>
  );
};
