import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { digitRegExp } from "../../constants";
import ContainerComeBack from "./ContainerComeBack";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import Input from "../../components/InputField/Input";
import TextHelpWithLink from "../../components/TextHelpWithLink";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import SubmitButton from "../../components/Buttons/SubmitButton";

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
  squareInput: {
    marginRight: "20px",
    "& div": {
      width: "110px",
      height: "88px",
      boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.01)",
      fontSize: "30px"
    },
    "& input": {
      textAlign: "center"
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
      code: Array(6).fill(""),
      invalid: false
    };
    this.inputRefs = [];
  }

  submitForm = e => {
    e.preventDefault();
  };

  bindNodeRef = index => node => {
    this.inputRefs[index] = node;
  };

  handleInputFocus = index => () => {
    this.inputRefs[index] && this.inputRefs[index].select();
  };

  jumpToNextInput(name) {
    const index = Number(name);
    this.inputRefs[index] && this.inputRefs[index].blur();
    this.inputRefs[index + 1] && this.inputRefs[index + 1].focus();
  }

  handleChange = event => {
    const { value, name } = event.target;
    const newValue = value.trim();
    const newState = { invalid: false };
    if (digitRegExp.test(value) || (this.state.code[name] && !newValue)) {
      const newCode = this.state.code;
      newCode[name] = newValue;
      newState.code = newCode;
      if (newValue) {
        this.jumpToNextInput(name);
      }
    }
    this.setState({ ...newState });
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
              {/* TODO create reusable component */}
              {this.state.code.map((value, index) => {
                return (
                  <Grid key={`code-${index}`} className={classes.squareInput}>
                    <Input
                      key={`code-${index}`}
                      name={index.toString()}
                      inputProps={{
                        maxLength: 1,
                        ref: this.bindNodeRef(index)
                      }}
                      onFocus={this.handleInputFocus(index)}
                      onChange={this.handleChange}
                      value={value}
                    />
                  </Grid>
                );
              })}
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
                <Typography
                  element="span"
                  variant="subtitle1"
                  classes={{ root: classes.goBack }}
                >
                  Go back
                </Typography>
              </Link>
            </div>

            <SubmitButton
              disabled
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
