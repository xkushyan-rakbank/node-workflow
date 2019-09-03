import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import cx from "classnames";
import PureSelect from "../components/InputField/PureSelect";
import SectionTitle from "../components/SectionTitle";
import SubmitButton from "../components/Buttons/SubmitButton";
import DatePicker from "../components/InputField/DatePicker";
import TextInput from "../components/InputField/TextInput";
import routes from "./../routes"; // remove it in future

const style = {
  sectionTitleIndent: {
    marginBottom: "24px"
  },
  topIndent: {
    marginTop: "40px"
  }
};

const AboutCompany = props => {
  const handleSubmit = values => {
    console.log("values", JSON.stringify(values, null, 2));
  };
  const { classes } = props;
  return (
    <>
      <h2>Tell Us about Your Company</h2>
      <p className="formDescription">
        Explanation text goes here. One to three short sentences maximum. This
        is the third sentence.
      </p>
      <form onSubmit={handleSubmit}>
        <SectionTitle
          title="Company Details"
          className={classes.sectionTitleIndent}
        />

        <TextInput id="UI0078" />

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0152" />
          </Grid>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0161" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0092" />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0081" />
          </Grid>
        </Grid>

        <SectionTitle
          title="Industry"
          className={cx(classes.sectionTitleIndent, classes.topIndent)}
        />

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0201" indexes="1" />
          </Grid>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0204" indexes="1" disabled />
          </Grid>
        </Grid>

        <SectionTitle
          title="License Information"
          className={cx(classes.sectionTitleIndent, classes.topIndent)}
        />

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0089" />
          </Grid>
          <Grid item md={6} sm={12}>
            <DatePicker id="UI0090" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0087" />
          </Grid>
          <Grid item md={6} sm={12}>
            <PureSelect id="UI0076" />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12}>
            <DatePicker id="UI0080" />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0185" />
          </Grid>
        </Grid>

        <Link to={routes.stakeholdersInfo}>
          <SubmitButton />
        </Link>
      </form>
    </>
  );
};

export default withStyles(style)(AboutCompany);
