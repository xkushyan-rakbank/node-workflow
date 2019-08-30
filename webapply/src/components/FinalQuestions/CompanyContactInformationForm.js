import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import PureSelect from "../InputField/PureSelect";
import TextField from "@material-ui/core/TextField";
import InfoTitle from "../InfoTitle";
import FormControl from "@material-ui/core/FormControl";
import CombinedSelect from "../InputField/CombinedSelect";

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
  },
  disabledInput: {
    backgroundColor: "rgba(242, 242, 242, 0.5)"
  }
};

class CompanyContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      addressCount: 1,
      secondaryPhoneNumber: false
    };
  }

  handleSecondaryPhoneBtnClick = () => {
    this.setState({ secondaryPhoneNumber: true });
  };

  render() {
    return (
      <form>
        <SectionTitle
          title="Company contact information"
          className={this.props.classes.title}
        />
        <Grid container justify="space-between">
          <h4 className={this.props.classes.groupLabel}>
            Company contact information
          </h4>
          <InfoTitle title="We will use this as your mailing address" />
        </Grid>

        <Checkbox label="The company has no accounts with other banks, inside or outside the UAE" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          {Array.from(Array(this.state.addressCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput id="UI0103" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="UI0117" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <TextInput id="UI0109" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <TextInput id="UI0113" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="UI0115" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControl className="formControl">
                    <TextField
                      className={this.props.classes.disabledInput}
                      variant="outlined"
                      disabled
                      value="United Arab Emirates"
                    />
                  </FormControl>
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Checkbox label="I have more branches elsewhere" />

        <div className={this.props.classes.divider} />

        <Grid container justify="space-between">
          <h4 className={this.props.classes.groupLabel}>
            Preferred contact information
          </h4>
          <InfoTitle title="We will use this for our bank communication with you" />
        </Grid>

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            <CombinedSelect selectId="UI0130" inputId="UI0129" />
            {this.state.secondaryPhoneNumber && (
              <CombinedSelect selectId="UI0136" inputId="UI0133" />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="UI0128" />
          </Grid>
        </Grid>

        {!this.state.secondaryPhoneNumber && (
          <AddButton
            onClick={this.handleSecondaryPhoneBtnClick}
            title="Add a secondary phone number"
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

export default withStyles(style)(CompanyContactInformationForm);
