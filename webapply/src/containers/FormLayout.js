import React from "react";
import Header from "./../components/Header";
import FormNavigation from "../components/FormNavigation";
import { withStyles } from "@material-ui/core/styles";

const style = {
  formLayout: {
    display: "flex",
    height: "100%",
    "@media only screen and (max-width: 1100px)": {}
  },
  formWrapper: {
    flex: "1 1 auto",
    overflowY: "auto",
    minHeight: "0px",
    "& h2": {
      fontSize: "46px",
      fontWeight: "600",
      marginBottom: "20px",
      marginTop: "10%",
      color: "#373737",
      "@media only screen and (max-width: 1100px)": {
        fontSize: "27px"
      }
    }
  },
  formInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "90px 50px 50px",
    "& nextButton": {
      margin: "42px 0 0 !important"
    }
  }
};

const FormLayout = ({ children, classes }) => {
  return (
    <React.Fragment>
      <Header />
      <div className={classes.formLayout}>
        <FormNavigation />
        <div className={classes.formWrapper}>
          <div className={classes.formInner}>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withStyles(style)(FormLayout);
