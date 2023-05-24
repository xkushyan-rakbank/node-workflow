import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";

export const StakeholderKfs = () => {
  const classes = useStyles();
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Key Facts Statement (KFS)</h6>
          {!isAccepted ? (
            <div className={classes.notAcceptWrapper}>
              <span>Not accepted</span>
            </div>
          ) : (
            <div className={classes.completedWrapper}>
              <SuccessIcon />
              <span>Accepted</span>
            </div>
          )}
        </div>
        {!isAccepted ? (
          <Button variant="outlined" className={classes.readAcceptBtn}>
            Read and Accept
          </Button>
        ) : (
          <Button variant="outlined" className={classes.readBtn}>
            Read
          </Button>
        )}
      </div>
    </>
  );
};
