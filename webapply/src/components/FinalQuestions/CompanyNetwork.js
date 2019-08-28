import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
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

class CompanyNetwork extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  render() {
    return (
      <form>
        <SectionTitle
          title="Company network"
          className={this.props.classes.title}
        />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with other banks
        </h4>
        <Checkbox label="The company has no accounts with other banks, inside or outside the UAE" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            <TextInput id="UI0188" index="0" />
          </Grid>
        </Grid>
        <AddButton title="Add another bank" />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries inside the UAE
        </h4>
        <Checkbox label="The company has no branches, subsidiaries or other companies, inside or outside the UAE" />
        <AddButton title="Add a subsidiary inside the UAE" />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries outside the UAE
        </h4>
        <Checkbox label="The company has no branches, subsidiaries or other companies, inside or outside the UAE" />
        <AddButton title="Add a subsidiary inside the UAE" />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyNetwork);
