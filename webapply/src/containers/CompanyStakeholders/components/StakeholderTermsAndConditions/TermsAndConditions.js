import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { sendCustomerConsentToCPF } from "../../../../store/actions/termsAndConditions";

export const TermsAndConditions = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const [isTNCProgress, setTNCProgress] = useState(termsAndConditions?.generalTCs);
  const dispatch = useDispatch();

  useEffect(() => {
    setTNCProgress(termsAndConditions.generalTCs);
  }, [termsAndConditions.generalTCs]);

  useEffect(() => {
    if (wcmData) {
      setPdfLink(wcmData.productVariantContent[0]["generalTermsAndConditions"]);
    }
  }, [wcmData]);

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    setTNCProgress(true);
    dispatch(sendCustomerConsentToCPF([], "TNC_CONSENT"));
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
        editedFile={pdfLink}
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
