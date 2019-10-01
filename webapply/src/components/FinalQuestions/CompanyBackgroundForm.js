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
    justifyContent: "flex-end",
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
      countryOfOriginCount: 5,
      anotherBankCount: 5
    };
    this.state = {
      isDontTradingGoods: false,
      isDontHaveSuppliers: false,
      isDontHaveOtherBankAccounts: true
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevState.isDontHaveOtherBankAccounts !== this.state.isDontHaveOtherBankAccounts &&
      this.state.isDontHaveOtherBankAccounts
    ) {
      this.resetBankAccountValues();
    }
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

  getEmptyOtherBankingItem() {
    return {
      bankName: ""
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

  getOtherBankingRelationshipsInfo() {
    return get(
      this.props.orgKYCDetails,
      "otherBankingRelationshipsInfo.otherBankDetails",
      this.getEmptyOtherBankingItem()
    );
  }

  resetBankAccountValues() {
    this.setState({ anotherBankCount: 1 });
    this.props.updateField({
      name: "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails",
      value: [{ bankName: "" }]
    });
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

  handleAddAnotherBank = () => {
    const dataList = this.getOtherBankingRelationshipsInfo();
    if (dataList.length < this.limits.anotherBankCount) {
      this.props.updateField({
        name: "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails",
        value: [...dataList, this.getEmptyOtherBankingItem()]
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

  isAddTopCustomerDisabled = () => {
    const { customerCount } = this.limits;
    const customers = this.getTopCustomerData();
    const lastAddedCustomer = customers[customers.length - 1];
    return (
      customers.length >= customerCount || !lastAddedCustomer.name || !lastAddedCustomer.country
    );
  };

  isAddTopSupplierDisabled = () => {
    const { isDontHaveSuppliers } = this.state;
    const { supplierCount } = this.limits;
    const suppliers = this.getTopSupplierData();
    const lastAddedSupplier = suppliers[suppliers.length - 1];
    return isDontHaveSuppliers || suppliers.length >= supplierCount || !lastAddedSupplier.country;
  };

  isAddTopOriginGoodsDisabled = () => {
    const { isDontTradingGoods } = this.state;
    const { countryOfOriginCount } = this.limits;
    const goods = this.getTopOriginGoodsCountries();
    const lastAddedGood = goods[goods.length - 1];
    return isDontTradingGoods || goods.length >= countryOfOriginCount || !lastAddedGood;
  };

  isAddAnotherBankDisabled = () => {
    const { anotherBankCount } = this.limits;
    const banks = this.getOtherBankingRelationshipsInfo();
    const lastAddedBank = banks[banks.length - 1];
    return banks.length >= anotherBankCount || !lastAddedBank.bankName;
  };

  render() {
    const { isDontHaveSuppliers, isDontTradingGoods, isDontHaveOtherBankAccounts } = this.state;
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle title="Business relationships" className={this.props.classes.title} />

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
          disabled={this.isAddTopCustomerDisabled()}
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top suppliers</h4>
        <Checkbox
          label="I don't have suppliers yet"
          value={isDontHaveSuppliers}
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
                    disabled={isDontHaveSuppliers}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OkycTops.country"
                    indexes={[index]}
                    resetValue={""}
                    required={this.isTopSupplierCountryRequired(index)}
                    disabled={isDontHaveSuppliers}
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={this.handleAddSupplierClick}
          title="Add another supplier"
          disabled={this.isAddTopSupplierDisabled()}
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top origin of goods</h4>
        <Checkbox
          value={isDontTradingGoods}
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
                  disabled={isDontTradingGoods}
                />
              );
            })}
          </Grid>
        </Grid>
        <AddButton
          onClick={this.handleAddCountryOfOriginClick}
          title="Add another country of origin"
          disabled={this.isAddTopOriginGoodsDisabled()}
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Relationships with other banks</h4>
        <Checkbox
          label="The company has accounts with other banks, inside or outside the UAE"
          value={!isDontHaveOtherBankAccounts}
          onChange={event => this.setState({ isDontHaveOtherBankAccounts: !event.target.checked })}
        />
        {!isDontHaveOtherBankAccounts && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              <Grid item sm={12}>
                {this.getOtherBankingRelationshipsInfo().map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid item sm={12}>
                        <TextInput
                          id="OkycObriObd.bankName"
                          indexes={[index]}
                          required={index === 0 && !isDontHaveOtherBankAccounts}
                          disabled={isDontHaveOtherBankAccounts}
                        />
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>
            <AddButton
              onClick={this.handleAddAnotherBank}
              title="Add another bank"
              disabled={this.isAddAnotherBankDisabled()}
            />
          </>
        )}

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
