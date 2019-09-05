import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import TextInput from "../components/InputField/TextInput";
import SubmitButton from "../components/Buttons/SubmitButton";
import routes from "./../routes"; // remove it in future

const styles = {
  baseForm: {
    maxWidth: "612px"
  },
  reCaptchaContainer: {
    display: "flex",
    paddingTop: "10px",
    justifyContent: "flex-end"
  },

  nameField: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.33,
    color: "#373737"
  },
  indent: {
    marginBottom: "24px"
  }
};


class SearchProspect extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const isValid = event.target.checkValidity();
    console.log(event.target.elements);
    
    };

    render() {
    const { classes } = this.props;

    return (
      <div className={classes.baseForm}>
        <h2>Search Prospect</h2>
       
        <form onSubmit={this.handleSubmit} noValidate>

        <TextInput id="Search.fullName" />

        <TextInput id="Search.mobileNo" selectId="Search.countryCode" withSelect />
        
        <TextInput id="Search.leadNumber" />

        <TextInput id="Search.tradeLicenseNo" /> 
        
        <TextInput id="Search.email" />  

        <TextInput id="Search.eidNumber" />
              
          <div className="linkContainer">
            <Link to={routes.verifyOtp}>
              <SubmitButton />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default withStyles(styles) (SearchProspect);
