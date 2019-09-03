import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";

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

class SignatoryEmploymentDetailsForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  render() {
    return (
      <form>
        <SectionTitle
          title="Employment details"
          className={this.props.classes.title}
        />

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            {/* Not sure about UI0347 id prospect.signatoryInfo[*].employmentDetails.occupation - on design mockups was "Qualification" label */}
            <TextInput id="UI0347" indexes={[this.props.index]} />

            <PureSelect id="UI0337" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0348" indexes={[this.props.index]} />
            <TextInput id="UI0343" indexes={[this.props.index]} />
          </Grid>
          <Grid item sm={12}>
            <Checkbox label="This Person works at Designit Arabia" />
          </Grid>
          <Grid item sm={12}>
            {/* not sure UI0346 id prospect.signatoryInfo[*].employmentDetails.employerName - on design mockups was "Company Name" label*/}
            <TextInput id="UI0346" indexes={[this.props.index]} />
          </Grid>
        </Grid>

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(SignatoryEmploymentDetailsForm);
