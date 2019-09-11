import React from "react";
import Grid from "@material-ui/core/Grid";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

const Industry = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} sm={12}>
          <PureSelect id="OkycIndus.industry" indexes={[0]} />
        </Grid>
        <Grid item md={6} sm={12}>
          <PureSelect id="OkycIndus.subCategory" indexes={[0]} disabled />
        </Grid>
      </Grid>
    </>
  );
};

export default Industry;
