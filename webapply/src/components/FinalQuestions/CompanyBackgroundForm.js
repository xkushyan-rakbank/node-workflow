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

  constructor(props) {
    super(props);

    this.state = {
      customerCount: 1,
      supplierCount: 1,
      countryOfOriginCount: 1
    };
  }

  updateCountedStateValue = (key, increment = 1) => {
    this.setState({ [key]: this.state[key] + increment });
  };

  handleAddCustomerClick = () => {
    this.updateCountedStateValue("customerCount");
  };

  handleAddSupplierClick = () => {
    this.updateCountedStateValue("supplierCount");
  };

  handleAddCountryOfOriginClick = () => {
    this.updateCountedStateValue("countryOfOriginCount");
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
          {Array.from(Array(this.state.customerCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput id="UI0188" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="UI0189" index={index} />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={this.handleAddCustomerClick}
          title="Add another customer"
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Main suppliers</h4>
        <Checkbox label="I don't have suppliers yet" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          {Array.from(Array(this.state.supplierCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput id="UI0193" index={index} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="UI0194" index={index} />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={this.handleAddSupplierClick}
          title="Add another supplier"
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Main origin of goods</h4>
        <Checkbox label="I don't trade with goods yet" />
        <Grid
          container
          spacing={3}
          className={this.props.classes.flexContainer}
        >
          <Grid item md={6} sm={12}>
            {Array.from(Array(this.state.countryOfOriginCount).keys()).map(
              index => {
                return <PureSelect key={index} id="UI0197" index={index} />;
              }
            )}
          </Grid>
        </Grid>
        <AddButton
          onClick={this.handleAddCountryOfOriginClick}
          title="Add another country of origin"
        />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton handleClick={this.props.handleContinue} />
        </div>
      </form>
    );
  }
}

export default withStyles(style)(CompanyBackgroundForm);
