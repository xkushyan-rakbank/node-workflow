import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SectionTitleWithInfo from "../../components/SectionTitleWithInfo";
import { ExpandedOptionsCards } from "../SelectServices/components/ValueAddedServices/ExpandedOptionsCards/ExpandedOptionsCards";

const useStyles = makeStyles({
  indent: {
    marginBottom: "40px",
    "@media only screen and (max-width: 1300px)": {
      marginBottom: "10px"
    }
  }
});

export const AccountingSoftware = ({ accountType }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo title="Get things done with RAKvalue" info="Automate and save time" />
      </div>
      <ExpandedOptionsCards accountType={accountType} />
    </>
  );
};
