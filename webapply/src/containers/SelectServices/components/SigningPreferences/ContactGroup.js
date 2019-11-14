import React from "react";
import Grid from "@material-ui/core/Grid";
import get from "lodash/get";

import TextInput from "../../../../components/InputField/TextInput";
import PureSelect from "../../../../components/InputField/PureSelect";

const getValueInput = (index, signatoryInfo) => get(signatoryInfo[index], "fullName", "");

export const ContactGroup = ({ signatoryInfo = [""] }) => {
  return signatoryInfo.map((person, index) => (
    <React.Fragment key={index}>
      <TextInput id="Sig.fullName" indexes={[index]} />

      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="OrgContReconf.primaryMobileNo"
            indexes={[index]}
            isRequired={!!getValueInput(index, signatoryInfo)}
            select={
              <PureSelect
                id="OrgContReconf.primaryMobCountryCode"
                indexes={[index]}
                combinedSelect
                defaultValue="971"
              />
            }
          />
        </Grid>

        <Grid item md={6} sm={12}>
          <TextInput
            id="OrgContReconf.primaryPhoneNo"
            indexes={[index]}
            select={
              <PureSelect
                id="OrgContReconf.primaryPhoneCountryCode"
                indexes={[index]}
                combinedSelect
                defaultValue="971"
              />
            }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  ));
};
