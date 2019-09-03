import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import CombinedSelect from "../InputField/CombinedSelect";
import AddButton from "../Buttons/AddButton";
import PureSelect from "../InputField/PureSelect";
import CustomCheckbox from "../InputField/RefactoredCheckbox";

const style = {
  title: {
    fontSize: "16px",
    marginBottom: "20px"
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

class SignatoryContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {},
    index: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      isAddLandlineNumber: false
    };
  }

  render() {
    return (
      <form>
        <SectionTitle
          title="Preferred contact information"
          className={this.props.classes.title}
        />

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            <CustomCheckbox id="UI0350" indexes={[this.props.index]} />
            <TextInput id="UI0361" indexes={[this.props.index]} />
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0364" indexes={[this.props.index]} />
            <PureSelect id="UI0370" indexes={[this.props.index]} />
            <CombinedSelect
              selectId="UI0324"
              inputId="UI0323"
              indexes={[this.props.index]}
            />
            {this.state.isAddLandlineNumber && (
              <CombinedSelect
                selectId="UI0327"
                inputId="UI0326"
                indexes={[this.props.index]}
              />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0368" indexes={[this.props.index]} />
            <PureSelect id="UI0369" indexes={[this.props.index]} />
            <TextInput id="UI0325" indexes={[this.props.index]} />
          </Grid>
        </Grid>

        {!this.state.isAddLandlineNumber && (
          <AddButton
            title="Add a landline number"
            onClick={() => this.setState({ isAddLandlineNumber: true })}
          />
        )}

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton
            handleClick={this.props.handleContinue}
            label="Done"
          />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(SignatoryContactInformationForm);
