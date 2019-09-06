import React from "react";
import Grid from "@material-ui/core/Grid";
import Input from "./../components/InputField/Input";
import SubmitButton from "../components/Buttons/SubmitButton";
import { withStyles } from "@material-ui/core/styles";
import { digitRegExp } from "../constants";
import ErrorMessage from "../components/ErrorMessage";

const style = {
  confirmForm: {
    maxWidth: "633px"
  },
  formDescription: {
    fontSize: "20px",
    color: "#373737",
    margin: "80px 0 40px",
    "& b": {
      fontWeight: "600"
    }
  },
  squareInput: {
    marginRight: "16px",
    "& div": {
      width: "88px",
      height: "88px",
      boxShadow: "0 5px 21px 0 rgba(0, 0, 0, 0.01)",
      fontSize: "30px"
    },
    "& input": {
      textAlign: "center"
    }
  }
};

class FormConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: Array(6).fill(""),
      invalid: false
    };
    this.inputRefs = [];
  }

  getFullCode() {
    return this.state.code.join("");
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.code.every(value => digitRegExp.test(value))) {
      console.log(this.getFullCode());
      this.props.history.push("/CompanyInfo");
    } else {
      this.setState({ invalid: true });
    }
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

  bindNodeRef = index => node => {
    this.inputRefs[index] = node;
  };

  handleInputFocus = index => () => {
    this.inputRefs[index] && this.inputRefs[index].select();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.confirmForm}>
        <h2>Confirm It’s You</h2>
        <p className={classes.formDescription}>
          We have sent you a verification code to <b>christer@acme.com</b> and
          <b> +791 756 565 840</b>. Please input here to Autenticate.
        </p>
        <form onSubmit={this.handleSubmit}>
          <Grid container item xs={12} direction="row" justify="flex-start">
            {this.state.code.map((value, index) => {
              return (
                <Grid key={`code-${index}`} className={classes.squareInput}>
                  <Input
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
          {this.state.invalid && <ErrorMessage error="Invalid code" />}
          <div className="flexContainerForButton">
            <span>
              Didn’t get the code? <a href="#"> Send a new code</a>
            </span>
            <SubmitButton
              disabled={this.state.code.some(value => !digitRegExp.test(value))}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(style)(FormConfirm);
