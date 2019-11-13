import React from "react";
import Grid from "@material-ui/core/Grid";

import TextInput from "../../InputField/TextInput";
import PureSelect from "../../InputField/PureSelect";

const ContactGroup = ({ index, isRequired }) => {
  return (
    <>
      <TextInput id="Sig.fullName" indexes={[index]} />

      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <TextInput
            id="OrgContReconf.primaryMobileNo"
            indexes={[index]}
            required={!!isRequired}
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
    </>
  );
};

export default ContactGroup;
