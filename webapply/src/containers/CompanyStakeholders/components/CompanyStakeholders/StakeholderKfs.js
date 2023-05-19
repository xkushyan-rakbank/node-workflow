import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";

export const StakeholderKfs = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Key Facts Statement (KFS)</h6>
          <div className={classes.completedWrapper}>
            <SuccessIcon />
            <span>Accepted</span>
          </div>
        </div>
        <Button variant="outlined" className={classes.readBtn}>
          Read
        </Button>
      </div>
    </>
  );
};
