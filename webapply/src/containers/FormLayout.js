import { withStyles } from "@material-ui/core/styles";
import React from "react";
import FormNavigation from "../components/FormNavigation";
import Header from "./../components/Header";

const style = {
  formLayout: {
    display: "flex",
    height: "100%",
    "@media only screen and (max-width: 1100px)": {}
  },
  formWrapper: {
    flex: "1 1 auto",
    minHeight: "0px",
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "0",
      color: "#373737",
      "@media only screen and (max-width: 1100px)": {
        fontSize: "27px"
      }
    }
  },
  formInner: {
    display: "flex",
    height: "100%",
    overflowY: "auto",
    "& nextButton": {
      margin: "42px 0 0 !important"
    }
  },
  mainContainer: {
    maxWidth: "780px",
    width: "100%",
    margin: "auto",
    padding: "90px 50px 20px"
  }
};

const FormLayout = ({ children, classes }) => {
  return (
    <React.Fragment>
      <Header />
      <div className={classes.formLayout}>
        <FormNavigation />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>
            <div className={classes.mainContainer}>{children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(style)(FormLayout);
