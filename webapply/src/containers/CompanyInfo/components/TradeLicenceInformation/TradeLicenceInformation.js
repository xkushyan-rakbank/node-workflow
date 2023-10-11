import React, { useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import { addDays, format, isValid } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

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
import { isDecisionLoading } from "../../../../store/selectors/appConfig";
import { enableInputField } from "../../../../store/actions/decisions";

export const TradeLicenceInformation = ({ values }) => {
  const countryOfIncorporationRef = useRef();
  const waitingForDecision = useSelector(isDecisionLoading);
  const dispatch = useDispatch();
  const changeDateProspectHandler = (_, value, path) =>
    isValid(value) && { [path]: format(value, DATE_FORMAT) };

  useEffect(() => {
    if (values.licenseIssuingAuthority === "") {
      dispatch(enableInputField("prospect.organizationInfo.countryOfIncorporation"));
    }
  }, [values.licenseIssuingAuthority]);

  return (
    <>
      <Field
        name="licenseIssuingAuthority"
        label="Licence issuing authority"
        path="prospect.organizationInfo.licenseIssuingAuthority"
        datalistId="licenseIssuingAuthority"
        isSearchable
        component={SelectAutocomplete}
        isClearable={true}
        tabIndex="0"
        infoIcon={true}
        infoTitle={`This should be the same as shown on your trade licence.
        If your company does not have a UAE trade licence,
         enter the company registration details as shown on other company documents.`}
      />
      <Field
        innerRef={countryOfIncorporationRef}
        name="countryOfIncorporation"
        label="Country of incorporation"
        path="prospect.organizationInfo.countryOfIncorporation"
        datalistId="countryOfIncorporation"
        isSearchable
        component={SelectAutocomplete}
        tabIndex="0"
        filterOptions={options => {
          if (waitingForDecision["prospect.organizationInfo.licenseIssuingAuthority"]) {
            // Return a single "Loading..." option when waiting for a decision
            return [{ label: "Loading...", value: null }];
          }
          const checkLicenceIssuing = blackListedAuthoritiesForUAE[values.licenseIssuingAuthority];
          if (checkLicenceIssuing) {
            return options.filter(item => item.code !== COUNTRY_CODE_UAE);
          }
          return options;
        }}
      />
      <Field
        name="licenseOrCOINumber"
        label="Licence number"
        path="prospect.organizationInfo.licenseOrCOINumber"
        fieldDescription="Special characters allowed (- / . Space)"
        component={Input}
        InputProps={{
          inputProps: { maxLength: MAX_LICENSE_NUMBER_LENGTH, tabIndex: 0 }
        }}
        iconWidth={12}
        iconHeight={12}
      />
      <Grid item container spacing={3}>
        <Grid item sm={6} xs={12}>
          <Field
            name="dateOfIncorporation"
            label="Date of incorporation"
            path="prospect.organizationInfo.dateOfIncorporation"
            placeholder="Date of incorporation"
            component={DatePicker}
            maxDate={addDays(new Date(), 0)}
            inputAdornmentPosition="end"
            infoTitle="The date when your company was legally formed or started."
            showIcon
            disableUnderline={true}
            InputProps={{
              disableUnderline: true,
              inputProps: { tabIndex: 0 }
            }}
            changeProspect={changeDateProspectHandler}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            name="licenseOrCOIExpiryDate"
            label="Licence expiry date"
            path="prospect.organizationInfo.licenseOrCOIExpiryDate"
            placeholder="Licence expiry date"
            inputAdornmentPosition="end"
            component={DatePicker}
            InputProps={{
              disableUnderline: true,
              inputProps: { tabIndex: 0 }
            }}
            minDate={addDays(new Date(), 10)}
            changeProspect={changeDateProspectHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};
