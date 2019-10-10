import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";
import { connect } from "react-redux";
import { getInputValueById } from "../../store/selectors/input";
import { isEqual } from "lodash";

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
  infoTitle: {
    color: "#86868b"
  },
  infoTitleWrap: {
    position: "relative",
    top: "65px"
  }
};

class CompanyPreferredMailingAddressForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressCount: 1
    };
  }

  componentDidMount() {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  // temporary solution
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const isButtonDisabled = this.isContinueDisabled();
    this.props.setIsContinueDisabled(isButtonDisabled);
  }

  isContinueDisabled = () => {
    return !this.props.emirateCity;
  };

  render() {
    return (
      <>
        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {Array.from(Array(this.state.addressCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput id="OrgAddrAdrd.addressFieldDesc" indexes={[index, 0]} />
                  <TextInput id="OrgAddrAdrd.addressLine1" indexes={[index, 0]} />
                  <PureSelect id="OrgAddrAdrd.emirateCity" indexes={[index, 0]} />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect id="OrgAddrAdrdSpace.spaceType" indexes={[index, 0]} />
                  {this.props.spaceType === "O" && (
                    <TextInput id="OrgAddrAdrdSpace.others" indexes={[index, 0]} />
                  )}
                  <TextInput id="OrgAddrAdrd.poBox" indexes={[index, 0]} />
                  <TextInput
                    id="OrgAddrAdrd.country"
                    indexes={[index, 0]}
                    disabled
                    defaultValue="United Arab Emirates"
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
        <div className={this.props.classes.infoTitleWrap}>
          <InfoTitle
            classes={{ wrapper: this.props.classes.infoTitle }}
            title="You guessed it, we will use this section for our communication with you"
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  emirateCity: getInputValueById(state, "OrgAddrAdrd.emirateCity", [0, 0]),
  spaceType: getInputValueById(state, "OrgAddrAdrdSpace.spaceType", [0, 0])
});

export default withStyles(styles)(connect(mapStateToProps)(CompanyPreferredMailingAddressForm));
