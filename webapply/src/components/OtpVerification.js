import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { digitRegExp } from "../constants";
import Input from "../components/InputField/Input";

const styles = {
  squareInput: {
    borderRadius: 8,
    marginRight: "20px",
    "& div": {
      width: "110px",
      height: "88px",
      fontSize: "46px",
      fontWeight: "600"
    },
    "& input": {
      textAlign: "center"
    }
  }
};

class OtpVerification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: Array(6).fill(""),
      invalid: false
    };
    this.inputRefs = [];
  }

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

    const isValid = this.state.code.every(value => digitRegExp.test(value));
    this.props.onChange({ isValid, code: this.state.code });

    this.setState({ ...newState });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
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
      </>
    );
  }
}

export default withStyles(styles)(OtpVerification);
