import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";

export const StakeholderAuthorisations = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Authorisations</h6>
          <div className={classes.notAcceptWrapper}>
            <span>Not accepted</span>
          </div>
        </div>
        <ul className={classes.authorisationsList}>
          <li>Al Etihad credit bureau checks</li>
          <li>Account statements check with Central Bank of the UAE (CBUAE)</li>
          <li>Other regulatory authorisations</li>
        </ul>
        <Button variant="outlined" className={classes.readAcceptBtn}>
          Read and accept
        </Button>
      </div>
    </>
  );
};
