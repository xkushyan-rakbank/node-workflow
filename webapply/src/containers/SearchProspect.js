import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextInput from "../components/InputField/TextInput";
import ContinueButton from "../components/Buttons/ContinueButton";
import PureSelect from "../components/InputField/PureSelect";
import Grid from "@material-ui/core/Grid";

const styles = {
  baseForm: {
    maxWidth: "612px"
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  },

  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  indent: {
    marginBottom: "24px"
  }
};

class SearchProspect extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    console.log(isValid, event.target.elements);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Search Prospect</h2>

        <form onSubmit={this.handleSubmit} noValidate>
          <TextInput id="Search.fullName" />

          <TextInput
            id="Search.mobileNo"
            selectId="Search.countryCode"
            select={
              <PureSelect
                id="Search.countryCode"
                combinedSelect
                defaultValue="USA"
              />
            }
          />

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.leadNumber" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.tradeLicenseNo" />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.email" />
            </Grid>
            <Grid item md={6} sm={12}>
              <TextInput id="Search.eidNumber" />
            </Grid>
          </Grid>

          <div className="linkContainer">
            <ContinueButton />
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(styles)(SearchProspect);
