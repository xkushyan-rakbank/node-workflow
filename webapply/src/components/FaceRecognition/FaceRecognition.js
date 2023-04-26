import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import cx from "classnames";

import { useStyles } from "./styled";
import { ReactComponent as FaceScanIcon } from "../../assets/icons/face_scan.svg";

export const FaceRecognition = ({
  fieldDescription,
  helperText,
  isStepActive = true,
  disabledReason,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.fieldDescription}>{fieldDescription}</div>
      {!isStepActive && <div className={classes.disabledReason}>{disabledReason}</div>}
      <div className={cx(classes.facseScanContainer, !isStepActive ? classes.disableUpload : "")}>
        <div className={classes.contentContainer}>
          <FaceScanIcon
            height="44"
            width="40"
            alt="faceRecognitionIcon"
          />
          <div style={{ marginLeft: "20px" }}>
            <div className={classes.content}>Face ID</div>
            <div className={classes.subcontent}>{helperText}</div>
          </div>
        </div>
        <Button
          color="primary"
          variant="contained"
          className={classes.actionButton}
          disabled={!isStepActive}
        >
          Start
        </Button>
      </div>
      {isStepActive && <p className={classes.disclaimerInfo}>
      Please note: By selecting Start, you give us permission to retrieve your data and verify your face against your ID documents.
      </p>}
    </Fragment>
  );
};
