import React from "react";
import { Grid } from "@material-ui/core";
import { Accordion } from "../../../../../components/Accordion/CustomAccordion";
import { AutoSaveField as Field, Input } from "../../../../../components/Form";
import { Upload } from "../../../../../components/Upload";
import { TL_ACCEPTED_FILE_TYPES } from "../../../../../constants";
import { TL_COI_FILE_SIZE } from "../../../../../constants";

export const MailingAddressSection = () => {
  return (
    <div>
      <Accordion title={"Mailing address"} id={"mailingAddress"}>
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <Field
              name="officeNumber"
              label="Office or shop number"
              placeholder="Office or shop number"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
            />
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
          <Grid item sm={12}>
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
          <Grid item sm={12}>
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
          <Grid item sm={12}>
            <Field
              name="country"
              label="Country"
              placeholder="Country"
              InputProps={{
                inputProps: { tabIndex: 1 }
              }}
              component={Input}
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
