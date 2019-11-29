import React from "react";
import { withStyles } from "@material-ui/core";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import { ExpandedOptionsCards } from "../SelectServices/components/ValueAddedServices/ExpandedOptionsCards/ExpandedOptionsCards";

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
      <SectionTitleWithInfo title="Get things done with RAKvalue" info="Automate and save time" />
    </div>
    <ExpandedOptionsCards accountType={accountType} />
  </>
);

export default withStyles(style)(AccountingSoftware);
