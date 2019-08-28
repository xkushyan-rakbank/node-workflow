import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import AddButton from "../Buttons/AddButton";

const style = {
  title: {
    fontSize: "16px"
  },
  groupLabel: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.9",
    color: "#373737"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    marginTop: "30px",
    borderBottom: "solid 1px rgba(230, 230, 230, 0.5)"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class CompanyBackgroundForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  render() {
    return (
      <form>
        <SectionTitle
          title="Company background"
          className={this.props.classes.title}
        />

        <h4 className={this.props.classes.groupLabel}>Main customers</h4>
        <Checkbox label="I don't have customers yet" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <TextInput id="UI0188" index="0" />
          </Grid>
          <Grid item md={6} sm={12}>
            {/*<PureSelect id="UI0189" index="0" />*/}
            <TextInput id="UI0189" index="0" />
          </Grid>
        </Grid>
        <AddButton title="Add another customer" />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Main suppliers</h4>
        <Checkbox label="I don't have suppliers yet" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <TextInput id="UI0193" index="0" />
          </Grid>
          <Grid item md={6} sm={12}>
            {/*<PureSelect id="UI0194" index="0" />*/}
            <TextInput id="UI0194" index="0" />
          </Grid>
        </Grid>
        <AddButton title="Add another supplier" />
        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Main origin of goods</h4>
        <Checkbox label="I don't trade with goods yet" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            {/*<PureSelect id="UI0197" index="0" />*/}
            <TextInput id="UI0197" index="0" />
          </Grid>
        </Grid>
        <AddButton title="Add another country of origin" />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyBackgroundForm);
