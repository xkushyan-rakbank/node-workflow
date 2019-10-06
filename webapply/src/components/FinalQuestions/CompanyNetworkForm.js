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
    position: "relative",
    marginBottom: "20px"
  },
  container: {
    top: "calc(100% - 10px)",
    right: "12px"
  }
};

class CompanyNetworkForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

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
      insideSubsidiaryCount: 1,
      outsideSubsidiaryCount: 1,
      isDontHaveInsideSubsidiary: true,
      isDontHaveOutsideSubsidiary: true
    };
  }

  componentDidMount() {
    const insideSubsidiaries = this.getInsideSubsidiariesData();
    const outsideSubsidiaries = this.getOutsideSubsidiariesData();
    const isOtherEntitiesInUAE = this.getInsideSubsidiariesExists();
    const isOtherEntitiesOutsideUAE = this.getOutsideSubsidiariesExists();
    this.setState(
      {
        insideSubsidiaryCompanyNameFilled: !!insideSubsidiaries[0].companyName,
        insideSubsidiaryTradeLicenseNoFilled: !!insideSubsidiaries[0].tradeLicenseNo,
        outsideSubsidiaryCompanyNameFilled: !!outsideSubsidiaries[0].companyName,
        isDontHaveInsideSubsidiary: !isOtherEntitiesInUAE,
        isDontHaveOutsideSubsidiary: !isOtherEntitiesOutsideUAE
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
      prevState.isDontHaveInsideSubsidiary !== this.state.isDontHaveInsideSubsidiary &&
      this.state.isDontHaveInsideSubsidiary
    ) {
      this.resetInsideSubsidiaryValues();
    }
    if (
      prevState.isDontHaveOutsideSubsidiary !== this.state.isDontHaveOutsideSubsidiary &&
      this.state.isDontHaveOutsideSubsidiary
    ) {
      this.resetOutsideSubsidiaryValues();
    }
  }

  getEmptyInsideSubsidiarysItem() {
    return {
      companyName: "",
      emirate: "",
      tradeLicenseNo: ""
    };
  }

  getEmptyOutsideSubsidiarysItem() {
    return {
      companyName: "",
      country: ""
    };
  }

  getInsideSubsidiariesData() {
    return get(this.props.orgKYCDetails, "entitiesInUAE", [this.getEmptyInsideSubsidiarysItem()]);
  }

  getInsideSubsidiariesExists() {
    return get(this.props.orgKYCDetails, "otherEntitiesInUAE", false);
  }

  getOutsideSubsidiariesData() {
    return get(this.props.orgKYCDetails, "entitiesOutsideUAE", [
      this.getEmptyOutsideSubsidiarysItem()
    ]);
  }

  getOutsideSubsidiariesExists() {
    return get(this.props.orgKYCDetails, "otherEntitiesOutsideUAE", false);
  }

  resetInsideSubsidiaryValues() {
    if (this.state.insideSubsidiaryCount > 1) {
      this.setState({ insideSubsidiaryCount: 1 });
    }
    this.props.updateProspect({
      "prospect.orgKYCDetails.entitiesInUAE": [{ tradeLicenseNo: "", emirate: "", companyName: "" }]
    });
  }

  resetOutsideSubsidiaryValues() {
    if (this.state.outsideSubsidiaryCount > 1) {
      this.setState({ outsideSubsidiaryCount: 1 });
    }
    this.props.updateProspect({
      "prospect.orgKYCDetails.entitiesOutsideUAE": [{ country: "", companyName: "" }]
    });
  }

  insideSubsidiaryCompanyNameChangeHandle = value =>
    this.setState({ insideSubsidiaryCompanyNameFilled: !!value });

  insideSubsidiaryTradeLicenseNoChangeHandle = value =>
    this.setState({ insideSubsidiaryTradeLicenseNoFilled: !!value });

  outsideSubsidiaryCompanyNameChangeHandle = value =>
    this.setState({ outsideSubsidiaryCompanyNameFilled: !!value });

  handleAddInsideSubsidiarySwitch = e => {
    this.props.updateProspect({ "prospect.orgKYCDetails.otherEntitiesInUAE": e.target.checked });
    this.setState({ isDontHaveInsideSubsidiary: !e.target.checked });
  };

  handleAddInsideSubsidiaryClick = () => {
    const dataList = this.getInsideSubsidiariesData();
    if (dataList.length < this.limits.insideSubsidiaryCount) {
      this.props.updateProspect({
        "prospect.orgKYCDetails.entitiesInUAE": [...dataList, this.getEmptyInsideSubsidiarysItem()]
      });
    }
  };

  handleRemoveInsideSubsidiary = index => {
    const dataList = this.getInsideSubsidiariesData();
    dataList.splice(index, 1);
    this.props.updateProspect({ "prospect.orgKYCDetails.entitiesInUAE": [...dataList] });
  };

  handleAddOutsideSubsidiarySwitch = e => {
    this.props.updateProspect({
      "prospect.orgKYCDetails.otherEntitiesOutsideUAE": e.target.checked
    });
    this.setState({ isDontHaveOutsideSubsidiary: !e.target.checked });
  };

  handleAddOutsideSubsidiaryClick = () => {
    const dataList = this.getOutsideSubsidiariesData();
    if (dataList.length < this.limits.outsideSubsidiaryCount) {
      this.props.updateProspect({
        "prospect.orgKYCDetails.entitiesOutsideUAE": [
          ...dataList,
          this.getEmptyOutsideSubsidiarysItem()
        ]
      });
    }
  };

  handleRemoveOutsideSubsidiary = index => {
    const dataList = this.getOutsideSubsidiariesData();
    dataList.splice(index, 1);
    this.props.updateProspect({ "prospect.orgKYCDetails.entitiesOutsideUAE": [...dataList] });
  };

  isInsideSubsidiaryCompanyNameRequired(index) {
    return this.getInsideSubsidiariesData()[index].companyName === "";
  }

  isInsideSubsidiaryEmirateRequired(index) {
    return this.getInsideSubsidiariesData()[index].emirate === "";
  }

  isInsideSubsidiaryTradeLicenseRequired(index) {
    return this.getInsideSubsidiariesData()[index].tradeLicenseNo === "";
  }

  isOutsideSubsidiaryCompanyNameRequired(index) {
    return this.getOutsideSubsidiariesData()[index].companyName === "";
  }

  isOutsideSubsidiaryCountryRequired(index) {
    return this.getOutsideSubsidiariesData()[index].country === "";
  }

  isAddInsideSubsidiaryDisabled = () => {
    const { insideSubsidiaryCount } = this.limits;
    const insideSubsidiaries = this.getInsideSubsidiariesData();
    const lastInsideSubsidiary = insideSubsidiaries[insideSubsidiaries.length - 1];
    return (
      insideSubsidiaries.length >= insideSubsidiaryCount ||
      !lastInsideSubsidiary.companyName ||
      !lastInsideSubsidiary.emirate ||
      !lastInsideSubsidiary.tradeLicenseNo
    );
  };

  isAddOutsideSubsidiaryDisabled = () => {
    const { outsideSubsidiaryCount } = this.limits;
    const outsideSubsidiaries = this.getOutsideSubsidiariesData();
    const lastOutsideSubsidiary = outsideSubsidiaries[outsideSubsidiaries.length - 1];
    return (
      outsideSubsidiaries.length >= outsideSubsidiaryCount ||
      !lastOutsideSubsidiary.companyName ||
      !lastOutsideSubsidiary.country
    );
  };

  isContinueDisabled = () => {
    const {
      isDontHaveInsideSubsidiary,
      isDontHaveOutsideSubsidiary,
      insideSubsidiaryCompanyNameFilled,
      insideSubsidiaryTradeLicenseNoFilled,
      outsideSubsidiaryCompanyNameFilled
    } = this.state;
    const insideSubsidiaries = this.getInsideSubsidiariesData();
    const isInsideSubsidiariesFilled =
      isDontHaveInsideSubsidiary ||
      (insideSubsidiaryCompanyNameFilled &&
        insideSubsidiaries[0].emirate &&
        insideSubsidiaryTradeLicenseNoFilled);
    const outsideSubsidiaries = this.getOutsideSubsidiariesData();
    const isOutsideSubsidiariesFilled =
      isDontHaveOutsideSubsidiary ||
      (outsideSubsidiaryCompanyNameFilled && outsideSubsidiaries[0].country);
    return !(isInsideSubsidiariesFilled && isOutsideSubsidiariesFilled);
  };

  render() {
    const { isDontHaveInsideSubsidiary, isDontHaveOutsideSubsidiary } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Branches or subsidiaries or other companies in the UAE
        </h4>

        <Checkbox
          label="The company has branches, subsidiaries or other companies in the UAE"
          value={!isDontHaveInsideSubsidiary}
          onChange={this.handleAddInsideSubsidiarySwitch}
        />
        {!isDontHaveInsideSubsidiary && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              {this.getInsideSubsidiariesData().map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntIn.companyName"
                        indexes={[index]}
                        required={this.isInsideSubsidiaryCompanyNameRequired(index)}
                        disabled={this.state.isDontHaveInsideSubsidiary}
                        callback={this.insideSubsidiaryCompanyNameChangeHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntIn.tradeLicenseNo"
                        indexes={[index]}
                        required={this.isInsideSubsidiaryTradeLicenseRequired(index)}
                        disabled={this.state.isDontHaveInsideSubsidiary}
                        callback={this.insideSubsidiaryTradeLicenseNoChangeHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} className={cx({ [classes.relative]: index !== 0 })}>
                      <PureSelect
                        key={index}
                        id="OkycEntIn.emirate"
                        indexes={[index]}
                        required={this.isInsideSubsidiaryEmirateRequired(index)}
                        disabled={this.state.isDontHaveInsideSubsidiary}
                      />
                      {index !== 0 && (
                        <RemoveButton
                          onClick={() => this.handleRemoveInsideSubsidiary(index)}
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
              onClick={this.handleAddInsideSubsidiaryClick}
              title="Add a subsidiary inside the UAE"
              disabled={this.isAddInsideSubsidiaryDisabled()}
            />
          </>
        )}

        <div className={this.props.classes.divider} />

        <h4 className={this.props.classes.groupLabel}>
          Branches or subsidiaries or other companies outside the UAE
        </h4>
        <Checkbox
          label="The company has branches, subsidiaries or other companies outside the UAE"
          value={!isDontHaveOutsideSubsidiary}
          onChange={this.handleAddOutsideSubsidiarySwitch}
        />
        {!isDontHaveOutsideSubsidiary && (
          <>
            <Grid container spacing={3} className={this.props.classes.flexContainer}>
              {this.getOutsideSubsidiariesData().map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item md={6} sm={12}>
                      <TextInput
                        key={index}
                        id="OkycEntOut.companyName"
                        indexes={[index]}
                        required={this.isOutsideSubsidiaryCompanyNameRequired(index)}
                        disabled={this.state.isDontHaveOutsideSubsidiary}
                        callback={this.outsideSubsidiaryCompanyNameChangeHandle}
                      />
                    </Grid>
                    <Grid item md={6} sm={12} className={cx({ [classes.relative]: index !== 0 })}>
                      <PureSelect
                        key={index}
                        id="OkycEntOut.country"
                        indexes={[index]}
                        required={this.isOutsideSubsidiaryCountryRequired(index)}
                        disabled={this.state.isDontHaveOutsideSubsidiary}
                      />
                      {index !== 0 && (
                        <RemoveButton
                          onClick={() => this.handleRemoveOutsideSubsidiary(index)}
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
              onClick={this.handleAddOutsideSubsidiaryClick}
              title="Add another subsidiary"
              disabled={this.isAddOutsideSubsidiaryDisabled()}
            />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  orgKYCDetails: getOrgKYCDetails(state)
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
