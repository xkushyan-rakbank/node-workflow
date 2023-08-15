import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import useGeneratePdf from "./useGeneratePdf";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import {
  sendKfsMail,
  termsAndConditionsAccepted
} from "../../../../store/actions/termsAndConditions";
import { updateProspect } from "../../../../store/actions/appConfig";
import { getSignatories } from "../../../../store/selectors/appConfig";

export const StakeholderKfs = ({ wcmData, setConsent }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("kfsUrl", wcmData, true);
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const signatoryInfo = useSelector(getSignatories);
  const dispatch = useDispatch();
  const [isKfsProgress, setKfsProgress] = useState(termsAndConditions?.kfs)

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };


  const handleAccept = () => {
    setKfsDialog(false);
    setKfsProgress(true)
    dispatch(sendKfsMail());
    dispatch(
      updateProspect({
        "prospect.signatoryInfo[0].consentInfo": {
          ...signatoryInfo[0]?.consentInfo,
          kfsConsent: { accept: true }
        }
      }),
    );
  };

  return (
    <>
      <div className={classes.descriptionContent}>
        <div className={classes.kfsDescriptionContent}>
          <h6 className={classes.kfsTitle}>Key Fact Statement (KFS)</h6>
          {!termsAndConditions.kfs ? (
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
        {!termsAndConditions.kfs ? (
          !isKfsProgress ? (
            <Button variant="outlined" className={classes.readAcceptBtn} onClick={openKFSModal}>
              Read and Accept
            </Button>
          ) : (
            <CircularProgress size={14} value={null} />
          )
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
        scrollToEnd={true}
      />
    </>
  );
};
