import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "./../components/InputField/Input";
import SubmitButton from "../components/Buttons/SubmitButton";
import routes from "./../routes"; // remove it in future
import { withStyles } from "@material-ui/core/styles";

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

class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.codeLength = 6;

    this.state = {
      valueList: []
    };
    this.inputConfig = Array.from(Array(this.codeLength).keys()).map(index => ({
      onChange: this.handleInputChange(index)
    }));
  }

  handleInputChange = index => ({ target: { value } }) => {
    if (value.length <= 1) {
      const { valueList } = this.state;
      valueList[index] = value;
      this.setState({ valueList });
      //todo switch focus to next input
    }
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
        <form>
          <Grid container item xs={12} direction="row" justify="flex-start">
            {this.inputConfig.map((item, index) => (
              <Grid key={index} className={classes.squareInput}>
                <Input
                  name={`code-${index}`}
                  type="number"
                  value={this.state.valueList[index] || ""}
                  onChange={item.onChange}
                />
              </Grid>
            ))}
          </Grid>
          <div className="flexContainerForButton">
            <span>
              Didn’t get the code? <a href=""> Send a new code</a>
            </span>
            <Link to={routes.companyInfo}>
              <SubmitButton />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withStyles(style)(Confirm);
