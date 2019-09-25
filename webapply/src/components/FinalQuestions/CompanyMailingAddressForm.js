import React, { Component } from "react";
import SectionTitle from "../SectionTitle";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import ContinueButton from "../Buttons/ContinueButton";
import TextInput from "../InputField/TextInput";
import PureSelect from "../InputField/PureSelect";
import InfoTitle from "../InfoTitle";

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
  }
};

class CompanyMailingAddressForm extends Component {
  static defaultProps = {
    handleContinue: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      addressCount: 1
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleContinue(event);
  };

  render() {
    return (
      <form noValidate onSubmit={this.handleSubmit}>
        <SectionTitle title="Preferred mailing address" className={this.props.classes.title} />
        <Grid container>
          <InfoTitle title="You guessed it, we will use this section for our communication with you" />
        </Grid>

        <Grid container spacing={3} className={this.props.classes.flexContainer}>
          {Array.from(Array(this.state.addressCount).keys()).map(index => {
            return (
              <React.Fragment key={index}>
                <Grid item md={6} sm={12}>
                  <TextInput
                    id="OrgAddrAdrd.addressFieldDesc"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                  <TextInput
                    id="OrgAddrAdrd.addressLine1"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                  <PureSelect
                    id="OrgAddrAdrd.emirateCity"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <PureSelect
                    id="OrgAddrAdrdSpace.spaceType"
                    indexes={[index, 0]}
                    required={index === 0}
                  />
                  <TextInput id="OrgAddrAdrd.poBox" indexes={[index, 0]} required={index === 0} />
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

        <div className={this.props.classes.controlsWrapper}>
          <ContinueButton type="submit" />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(CompanyMailingAddressForm);
