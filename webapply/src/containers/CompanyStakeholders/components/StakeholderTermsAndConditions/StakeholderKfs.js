import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import useGeneratePdf from "./useGeneratePdf";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { sendKfsMail } from "../../../../store/actions/termsAndConditions";

export const StakeholderKfs = ({ wcmData, setConsent }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages, cpfDocModificationInfo } = useGeneratePdf(
    "kfsUrl",
    wcmData,
    true
  );
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const dispatch = useDispatch();
  const [isKfsProgress, setKfsProgress] = useState(termsAndConditions?.kfs);
  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  useEffect(() => {
    setKfsProgress(termsAndConditions?.kfs);
  }, [termsAndConditions?.kfs]);

  const handleAccept = () => {
    setKfsDialog(false);
    setKfsProgress(true);
    dispatch(sendKfsMail(cpfDocModificationInfo));
  };

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Key Facts Statement (KFS)</h6>
          {!termsAndConditions.kfs ? (
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
        <Button
          variant="outlined"
          className={!termsAndConditions.kfs ? classes.readAcceptBtn : classes.readBtn}
          onClick={openKFSModal}
        >
          {!termsAndConditions.kfs ? (
            !isKfsProgress ? (
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
        handleAccept={!termsAndConditions.kfs ? handleAccept : ""}
        editedFile={editedFile}
        height={height}
        pages={pages}
        scrollToEnd={true}
        isAccepted={isKfsProgress}
        showInstructionText={
          termsAndConditions.kfs
            ? "Your accepted Key Fact Statement has been sent to your registered email"
            : ""
        }
      />
    </>
  );
};
