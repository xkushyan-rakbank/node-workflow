import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
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

class CompanyNetworkForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.limits = {
      anotherBankCount: 5,
      insideSubsidiaryCount: 5,
      outsideSubsidiaryCount: 5
    };
    this.state = {
      anotherBankCount: 1,
      insideSubsidiaryCount: 0,
      outsideSubsidiaryCount: 0,
      isDontHaveOtherBankAccounts: false,
      isDontHaveInsideSubsidiary: false,
      isDontHaveOutsideSubsidiary: false
    };
  }

  updateCountedStateValue = (key, increment = 1) => {
    if (key in this.limits && this.state[key] >= this.limits[key]) {
      return;
    }
    this.setState({ [key]: this.state[key] + increment });
  };

  handleAddAnotherBank = () => {
    this.updateCountedStateValue("anotherBankCount");
  };

  handleAddInsideSubsidiaryClick = () => {
    this.updateCountedStateValue("insideSubsidiaryCount");
  };

  handleAddOutsideSubsidiaryClick = () => {
    this.updateCountedStateValue("outsideSubsidiaryCount");
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
        <Checkbox
          label="The company has no accounts with other banks, inside or outside the UAE"
          value={this.state.isDontHaveOtherBankAccounts}
          onChange={event =>
            this.setState({ isDontHaveOtherBankAccounts: event.target.checked })
          }
        />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item sm={12}>
            {Array.from(Array(this.state.anotherBankCount).keys()).map(
              index => {
                return (
                  <TextInput
                    key={index}
                    id="OkycObriObd.bankName"
                    indexes={[index]}
                    disabled={this.state.isDontHaveOtherBankAccounts}
                  />
                );
              }
            )}
          </Grid>
        </Grid>
        {!this.state.isDontHaveOtherBankAccounts && (
          <AddButton
            onClick={this.handleAddAnotherBank}
            title="Add another bank"
            disabled={
              this.state.anotherBankCount >= this.limits.anotherBankCount
            }
          />
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries inside the UAE
        </h4>

        <Checkbox
          label="The company has no branches, subsidiaries or other companies, inside or outside the UAE"
          value={this.state.isDontHaveInsideSubsidiary}
          onChange={event =>
            this.setState({ isDontHaveInsideSubsidiary: event.target.checked })
          }
        />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          {Array.from(Array(this.state.insideSubsidiaryCount).keys()).map(
            index => {
              return (
                <React.Fragment key={index}>
                  <Grid item sm={12}>
                    <TextInput
                      key={index}
                      id="OkycEntIn.companyName"
                      indexes={[index]}
                      disabled={this.state.isDontHaveInsideSubsidiary}
                    />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <TextInput
                      key={index}
                      id="OkycEntIn.tradeLicenseNo"
                      indexes={[index]}
                      disabled={this.state.isDontHaveInsideSubsidiary}
                    />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <PureSelect
                      key={index}
                      id="OkycEntIn.emirate"
                      indexes={[index]}
                      disabled={this.state.isDontHaveInsideSubsidiary}
                    />
                  </Grid>
                </React.Fragment>
              );
            }
          )}
        </Grid>

        <AddButton
          onClick={this.handleAddInsideSubsidiaryClick}
          title="Add a subsidiary inside the UAE"
          disabled={
            this.state.insideSubsidiaryCount >=
              this.limits.insideSubsidiaryCount ||
            this.state.isDontHaveInsideSubsidiary
          }
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries outside the UAE
        </h4>
        <Checkbox
          label="The company has no branches, subsidiaries or other companies, inside or outside the UAE"
          value={this.state.isDontHaveOutsideSubsidiary}
          onChange={event =>
            this.setState({ isDontHaveOutsideSubsidiary: event.target.checked })
          }
        />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          {Array.from(Array(this.state.outsideSubsidiaryCount).keys()).map(
            index => {
              return (
                <React.Fragment key={index}>
                  <Grid item md={6} sm={12}>
                    <TextInput
                      key={index}
                      id="OkycEntOut.companyName"
                      indexes={[index]}
                      disabled={this.state.isDontHaveOutsideSubsidiary}
                    />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <PureSelect
                      key={index}
                      id="OkycEntOut.country"
                      indexes={[index]}
                      disabled={this.state.isDontHaveOutsideSubsidiary}
                    />
                  </Grid>
                </React.Fragment>
              );
            }
          )}
        </Grid>

        <AddButton
          onClick={this.handleAddOutsideSubsidiaryClick}
          title="Add another subsidiary"
          disabled={
            this.state.outsideSubsidiaryCount >=
              this.limits.outsideSubsidiaryCount ||
            this.state.isDontHaveOutsideSubsidiary
          }
        />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyNetworkForm);
