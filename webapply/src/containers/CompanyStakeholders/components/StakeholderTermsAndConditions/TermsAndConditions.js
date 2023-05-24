import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";

export const TermsAndConditions = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Terms and Conditions</h6>
          <div className={classes.notAcceptWrapper}>
            <span>Not accepted</span>
          </div>
        </div>
        <Button variant="outlined" className={classes.readAcceptBtn}>
          Read and accept
        </Button>
      </div>
    </>
  );
};
