import React from "react";
import { withStyles } from "@material-ui/core";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import ExpandedOptionsCards from "../../components/ExpandedOptionsCards/ExpandedOptionsCards";

const style = {
  indent: {
    marginBottom: "40px",
    "@media only screen and (max-width: 1300px)": {
      marginBottom: "10px"
    }
  }
};

const AccountingSoftware = ({ classes, accountType }) => (
  <>
    <div className={classes.indent}>
      <SectionTitleWithInfo
        title="You run the business. We run with you."
        info="Scale up with our top accounting solution and business insurance"
      />
    </div>
    <ExpandedOptionsCards accountType={accountType} />
  </>
);

export default withStyles(style)(AccountingSoftware);
