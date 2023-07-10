import React from "react";
import Grid from "@material-ui/core/Grid";
import { addDays, format, isValid } from "date-fns";
import {
  SelectAutocomplete,
  AutoSaveField as Field,
  Input,
  DatePicker
} from "../../../../components/Form";
import {
  blackListedAuthoritiesForUAE,
  COUNTRY_CODE_UAE,
  MAX_LICENSE_NUMBER_LENGTH
} from "../../constants";
import { DATE_FORMAT } from "../../../../constants";

export const TradeLicenceInformation = ({ values }) => {
  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };
  return (
    <>
      <Field
        name="licenseIssuingAuthority"
        label="Licence issuing authority"
        path="prospect.organizationInfo.licenseIssuingAuthority"
        datalistId="licenseIssuingAuthority"
        isSearchable
        component={SelectAutocomplete}
        tabIndex="0"
        infoTitle={`This should be the same as shown on your trade licence.
        If your company does not have a UAE trade licence, enter the company registration details as shown on other company documents.`}
      />
      <Field
        name="countryOfIncorporation"
        label="Country of incorporation"
        path="prospect.organizationInfo.countryOfIncorporation"
        datalistId="countryOfIncorporation"
        isSearchable
        component={SelectAutocomplete}
        tabIndex="0"
        filterOptions={options => {
          const checkLicenceIssuing = blackListedAuthoritiesForUAE[values.licenseIssuingAuthority];
          if (checkLicenceIssuing) {
            return options.filter(item => item.code !== COUNTRY_CODE_UAE);
          }
          return options;
        }}
      />
      <Field
        name="licenseOrCOINumber"
        label="TL number/Certificate of Incorporation number"
        path="prospect.organizationInfo.licenseOrCOINumber"
        fieldDescription="Special characters allowed (- / . Space)"
        component={Input}
        InputProps={{
          inputProps: { maxLength: MAX_LICENSE_NUMBER_LENGTH, tabIndex: 0 }
        }}
      />
      <Grid item container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Field
            name="licenseOrCOIExpiryDate"
            label="Licence or Certificate of Incorporation expiry date"
            path="prospect.organizationInfo.licenseOrCOIExpiryDate"
            placeholder="Licence or Certificate of Incorporation expiry date"
            component={DatePicker}
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            minDate={addDays(new Date(), 10)}
            changeProspect={changeDateProspectHandler}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="dateOfIncorporation"
            label="Date of incorporation"
            path="prospect.organizationInfo.dateOfIncorporation"
            placeholder="Date of incorporation"
            component={DatePicker}
            maxDate={addDays(new Date(), 0)}
            infoTitle="The date when your company was legally formed or started."
            InputProps={{
              inputProps: { tabIndex: 0 }
            }}
            changeProspect={changeDateProspectHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};
