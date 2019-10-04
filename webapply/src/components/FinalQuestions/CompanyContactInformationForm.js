import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import RemoveButton from "../Buttons/RemoveButton";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";
import { connect } from "react-redux";
import { getOrganizationInfo } from "../../store/selectors/appConfig";
import { updateProspect } from "../../store/actions/appConfig";
import get from "lodash/get";

const styles = {
  title: {
    fontSize: "16px"
  },
  flexContainer: {
    marginTop: "0",
    marginBottom: "0"
  },
  controlsWrapper: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0 0"
  },
  relative: {
    position: "relative"
  },
  container: {
    top: "18px",
    right: "-110px"
  }
};

class CompanyContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      secondaryPhoneNumber: false,
      isPrimaryMobileFilled: false,
      isPrimaryPhoneFilled: false,
      isPrimaryEmailFilled: false
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

  handleSecondaryPhoneBtnSwitch = () => {
    this.setState({ secondaryPhoneNumber: !this.state.secondaryPhoneNumber });
  };

  getPrimaryMobileData() {
    return get(this.props.organizationInfo, "contactDetails.primaryMobileNo", "");
  }

  getPrimaryMobCountryCodeData() {
    return get(this.props.organizationInfo, "contactDetails.primaryMobCountryCode", "");
  }

  getPrimaryPhoneData() {
    return get(this.props.organizationInfo, "contactDetails.primaryPhoneNo", "");
  }

  getPrimaryPhoneCountryCodeData() {
    return get(this.props.organizationInfo, "contactDetails.primaryPhoneCountryCode", "");
  }

  getPrimaryEmailData() {
    return get(this.props.organizationInfo, "contactDetails.primaryEmail", "");
  }

  primaryMobileChangeHandle = value => this.setState({ isPrimaryMobileFilled: !!value });

  primaryPhoneChangeHandle = value => this.setState({ isPrimaryPhoneFilled: !!value });

  primaryEmailChangeHandle = value => this.setState({ isPrimaryEmailFilled: !!value });

  isContinueDisabled = () => {
    const primaryMobile = this.getPrimaryMobileData();
    const primaryMobCountryCode = this.getPrimaryMobCountryCodeData();
    const primaryPhone = this.getPrimaryPhoneData();
    const primaryPhoneCountryCode = this.getPrimaryPhoneCountryCodeData();
    const primaryEmail = this.getPrimaryEmailData();
    return !(
      (this.state.isPrimaryMobileFilled &&
        (this.state.isPrimaryPhoneFilled || !this.state.secondaryPhoneNumber) &&
        this.state.isPrimaryEmailFilled) ||
      !!(
        primaryMobile &&
        primaryMobCountryCode &&
        primaryPhone &&
        primaryPhoneCountryCode &&
        primaryEmail
      )
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container>
          <InfoTitle title="Heads up! We can only send chequebooks if you use a phone number from the UAE." />
        </Grid>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <TextInput
              id="OrgCont.primaryMobileNo"
              select={
                <PureSelect id="OrgCont.primaryMobCountryCode" defaultValue="USA" combinedSelect />
              }
              callback={this.primaryMobileChangeHandle}
            />
            {this.state.secondaryPhoneNumber && (
              <div className={classes.relative}>
                <TextInput
                  id="OrgCont.primaryPhoneNo"
                  select={
                    <PureSelect
                      id="OrgCont.primaryPhoneCountryCode"
                      defaultValue="USA"
                      combinedSelect
                    />
                  }
                  callback={this.primaryPhoneChangeHandle}
                />
                <RemoveButton
                  onClick={this.handleSecondaryPhoneBtnSwitch}
                  title="Remove"
                  classes={{ container: classes.container }}
                />
              </div>
            )}
          </Grid>
          <Grid item md={6} sm={12}>
            <TextInput id="OrgCont.primaryEmail" callback={this.primaryEmailChangeHandle} />
          </Grid>
        </Grid>

        {!this.state.secondaryPhoneNumber && (
          <AddButton onClick={this.handleSecondaryPhoneBtnSwitch} title="Add a landline number" />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  organizationInfo: getOrganizationInfo(state)
});

const mapDispatchToProps = {
  updateProspect
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CompanyContactInformationForm)
);
