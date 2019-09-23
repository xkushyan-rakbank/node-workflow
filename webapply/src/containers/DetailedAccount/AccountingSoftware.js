import React from "react";
import { withStyles } from "@material-ui/core";
import logo from "./../../assets/images/logo.png";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import ExpandedOptionsCards from "../../components/ExpandedOptionsCards/ExpandedOptionsCards";

const style = {
  indent: {
    marginBottom: "40px",
    "@media only screen and (max-width: 1300px)": {
      marginBottom: "10px"
    }
  },
  image: {
    height: "150px",
    background: `url(${logo}) no-repeat 50% 10%/40%`,
    "@media only screen and (max-width: 1300px)": {
      display: "none"
    }
  }
};

const AccountingSoftware = ({ classes }) => (
  <>
    <div className={classes.image} />
    <div className={classes.indent}>
      <SectionTitleWithInfo
        title="You run the business. We run with you."
        info="Scale up with our top accounting solution and business insurance"
      />
    </div>
    <ExpandedOptionsCards />
  </>
);

export default withStyles(style)(AccountingSoftware);
