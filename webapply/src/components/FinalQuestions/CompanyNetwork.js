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

class CompanyNetwork extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.insideSubsidiaryCountLimit = 5;
    this.outsideSubsidiaryCountLimit = 5;

    this.state = {
      anotherBankCount: 1,
      insideSubsidiaryCount: 0,
      outsideSubsidiaryCount: 0
    };
  }

  handleAddAnotherBank = () => {
    this.setState({ anotherBankCount: this.state.anotherBankCount + 1 });
  };

  handleAddInsideSubsidiaryClick = () => {
    if (this.state.insideSubsidiaryCount < this.insideSubsidiaryCountLimit) {
      this.setState({
        insideSubsidiaryCount: this.state.insideSubsidiaryCount + 1
      });
    }
  };

  handleAddOutsideSubsidiaryClick = () => {
    if (this.state.outsideSubsidiaryCount < this.outsideSubsidiaryCountLimit) {
      this.setState({
        outsideSubsidiaryCount: this.state.outsideSubsidiaryCount + 1
      });
    }
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
            {Array.from(Array(this.state.anotherBankCount).keys()).map(
              index => {
                return <TextInput key={index} id="UI0221" index={index} />;
              }
            )}
          </Grid>
        </Grid>
        <AddButton
          onClick={this.handleAddAnotherBank}
          title="Add another bank"
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries inside the UAE
        </h4>

        <Checkbox label="The company has no branches, subsidiaries or other companies, inside or outside the UAE" />
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
                    <TextInput key={index} id="UI0225" index={index} />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <TextInput key={index} id="UI0228" index={index} />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <PureSelect key={index} id="UI0226" index={index} />
                  </Grid>
                </React.Fragment>
              );
            }
          )}
        </Grid>

        <AddButton
          onClick={this.handleAddInsideSubsidiaryClick}
          title="Add a subsidiary inside the UAE"
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Relationships with subsidiaries outside the UAE
        </h4>
        <Checkbox label="The company has no branches, subsidiaries or other companies, inside or outside the UAE" />
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
                    <TextInput key={index} id="UI0232" index={index} />
                  </Grid>
                  <Grid item md={6} sm={12}>
                    <PureSelect key={index} id="UI0233" index={index} />
                  </Grid>
                </React.Fragment>
              );
            }
          )}
        </Grid>

        <AddButton
          onClick={this.handleAddOutsideSubsidiaryClick}
          title="Add another subsidiary"
        />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyNetwork);
