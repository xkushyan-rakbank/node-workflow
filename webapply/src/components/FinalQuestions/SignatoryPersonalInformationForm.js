import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
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
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  }
};

class SignatoryPersonalInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  render() {
    return (
      <form>
        <SectionTitle
          title="Personal Information"
          className={this.props.classes.title}
        />
        <Grid
          spacing={3}
          container
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <PureSelect id="Sig.maritalStatus" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput
              id="Sig.mothersMaidenName"
              indexes={[this.props.index]}
            />
          </Grid>
        </Grid>

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(SignatoryPersonalInformationForm);
