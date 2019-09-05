import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";

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
      secondaryPhoneNumber: false,
      isHaveMoreBranches: false
    };
  }

  handleSecondaryPhoneBtnClick = () => {
    this.setState({ secondaryPhoneNumber: true });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle
          title="Company contact information"
          className={this.props.classes.title}
        />
        <Grid container justify="space-between">
          <h4 className={this.props.classes.groupLabel}>Registered address</h4>
          <InfoTitle title="We will use this as your mailing address" />
        </Grid>

        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          {Array.from(Array(this.state.addressCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput
                    id="OrgAddrAdrd.addressFieldDesc"
                    indexes={[index]}
                  />
                  <TextInput id="OrgAddrAdrd.addressLine1" indexes={[index]} />
                  <PureSelect id="OrgAddrAdrd.emirateCity" indexes={[index]} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OrgAddrAdrdSpace.spaceType"
                    indexes={[index]}
                  />
                  <TextInput id="OrgAddrAdrd.poBox" indexes={[index]} />
                  <TextInput
                    id="OrgAddrAdrd.country"
                    indexes={[index]}
                    disabled
                    defaultValue="United Arab Emirates"
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <Checkbox
          label="I have more branches elsewhere"
          value={this.state.isHaveMoreBranches}
          onChange={event =>
            this.setState({ isHaveMoreBranches: event.target.checked })
          }
        />

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
            <TextInput
              id="OrgCont.primaryPhoneNo"
              select={
                <PureSelect
                  id="OrgCont.primaryPhoneCountryCode"
                  defaultValue="USA"
                  combinedSelect
                />
              }
            />
            {this.state.secondaryPhoneNumber && (
              <TextInput
                id="OrgCont.secondaryPhoneNo"
                select={
                  <PureSelect
                    id="OrgCont.secondaryMobileCountryCode"
                    defaultValue="USA"
                    combinedSelect
                  />
                }
              />
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="OrgCont.primaryEmail" />
          </Grid>
        </Grid>

        {!this.state.secondaryPhoneNumber && (
          <AddButton
            onClick={this.handleSecondaryPhoneBtnClick}
            title="Add a secondary phone number"
          />
        )}

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" label="Done" />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyContactInformationForm);
