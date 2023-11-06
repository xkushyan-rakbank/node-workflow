import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import useGeneratePdf from "./useGeneratePdf";
import {
  sendCustomerConsentToCPF,
  termsAndConditionsAccepted
} from "../../../../store/actions/termsAndConditions";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { updateProspect } from "../../../../store/actions/appConfig";
import { getSignatories } from "../../../../store/selectors/appConfig";
import { formattedAccTimeStamp } from "../../../../utils/getAcceptedTimeStamp/getAcceptedTimeStamp";

export const StakeholderAuthorisations = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages, cpfDocModificationInfo } = useGeneratePdf(
    "authorizationsConsent",
    wcmData,
    true
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

  const acceptedTimeStamp = formattedAccTimeStamp(new Date());
  
  const handleAccept = () => {
    setKfsDialog(false);
    dispatch(sendCustomerConsentToCPF(cpfDocModificationInfo, "AUTH_CONSENT"));
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].consentInfo": {
          ...signatoryInfo[0]?.consentInfo,
          aecbConsent: { accept: true, timestamp: acceptedTimeStamp },
          ftsConsent: { accept: true, timestamp: acceptedTimeStamp },
          norblocConsent: { accept: true, timestamp: acceptedTimeStamp }
        }
      })
    );
    dispatch(
      termsAndConditionsAccepted({
        authorisation: true
      })
    );
  };
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
          {!termsAndConditions.authorisation ? "Read and accept" : "Accepted"}
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
        isAccepted={termsAndConditions.authorisation}
        showInstructionText={
          termsAndConditions.authorisation
            ? "Your accepted authorizations will be sent to your registered email."
            : ""
        }
      />
    </>
  );
};
