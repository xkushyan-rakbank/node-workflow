import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "./../components/InputField/Input";
import SubmitButton from "../components/Buttons/SubmitButton";
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

const Confirm = ({ classes }) => {
  return (
    <div className={classes.confirmForm}>
      <h2>Confirm It’s You</h2>
      <p className={classes.formDescription}>
        We have sent you a verification code to <b>christer@acme.com</b> and
        <b> +791 756 565 840</b>. Please input here to Autenticate.
      </p>
      <form>
        <Grid container xs={12} direction="row" justify="flex-start">
          {Array.from(Array(6).keys()).map(index => (
            <Grid key={index} className={classes.squareInput}>
              <Input type="text" name={`code-${index}`} />
            </Grid>
          ))}
        </Grid>
        <div className="flexContainerForButton">
          <span>
            Didn’t get the code? <a href="#"> Send a new code</a>
          </span>
          <Link to="/about-your-company">
            <SubmitButton />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default withStyles(style)(Confirm);
