import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import useGeneratePdf from "./useGeneratePdf";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import {
  sendCustomerConsentToCPF,
  termsAndConditionsAccepted
} from "../../../../store/actions/termsAndConditions";
import { updateProspect } from "../../../../store/actions/appConfig";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { formattedAccTimeStamp } from "../../../../utils/getAcceptedTimeStamp/getAcceptedTimeStamp";

export const TermsAndConditions = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages, cpfDocModificationInfo } = useGeneratePdf(
    "generalTermsAndConditions",
    wcmData
  );
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const signatoryInfo = useSelector(getSignatories);
  const dispatch = useDispatch();

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
    dispatch(sendCustomerConsentToCPF(cpfDocModificationInfo, "TNC_CONSENT"));
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].consentInfo": {
          ...signatoryInfo[0].consentInfo,
          otherTncConsent: { accept: true, timestamp: formattedAccTimeStamp(new Date()) }
        }
      })
    );
    dispatch(
      termsAndConditionsAccepted({
        generalTCs: true
      })
    );
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
          {!termsAndConditions.generalTCs ? "Read and accept" : "Accepted"}
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
