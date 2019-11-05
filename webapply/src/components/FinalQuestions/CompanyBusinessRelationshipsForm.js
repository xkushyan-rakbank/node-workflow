import React, { Component } from "react";
import { connect } from "react-redux";
import { get, last } from "lodash";
import cx from "classnames";
import CustomCheckbox from "../InputField/RefactoredCheckbox";
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
    fontWeight: "400",
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
    top: "15px",
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

class CompanyBusinessRelationshipsForm extends Component {
  constructor(props) {
    super(props);

    this.limits = {
      customerCount: 5,
      supplierCount: 5,
      countryOfOriginCount: 5,
      anotherBankCount: 5
    };
  }

  componentDidMount() {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

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

  checkboxCallback = (value, id) => {
    if (value) {
      if (id === "Okyc.isDontHaveSuppliersYet_") {
        this.props.updateProspect({
          "prospect.orgKYCDetails.topSuppliers": [{ name: "", country: "" }]
        });
      } else if (id === "Okyc.isDontTradeGoodsYet_") {
        this.props.updateProspect({
          "prospect.orgKYCDetails.topOriginGoodsCountries": [""]
        });
      } else if (id === "OkycObri.otherBankingRelationshipsExist_") {
        this.props.updateProspect({
          "prospect.orgKYCDetails.otherBankingRelationshipsInfo.otherBankDetails": [
            { bankName: "" }
          ]
        });
      }
    }
  };

  isAddButtonDisabled = (limit, items, ...fields) => {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  };

  getLastMandatoryFieldValue = () => {
    const {
      otherBankingRelationshipsExist,
      otherBankDetails,
      isDontTradeGoodsYet,
      topOriginGoodsCountries,
      isDontHaveSuppliersYet,
      topSuppliers,
      topCustomers
    } = this.props;
    if (otherBankingRelationshipsExist) {
      return last(otherBankDetails).bankName;
    } else if (!isDontTradeGoodsYet) {
      return last(topOriginGoodsCountries);
    } else if (!isDontHaveSuppliersYet) {
      return last(topSuppliers).country;
    }
    return last(topCustomers).country;
  };

  isContinueDisabled = () => {
    const lastMandatoryFieldValue = this.getLastMandatoryFieldValue();
    return !lastMandatoryFieldValue;
  };

  render() {
    const { customerCount, supplierCount, countryOfOriginCount, anotherBankCount } = this.limits;
    const {
      classes,
      topCustomers,
      topSuppliers,
      topOriginGoodsCountries,
      otherBankDetails,
      isDontTradeGoodsYet,
      isDontHaveSuppliersYet,
      otherBankingRelationshipsExist,
      index
    } = this.props;
    return (
      <>
        <h4 className={this.props.classes.groupLabel}>Top customers</h4>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {topCustomers.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={index === 0 ? 6 : 5} sm={12}>
                  <TextInput id="OkycTopc.name" indexes={[index]} />
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
                      title="Delete"
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        {topCustomers.length < customerCount && (
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
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top suppliers</h4>
        <CustomCheckbox
          id="Okyc.isDontHaveSuppliersYet"
          indexes={[index]}
          callback={this.checkboxCallback}
        />
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {topSuppliers.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Grid item md={index === 0 ? 6 : 5} sm={12}>
                  <TextInput
                    id="OkycTops.name"
                    indexes={[index]}
                    disabled={isDontHaveSuppliersYet}
                    required={!isDontHaveSuppliersYet}
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
                      title="Delete"
                    />
                  )}
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        {topSuppliers.length < supplierCount && (
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
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Top origin of goods</h4>
        <CustomCheckbox
          id="Okyc.isDontTradeGoodsYet"
          indexes={[index]}
          callback={this.checkboxCallback}
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
                    title="Delete"
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
        {topOriginGoodsCountries.length < countryOfOriginCount && (
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
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>Relationships with other banks</h4>
        <CustomCheckbox
          id="OkycObri.otherBankingRelationshipsExist"
          indexes={[index]}
          callback={this.checkboxCallback}
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
                          required={otherBankingRelationshipsExist}
                          disabled={!otherBankingRelationshipsExist}
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
                            title="Delete"
                            classes={{ container: classes.container }}
                          />
                        )}
                      </Grid>
                    </React.Fragment>
                  );
                })}
              </Grid>
            </Grid>
            {otherBankDetails.length < anotherBankCount && (
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
                  this.isAddButtonDisabled(
                    this.limits.anotherBankCount,
                    otherBankDetails,
                    "bankName"
                  )
                }
              />
            )}
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
  )(CompanyBusinessRelationshipsForm)
);
