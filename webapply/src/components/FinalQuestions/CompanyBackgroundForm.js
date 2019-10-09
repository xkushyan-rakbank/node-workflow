import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import cx from "classnames";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import AddButton from "../Buttons/AddButton";
import RemoveButton from "../Buttons/RemoveButton";
import { updateProspect } from "../../store/actions/appConfig";
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
  },
  relative: {
    position: "relative"
  },
  tablet: {
    "@media only screen and (max-width: 959px)": {
      marginBottom: "20px"
    }
  },
  container: {
    top: "18px",
    right: "-100px",
    "@media only screen and (max-width: 959px)": {
      top: "70px",
      right: "12px"
    }
  },
  marginBottom: {
    "@media only screen and (max-width: 959px)": {
      marginBottom: "45px"
    }
  }
};

class CompanyBackgroundForm extends Component {
  constructor(props) {
    super(props);

    this.limits = {
      customerCount: 5,
      supplierCount: 5,
      countryOfOriginCount: 5,
      anotherBankCount: 5
    };
    this.state = {
      isCustomerNameFilled: false,
      isSupplierNameFilled: false,
      isBankNameFilled: false,
      isDontTradeGoodsYet: false,
      isDontHaveSuppliersYet: false,
      otherBankingRelationshipsExist: true
    };
  }

  componentDidMount() {
    const {
      otherBankingRelationshipsExist,
      isDontTradeGoodsYet,
      isDontHaveSuppliersYet,
      topCustomers,
      topSuppliers,
      otherBankDetails
    } = this.props;
    this.setState(
      {
        otherBankingRelationshipsExist,
        isDontTradeGoodsYet,
        isDontHaveSuppliersYet,
        isCustomerNameFilled: !!topCustomers[0].name,
        isSupplierNameFilled: !!topSuppliers[0].name,
        isBankNameFilled: !!otherBankDetails[0].bankName
      },
      () => {
        const isButtonDisabled = this.isContinueDisabled();
        this.props.setIsContinueDisabled(isButtonDisabled);
      }
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
    if (
      prevState.otherBankingRelationshipsExist !== this.state.otherBankingRelationshipsExist &&
      this.state.otherBankingRelationshipsExist
    ) {
      this.resetBankAccountValues();
    }
    if (
      prevState.isDontTradeGoodsYet !== this.state.isDontTradeGoodsYet &&
      this.state.isDontTradeGoodsYet
    ) {
      this.props.updateProspect({
        "prospect.orgKYCDetails.topOriginGoodsCountries": [""]
      });
    }
    if (
      prevState.isDontHaveSuppliersYet !== this.state.isDontHaveSuppliersYet &&
      this.state.isDontHaveSuppliersYet
    ) {
      this.props.updateProspect({
        "prospect.orgKYCDetails.topSuppliers": [{ name: "", country: "" }]
      });
    }
  }

  resetBankAccountValues() {
    this.props.updateProspect({
      "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": [{ bankName: "" }],
      "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankingRelationshipsExist": false
    });
  }

  callbackHandle = (value, name) => this.setState({ [name]: !!value });

  handleAddItem = (items, prospect, limit, item) => {
    if (items.length < limit) {
      const path = `prospect.orgKYCDetails.${prospect}`;
      this.props.updateProspect({
        [path]: [...items, item]
      });
    }
  };

  handleRemoveItem = (items, index, prospect) => {
    const dataList = [...items];
    dataList.splice(index, 1);
    const path = `prospect.orgKYCDetails.${prospect}`;
    this.props.updateProspect({
      [path]: [...dataList]
    });
  };

  handleSwitchCheckbox = (e, prospect) => {
    const path = `prospect.orgKYCDetails.${prospect}`;
    this.props.updateProspect({ [path]: e.target.checked });
    this.setState({ [prospect]: e.target.checked });
  };

  isAddButtonDisabled = (limit, items, ...fields) => {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  };

  isContinueDisabled = () => {
    const {
      otherBankingRelationshipsExist,
      isDontTradeGoodsYet,
      isDontHaveSuppliersYet,
      isCustomerNameFilled,
      isSupplierNameFilled,
      isBankNameFilled
    } = this.state;
    const isTopCustomersFilled = isCustomerNameFilled && this.props.topCustomers[0].country;
    const isTopSuppliersFilled =
      isDontHaveSuppliersYet || (isSupplierNameFilled && this.props.topSuppliers[0].country);
    const isOriginGoodsFilled = isDontTradeGoodsYet || this.props.topOriginGoodsCountries[0];
    const isAnotherBanksFilled = !otherBankingRelationshipsExist || isBankNameFilled;
    return !(
      isTopCustomersFilled &&
      isTopSuppliersFilled &&
      isOriginGoodsFilled &&
      isAnotherBanksFilled
    );
  };

  render() {
    const {
      isDontHaveSuppliersYet,
      isDontTradeGoodsYet,
      otherBankingRelationshipsExist
    } = this.state;
    const {
      classes,
      topCustomers,
      topSuppliers,
      topOriginGoodsCountries,
      otherBankDetails
    } = this.props;
    return (
      <>
        <h4 className={this.props.classes.groupLabel}>Top customers</h4>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {topCustomers.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={index === 0 ? 6 : 5} sm={12}>
                  <TextInput
                    id="OkycTopc.name"
                    storeFlag="isCustomerNameFilled"
                    indexes={[index]}
                    callback={this.callbackHandle}
                  />
                </Grid>
                <Grid
                  item
                  md={index === 0 ? 6 : 5}
                  sm={12}
                  className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                >
                  <PureSelect id="OkycTopc.country" indexes={[index]} resetValue={""} />
                  {index !== 0 && (
                    <RemoveButton
                      onClick={() => this.handleRemoveItem(topCustomers, index, "topCustomers")}
                      title="Remove"
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={() =>
            this.handleAddItem(topCustomers, "topCustomers", this.limits.customerCount, {
              name: "",
              country: ""
            })
          }
          title="Add another customer"
          disabled={this.isAddButtonDisabled(
            this.limits.customerCount,
            topCustomers,
            "name",
            "country"
          )}
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top suppliers</h4>
        <Checkbox
          label="I don't have suppliers yet"
          value={isDontHaveSuppliersYet}
          onChange={e => this.handleSwitchCheckbox(e, "isDontHaveSuppliersYet")}
        />
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {topSuppliers.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={index === 0 ? 6 : 5} sm={12}>
                  <TextInput
                    id="OkycTops.name"
                    indexes={[index]}
                    storeFlag="isSupplierNameFilled"
                    disabled={isDontHaveSuppliersYet}
                    required={!isDontHaveSuppliersYet}
                    callback={this.callbackHandle}
                  />
                </Grid>
                <Grid
                  item
                  md={index === 0 ? 6 : 5}
                  sm={12}
                  className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
                >
                  <PureSelect
                    id="OkycTops.country"
                    indexes={[index]}
                    resetValue={""}
                    required={!isDontHaveSuppliersYet}
                    disabled={isDontHaveSuppliersYet}
                  />
                  {index !== 0 && (
                    <RemoveButton
                      onClick={() => this.handleRemoveItem(topSuppliers, index, "topSuppliers")}
                      title="Remove"
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <AddButton
          onClick={() =>
            this.handleAddItem(topSuppliers, "topSuppliers", this.limits.supplierCount, {
              name: "",
              country: ""
            })
          }
          title="Add another supplier"
          disabled={
            isDontHaveSuppliersYet ||
            this.isAddButtonDisabled(this.limits.supplierCount, topSuppliers, "name", "country")
          }
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top origin of goods</h4>
        <Checkbox
          value={isDontTradeGoodsYet}
          onChange={e => this.handleSwitchCheckbox(e, "isDontTradeGoodsYet")}
          label="I don't trade with goods yet"
        />
        <Grid container direction="column" spacing={3} className={this.props.classes.flexContainer}>
          {topOriginGoodsCountries.map((_, index) => {
            return (
              <Grid
                key={index}
                item
                md={6}
                sm={12}
                className={cx(classes.relative, { [classes.tablet]: index !== 0 })}
              >
                <PureSelect
                  key={index}
                  id="Okyc.topOriginGoodsCountries"
                  indexes={[index]}
                  resetValue={""}
                  excludeValues={topOriginGoodsCountries.filter(
                    (_, valueIndex) => valueIndex !== index
                  )}
                  required={!isDontTradeGoodsYet}
                  disabled={isDontTradeGoodsYet}
                />
                {index !== 0 && (
                  <RemoveButton
                    onClick={() =>
                      this.handleRemoveItem(
                        topOriginGoodsCountries,
                        index,
                        "topOriginGoodsCountries"
                      )
                    }
                    title="Remove"
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
        <AddButton
          onClick={() =>
            this.handleAddItem(
              topOriginGoodsCountries,
              "topOriginGoodsCountries",
              this.limits.countryOfOriginCount,
              ""
            )
          }
          title="Add another country of origin"
          disabled={
            isDontTradeGoodsYet ||
            this.isAddButtonDisabled(this.limits.countryOfOriginCount, topOriginGoodsCountries)
          }
        />

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Relationships with other banks</h4>
        <Checkbox
          label="The company has accounts with other banks, inside or outside the UAE"
          value={otherBankingRelationshipsExist}
          onChange={e => this.handleSwitchCheckbox(e, "otherBankingRelationshipsExist")}
        />
        {otherBankingRelationshipsExist && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              <Grid item sm={12}>
                {otherBankDetails.map((_, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Grid
                        item
                        sm={12}
                        md={index === 0 ? 12 : 10}
                        className={cx(classes.relative, { [classes.marginBottom]: index !== 0 })}
                      >
                        <TextInput
                          id="OkycObriObd.bankName"
                          indexes={[index]}
                          storeFlag="isBankNameFilled"
                          required={otherBankingRelationshipsExist}
                          disabled={!otherBankingRelationshipsExist}
                          callback={this.callbackHandle}
                        />
                        {index !== 0 && (
                          <RemoveButton
                            onClick={() =>
                              this.handleRemoveItem(
                                otherBankDetails,
                                index,
                                "otherBankingRelationshipsInfo.otherBankDetails"
                              )
                            }
                            title="Remove"
                            classes={{ container: classes.container }}
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>
            <AddButton
              onClick={() =>
                this.handleAddItem(
                  otherBankDetails,
                  "otherBankingRelationshipsInfo.otherBankDetails",
                  this.limits.anotherBankCount,
                  { bankName: "" }
                )
              }
              title="Add another bank"
              disabled={
                !otherBankingRelationshipsExist ||
                this.isAddButtonDisabled(this.limits.anotherBankCount, otherBankDetails, "bankName")
              }
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  topCustomers: get(getOrgKYCDetails(state), "topCustomers", [{ name: "", country: "" }]),
  topSuppliers: get(getOrgKYCDetails(state), "topSuppliers", [{ name: "", country: "" }]),
  topOriginGoodsCountries: get(getOrgKYCDetails(state), "topOriginGoodsCountries", [""]),
  otherBankingRelationshipsExist: get(
    getOrgKYCDetails(state),
    "otherBankingRelationshipsInfo.otherBankingRelationshipsExist",
    false
  ),
  isDontHaveSuppliersYet: get(getOrgKYCDetails(state), "isDontHaveSuppliersYet", false),
  isDontTradeGoodsYet: get(getOrgKYCDetails(state), "isDontTradeGoodsYet", false),
  otherBankDetails: get(getOrgKYCDetails(state), "otherBankingRelationshipsInfo.otherBankDetails", [
    { bankName: "" }
  ])
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyBackgroundForm)
);
