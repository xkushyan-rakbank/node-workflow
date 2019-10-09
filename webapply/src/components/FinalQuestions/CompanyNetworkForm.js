import React, { Component } from "react";
import { connect } from "react-redux";
import get from "lodash/get";
import cx from "classnames";
import Checkbox from "../InputField/Checkbox";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import RemoveButton from "../Buttons/RemoveButton";
import PureSelect from "../InputField/PureSelect";
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
    position: "relative",
    marginBottom: "20px"
  },
  container: {
    top: "calc(100% - 10px)",
    right: "12px"
  }
};

class CompanyNetworkForm extends Component {
  constructor(props) {
    super(props);

    this.limits = {
      insideSubsidiaryCount: 5,
      outsideSubsidiaryCount: 5
    };
    this.state = {
      insideSubsidiaryCompanyNameFilled: false,
      insideSubsidiaryTradeLicenseNoFilled: false,
      outsideSubsidiaryCompanyNameFilled: false,
      otherEntitiesOutsideUAE: true,
      otherEntitiesInUAE: true
    };
  }

  componentDidMount() {
    this.setState(
      {
        insideSubsidiaryCompanyNameFilled: !!this.props.entitiesInUAE[0].companyName,
        insideSubsidiaryTradeLicenseNoFilled: !!this.props.entitiesInUAE[0].tradeLicenseNo,
        outsideSubsidiaryCompanyNameFilled: !!this.props.entitiesOutsideUAE[0].companyName,
        otherEntitiesOutsideUAE: !this.props.otherEntitiesOutsideUAE,
        otherEntitiesInUAE: !this.props.otherEntitiesInUAE
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
      prevState.otherEntitiesInUAE !== this.state.otherEntitiesInUAE &&
      this.state.otherEntitiesInUAE
    ) {
      this.resetInsideSubsidiaryValues();
    }
    if (
      prevState.otherEntitiesOutsideUAE !== this.state.otherEntitiesOutsideUAE &&
      this.state.otherEntitiesOutsideUAE
    ) {
      this.resetOutsideSubsidiaryValues();
    }
  }

  resetInsideSubsidiaryValues() {
    this.props.updateProspect({
      "prospect.orgKYCDetails.entitiesInUAE": [{ tradeLicenseNo: "", emirate: "", companyName: "" }]
    });
  }

  resetOutsideSubsidiaryValues() {
    this.props.updateProspect({
      "prospect.orgKYCDetails.entitiesOutsideUAE": [{ country: "", companyName: "" }]
    });
  }

  callbackHandle = (value, name) => this.setState({ [name]: !!value });

  handleSwitchCheckbox = (e, prospect) => {
    const path = `prospect.orgKYCDetails.${prospect}`;
    this.props.updateProspect({ [path]: e.target.checked });
    this.setState({ [prospect]: !e.target.checked });
  };

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

  isAddButtonDisabled = (limit, items, ...fields) => {
    const lastAddedItem = items[items.length - 1];
    const allFieldsFilled = fields.length
      ? fields.every(item => lastAddedItem[item] !== "")
      : lastAddedItem;
    return items.length >= limit || !allFieldsFilled;
  };

  isContinueDisabled = () => {
    const {
      otherEntitiesOutsideUAE,
      otherEntitiesInUAE,
      insideSubsidiaryCompanyNameFilled,
      insideSubsidiaryTradeLicenseNoFilled,
      outsideSubsidiaryCompanyNameFilled
    } = this.state;
    const isInsideSubsidiariesFilled =
      otherEntitiesInUAE ||
      (insideSubsidiaryCompanyNameFilled &&
        this.props.entitiesInUAE[0].emirate &&
        insideSubsidiaryTradeLicenseNoFilled);
    const isOutsideSubsidiariesFilled =
      otherEntitiesOutsideUAE ||
      (outsideSubsidiaryCompanyNameFilled && this.props.entitiesOutsideUAE[0].country);
    return !(isInsideSubsidiariesFilled && isOutsideSubsidiariesFilled);
  };

  render() {
    const { otherEntitiesOutsideUAE, otherEntitiesInUAE } = this.state;
    const { classes, entitiesInUAE, entitiesOutsideUAE } = this.props;
    return (
      <>
        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Branches or subsidiaries or other companies in the UAE
        </h4>

        <Checkbox
          label="The company has branches, subsidiaries or other companies in the UAE"
          value={!otherEntitiesInUAE}
          onChange={e => this.handleSwitchCheckbox(e, "otherEntitiesInUAE")}
        />
        {!otherEntitiesInUAE && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              {entitiesInUAE.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntIn.companyName"
                        storeFlag="insideSubsidiaryCompanyNameFilled"
                        indexes={[index]}
                        disabled={otherEntitiesInUAE}
                        callback={this.callbackHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntIn.tradeLicenseNo"
                        storeFlag="insideSubsidiaryTradeLicenseNoFilled"
                        indexes={[index]}
                        disabled={otherEntitiesInUAE}
                        callback={this.callbackHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} className={cx({ [classes.relative]: index !== 0 })}>
                      <PureSelect
                        key={index}
                        id="OkycEntIn.emirate"
                        indexes={[index]}
                        disabled={otherEntitiesInUAE}
                      />
                      {index !== 0 && (
                        <RemoveButton
                          onClick={() =>
                            this.handleRemoveItem(entitiesInUAE, index, "entitiesInUAE")
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
            <AddButton
              onClick={() =>
                this.handleAddItem(
                  entitiesInUAE,
                  "entitiesInUAE",
                  this.limits.insideSubsidiaryCount,
                  {
                    tradeLicenseNo: "",
                    emirate: "",
                    companyName: ""
                  }
                )
              }
              title="Add a subsidiary inside the UAE"
              disabled={this.isAddButtonDisabled(
                this.limits.insideSubsidiaryCount,
                entitiesInUAE,
                "tradeLicenseNo",
                "emirate",
                "companyName"
              )}
            />
          </>
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Branches or subsidiaries or other companies outside the UAE
        </h4>
        <Checkbox
          label="The company has branches, subsidiaries or other companies outside the UAE"
          value={!otherEntitiesOutsideUAE}
          onChange={e => this.handleSwitchCheckbox(e, "otherEntitiesOutsideUAE")}
        />
        {!otherEntitiesOutsideUAE && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              {entitiesOutsideUAE.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item md={6} sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntOut.companyName"
                        storeFlag="outsideSubsidiaryCompanyNameFilled"
                        indexes={[index]}
                        disabled={otherEntitiesOutsideUAE}
                        callback={this.callbackHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} className={cx({ [classes.relative]: index !== 0 })}>
                      <PureSelect
                        key={index}
                        id="OkycEntOut.country"
                        indexes={[index]}
                        disabled={otherEntitiesOutsideUAE}
                      />
                      {index !== 0 && (
                        <RemoveButton
                          onClick={() =>
                            this.handleRemoveItem(entitiesOutsideUAE, index, "entitiesOutsideUAE")
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
            <AddButton
              onClick={() =>
                this.handleAddItem(
                  entitiesOutsideUAE,
                  "entitiesOutsideUAE",
                  this.limits.outsideSubsidiaryCount,
                  {
                    country: "",
                    companyName: ""
                  }
                )
              }
              title="Add another subsidiary"
              disabled={this.isAddButtonDisabled(
                this.limits.outsideSubsidiaryCount,
                entitiesOutsideUAE,
                "country",
                "companyName"
              )}
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  entitiesInUAE: get(getOrgKYCDetails(state), "entitiesInUAE", [
    { companyName: "", emirate: "", tradeLicenseNo: "" }
  ]),
  otherEntitiesInUAE: get(getOrgKYCDetails(state), "otherEntitiesInUAE", false),
  entitiesOutsideUAE: get(getOrgKYCDetails(state), "entitiesOutsideUAE", [
    { companyName: "", country: "" }
  ]),
  otherEntitiesOutsideUAE: get(getOrgKYCDetails(state), "otherEntitiesOutsideUAE", false)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyNetworkForm)
);
