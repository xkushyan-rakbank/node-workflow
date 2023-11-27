import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import useGeneratePdf from "./useGeneratePdf";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { sendCustomerConsentToCPF } from "../../../../store/actions/termsAndConditions";

export const TermsAndConditions = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages, cpfDocModificationInfo } = useGeneratePdf(
    "generalTermsAndConditions",
    wcmData
  );
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const [isTNCProgress, setTNCProgress] = useState(termsAndConditions?.generalTCs);
  const dispatch = useDispatch();

  useEffect(() => {
    setTNCProgress(termsAndConditions.generalTCs);
  }, [termsAndConditions.generalTCs]);

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    setTNCProgress(true);
    dispatch(sendCustomerConsentToCPF(cpfDocModificationInfo, "TNC_CONSENT"));
  };

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>General Terms and Conditions</h6>
          {!termsAndConditions.generalTCs ? (
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
          className={!termsAndConditions.generalTCs ? classes.readAcceptBtn : classes.readBtn}
          onClick={openKFSModal}
        >
          {!termsAndConditions.generalTCs ? (
            !isTNCProgress ? (
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
        handleAccept={!termsAndConditions.generalTCs ? handleAccept : ""}
        editedFile={editedFile}
        height={height}
        pages={pages}
        scrollToEnd={false}
        isAccepted={termsAndConditions.generalTCs}
        showInstructionText={
          termsAndConditions.generalTCs
            ? "Your accepted terms and conditions are provided above."
            : ""
        }
      />
    </>
  );
};
