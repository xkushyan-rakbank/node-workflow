import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SectionTitleWithInfo } from "../../../components/SectionTitleWithInfo";
import { ExpandedOptionsCards } from "../../SelectServices/components/ValueAddedServices/ExpandedOptionsCards/ExpandedOptionsCards";

const useStyles = makeStyles(theme => ({
  indent: {
    marginBottom: "10px",
    [theme.breakpoints.up("lg")]: {
      marginBottom: "40px"
    }
  }
}));

export const AccountingSoftware = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.indent}>
        <SectionTitleWithInfo
          title="Get things done with RAKvalue"
          info="Automate and save time"
          smallInfo
        />
      </div>
      <ExpandedOptionsCards />
    </>
  );
};
