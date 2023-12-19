import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import useGeneratePdf from "./useGeneratePdf";
import { sendCustomerConsentToCPF } from "../../../../store/actions/termsAndConditions";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";

export const StakeholderAuthorisations = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const [isAcceptBtnDisabled, setIsAcceptBtnDisabled] = useState(true);
  const { editedFile, height, pages, cpfDocModificationInfo } = useGeneratePdf(
    "authorizationsConsent",
    wcmData,
    true
  );
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const [isAuthorizationProgress, setAuthorizationProgress] = useState(
    termsAndConditions?.authorisation
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthorizationProgress(termsAndConditions?.authorisation);
  }, [termsAndConditions?.authorisation]);

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    setAuthorizationProgress(true);
    dispatch(sendCustomerConsentToCPF(cpfDocModificationInfo, "AUTH_CONSENT"));
  };

  useEffect(() => {
    const isConsentAccepted = !!termsAndConditions.authorisation;
    const isPdfLoaded = editedFile && editedFile.length > 0;
    if (isConsentAccepted) {
      setIsAcceptBtnDisabled(isConsentAccepted);
    } else {
      setIsAcceptBtnDisabled(!isPdfLoaded);
    }
  }, [editedFile]);

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Authorisations</h6>
          {!termsAndConditions.authorisation ? (
            <div className={classes.notAcceptWrapper}>
              <span>To do</span>
            </div>
          ) : (
            <div className={classes.completedWrapper}>
              <SuccessIcon />
              <span>Accepted</span>
            </div>
          )}
        </div>
        <ul className={classes.authorisationsList}>
          <li>Al Etihad Credit Bureau checks</li>
          <li>Account statements check with Central Bank of the UAE (CBUAE)</li>
          <li>Other regulatory authorisations</li>
        </ul>
        <Button
          variant="outlined"
          className={!termsAndConditions.authorisation ? classes.readAcceptBtn : classes.readBtn}
          onClick={openKFSModal}
        >
          {!termsAndConditions.authorisation ? (
            !isAuthorizationProgress ? (
              "Read and accept"
            ) : (
              <CircularProgress size={14} value={null} color="#fff" />
            )
          ) : (
            "Accepted"
          )}
        </Button>
      </div>
      <TermsAndConditionsDialog
        open={openKfsDialog}
        handleClose={handleClose}
        handleAccept={!termsAndConditions.authorisation ? handleAccept : ""}
        editedFile={editedFile}
        height={height}
        pages={pages}
        scrollToEnd={false}
        isAccepted={isAcceptBtnDisabled}
        showInstructionText={
          termsAndConditions.authorisation
            ? "Your accepted authorizations will be sent to your registered email."
            : ""
        }
      />
    </>
  );
};
