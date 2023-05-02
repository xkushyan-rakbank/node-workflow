import React from "react";
import { Button } from "@material-ui/core";
import { ReactComponent as VerifyMobileIcon } from "../../../../assets/icons/verify_mobile.svg";
import { useStyles } from "./styled";
export const ScanViaMobile = () => {
  const classes = useStyles();
  return (
    <div className={classes.verifyMobileWrapper}>
      <div className={classes.descriptionWrapper}>
        <VerifyMobileIcon
          alt="Continue verification on mobile"
          className={classes.verifyMobileIcon}
        />
        <div>
          <h6>Continue verification on mobile browser</h6>
          <p>
            You can do this if you have documents on your phone or want to use your phone's camera
            to scan your face.
          </p>
        </div>
      </div>
      <Button variant="outlined" className={classes.continueBtn}>
        Continue on mobile
      </Button>
    </div>
  );
};
