import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import useGeneratePdf from "./useGeneratePdf";

export const StakeholderAuthorisations = ({ wcmData }) => {
  const classes = useStyles();
  const [isAccepted, setIsAccepted] = useState(false);
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("authorizationsConsent", wcmData);

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    setIsAccepted(true);
  };
  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Authorizations</h6>
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
        <ul className={classes.authorisationsList}>
          <li>Al Etihad credit bureau checks</li>
          <li>Account statements check with Central Bank of the UAE (CBUAE)</li>
          <li>Other regulatory authorisations</li>
        </ul>
        {!isAccepted ? (
          <Button variant="outlined" className={classes.readAcceptBtn} onClick={openKFSModal}>
            Read and Accept
          </Button>
        ) : (
          <Button variant="outlined" className={classes.readBtn}>
            Read
          </Button>
        )}
      </div>
      <TermsAndConditionsDialog
        open={openKfsDialog}
        handleClose={handleClose}
        handleAccept={handleAccept}
        editedFile={editedFile}
        height={height}
        pages={pages}
        scrollToEnd={false}
      />
    </>
  );
};
