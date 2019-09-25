import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import SectionTitle from "../SectionTitle";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import AddButton from "../Buttons/AddButton";
import { updateField } from "../../store/actions/appConfig";
import { getOrgKYCDetails } from "../../store/selectors/appConfig";

const styles = {
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

    this.limits = {
      customerCount: 5,
      supplierCount: 5,
      countryOfOriginCount: 5
    };
    this.state = {
      isDontTradingGoods: false,
      isDontHaveSuppliers: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.isDontTradingGoods !== this.state.isDontTradingGoods &&
      this.state.isDontTradingGoods
    ) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.topOriginGoodsCountries",
        value: [""]
      });
    }
    if (
      prevState.isDontHaveSuppliers !== this.state.isDontHaveSuppliers &&
      this.state.isDontHaveSuppliers
    ) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.topSuppliers",
        value: [this.getEmptyCustomerSupplierItem()]
      });
    }
  }

  /**
   * @typedef {Object} CustomerSupplierData
   * @property {String} name
   * @property {String} country
   *
   * Filed empty item collection
   * @param {CustomerSupplierData} [item]
   * @return {CustomerSupplierData}
   */
  mapNameAndCountryCollection = item => {
    const { name = "", country = "" } = item || {};
    return { name, country };
  };

  /**
   * @return {CustomerSupplierData}
   */
  getEmptyCustomerSupplierItem() {
    return {
      name: "",
      country: ""
    };
  }

  /**
   * @return {CustomerSupplierData[]}
   */
  getTopCustomerData() {
    return get(this.props.orgKYCDetails, "topCustomers", [this.getEmptyCustomerSupplierItem()]);
  }

  /**
   * @return {CustomerSupplierData[]}
   */
  getTopSupplierData() {
    return get(this.props.orgKYCDetails, "topSuppliers", [this.getEmptyCustomerSupplierItem()]);
  }

  /**
   * @return {String[]}
   */
  getTopOriginGoodsCountries() {
    return get(this.props.orgKYCDetails, "topOriginGoodsCountries", [""]);
  }

  filterAndUpdateTopCustomersValues() {
    const dataList = this.getTopCustomerData()
      .map(this.mapNameAndCountryCollection)
      .filter((item, index) => index === 0 || item.name || item.country);

    if (dataList.length > this.limits.customerCount) {
      dataList.length = this.limits.customerCount;
    }

    this.props.updateField({
      name: "prospect.orgKYCDetails.topCustomers",
      value: dataList
    });
  }

  filterAndUpdateTopSuppliersValues() {
    const dataList = this.getTopSupplierData()
      .map(this.mapNameAndCountryCollection)
      .filter((item, index) => index === 0 || item.name || item.country);

    if (dataList.length > this.limits.supplierCount) {
      dataList.length = this.limits.supplierCount;
    }

    this.props.updateField({
      name: "prospect.orgKYCDetails.topSuppliers",
      value: dataList
    });
  }

  handleAddCustomerClick = () => {
    const dataList = this.getTopCustomerData();
    if (dataList.length < this.limits.customerCount) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.topCustomers",
        value: [...dataList, this.getEmptyCustomerSupplierItem()]
      });
    }
  };

  handleAddSupplierClick = () => {
    const dataList = this.getTopSupplierData();
    if (dataList.length < this.limits.supplierCount) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.topSuppliers",
        value: [...dataList, this.getEmptyCustomerSupplierItem()]
      });
    }
  };

  handleAddCountryOfOriginClick = () => {
    const dataList = this.getTopOriginGoodsCountries();
    if (dataList.length < this.limits.countryOfOriginCount) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.topOriginGoodsCountries",
        value: [...dataList, ""]
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    this.filterAndUpdateTopCustomersValues();
    this.filterAndUpdateTopSuppliersValues();

    this.props.handleContinue(event);
  };

  isTopCustomerNameRequired(index) {
    return index === 0 || this.getTopCustomerData()[index].country !== "";
  }

  isTopCustomerCountyRequired(index) {
    return index === 0 || this.getTopCustomerData()[index].name !== "";
  }

  isTopSupplierNameRequired(index) {
    if (!this.state.isDontHaveSuppliers && index === 0) {
      return true;
    }
    return this.getTopSupplierData()[index].country !== "";
  }

  isTopSupplierCountryRequired(index) {
    if (!this.state.isDontHaveSuppliers && index === 0) {
      return true;
    }
    return this.getTopSupplierData()[index].name !== "";
  }

  isCountryOriginGoodsRequired(index) {
    return index === 0 && !this.state.isDontTradingGoods;
  }

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle title="Company background" className={this.props.classes.title} />

        <h4 className={this.props.classes.groupLabel}>Top customers</h4>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {this.getTopCustomerData().map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput
                    id="OkycTopc.name"
                    indexes={[index]}
                    required={this.isTopCustomerNameRequired(index)}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OkycTopc.country"
                    indexes={[index]}
                    resetValue={""}
                    required={this.isTopCustomerCountyRequired(index)}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={this.handleAddCustomerClick}
          title="Add another customer"
          disabled={this.getTopCustomerData().length >= this.limits.customerCount}
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top suppliers</h4>
        <Checkbox
          label="I don't have suppliers yet"
          value={this.state.isDontHaveSuppliers}
          onChange={event => this.setState({ isDontHaveSuppliers: event.target.checked })}
        />
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {this.getTopSupplierData().map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput
                    id="OkycTops.name"
                    indexes={[index]}
                    required={this.isTopSupplierNameRequired(index)}
                    disabled={this.state.isDontHaveSuppliers}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OkycTops.country"
                    indexes={[index]}
                    resetValue={""}
                    required={this.isTopSupplierCountryRequired(index)}
                    disabled={this.state.isDontHaveSuppliers}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={this.handleAddSupplierClick}
          title="Add another supplier"
          disabled={
            this.state.isDontHaveSuppliers ||
            this.getTopSupplierData().length >= this.limits.supplierCount
          }
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Main origin of goods</h4>
        <Checkbox
          value={this.state.isDontTradingGoods}
          onChange={event => this.setState({ isDontTradingGoods: event.target.checked })}
          label="I don't trade with goods yet"
        />
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            {this.getTopOriginGoodsCountries().map((_, index) => {
              return (
                <PureSelect
                  key={index}
                  id="Okyc.topOriginGoodsCountries"
                  indexes={[index]}
                  resetValue={""}
                  excludeValues={this.getTopOriginGoodsCountries().filter(
                    (_, valueIndex) => valueIndex !== index
                  )}
                  required={this.isCountryOriginGoodsRequired(index)}
                  disabled={this.state.isDontTradingGoods}
                />
              );
            })}
          </Grid>
        </Grid>
        <AddButton
          onClick={this.handleAddCountryOfOriginClick}
          title="Add another country of origin"
          disabled={
            this.state.isDontTradingGoods ||
            this.getTopOriginGoodsCountries().length >= this.limits.countryOfOriginCount
          }
        />

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  orgKYCDetails: getOrgKYCDetails(state)
});

const mapDispatchToProps = {
  updateField
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyBackgroundForm)
);
