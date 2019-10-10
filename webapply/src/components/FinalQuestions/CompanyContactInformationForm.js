import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import AddButton from "../Buttons/AddButton";
import RemoveButton from "../Buttons/RemoveButton";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";
import { connect } from "react-redux";
import { getInputValueById } from "../../store/selectors/input";

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
    right: "-110px",
    "@media only screen and (max-width: 959px)": {
      top: "63px",
      right: "12px"
    }
  },
  infoTitle: {
    color: "#86868b"
  },
  infoTitleWrap: {
    position: "relative",
    top: "65px"
  }
};

class CompanyContactInformationForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      secondaryPhoneNumber: false
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

  isContinueDisabled = () => {
    return !(this.state.secondaryPhoneNumber ? this.props.primaryPhoneNo : this.props.primaryEmail);
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          <Grid item md={6} sm={12}>
            <TextInput
              id="OrgCont.primaryMobileNo"
              select={<PureSelect id="OrgCont.primaryMobCountryCode" combinedSelect />}
            />
            {this.state.secondaryPhoneNumber && (
              <div className={classes.relative}>
                <TextInput
                  id="OrgCont.primaryPhoneNo"
                  select={<PureSelect id="OrgCont.primaryPhoneCountryCode" combinedSelect />}
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
            <TextInput id="OrgCont.primaryEmail" />
          </Grid>
        </Grid>
        {!this.state.secondaryPhoneNumber && (
          <AddButton onClick={this.handleSecondaryPhoneBtnSwitch} title="Add a landline number" />
        )}
        <div className={this.props.classes.infoTitleWrap}>
          <InfoTitle
            classes={{ wrapper: this.props.classes.infoTitle }}
            title="Heads up! We can only send chequebooks if you use a phone number from the UAE."
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  primaryPhoneNo: getInputValueById(state, "OrgCont.primaryPhoneNo"),
  primaryEmail: getInputValueById(state, "OrgCont.primaryEmail")
});

export default withStyles(styles)(connect(mapStateToProps)(CompanyContactInformationForm));
