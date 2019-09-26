import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import ContainerComeBack from "./ContainerComeBack";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import TextHelpWithLink from "../../components/TextHelpWithLink";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SubmitButton from "../../components/Buttons/SubmitButton";
import OtpVerification from "../../components/OtpVerification";

const style = {
  form: {
    width: "100%",
    height: 450,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media only screen and (max-height: 768px)": {
      height: 390
    }
  },
  goBackContainer: {
    marginRight: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  goBackArrow: {
    marginRight: 5
  },
  goBack: {
    color: "#373737",
    lineHeight: "1.29",
    fontWeight: "600",
    textDecoration: "underline",
    fontSize: "14px",
    "&:hover": {
      textDecoration: "none"
    }
  }
};

class ComeBackVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidCode: false
    };
  }

  submitForm = e => {
    e.preventDefault();
  };

  isCodeValueValid = ({ isValid }) => {
    this.setState({ isValidCode: isValid });
  };

  render() {
    const { classes } = this.props;

    return (
      <ContainerComeBack>
        <SectionTitleWithInfo
          title="We have sent you a verification code"
          info="Please input the six digits below, to confirm this is you."
        />

        <form noValidate onSubmit={this.submitForm} className={classes.form}>
          <div>
            <Grid container item xs={12} direction="row">
              <OtpVerification onChange={this.isCodeValueValid} />
            </Grid>

            <TextHelpWithLink
              style={{ marginTop: "13px" }}
              text="Didn’t get the code?"
              linkText="Send a new code"
              linkTo="#"
            />
          </div>

          <Grid
            container
            direction="row"
            className={classes.actions}
            alignItems="center"
            justify="flex-end"
          >
            <div className={classes.goBackContainer}>
              <KeyboardBackspaceIcon className={classes.goBackArrow} />
              <Link to="#">
                <Typography element="span" variant="subtitle1" classes={{ root: classes.goBack }}>
                  Go back
                </Typography>
              </Link>
            </div>

            <SubmitButton
              disabled={!this.state.isValidCode}
              label="Next step"
              justify="flex-end"
              containerExtraStyles={{ width: "auto", margin: 0 }}
            />
          </Grid>
        </form>
      </ContainerComeBack>
    );
  }
}

export default withStyles(style)(ComeBackVerification);
