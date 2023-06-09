import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styled";
import useGeneratePdf from "./useGeneratePdf";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/credit_score.svg";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import { getTermsAndConditions } from "../../../../store/selectors/termsAndConditions";
import { termsAndConditionsAccepted } from "../../../../store/actions/termsAndConditions";

export const TermsAndConditions = ({ wcmData }) => {
  const classes = useStyles();
  const [openKfsDialog, setKfsDialog] = useState(false);
  const { editedFile, height, pages } = useGeneratePdf("generalTermsAndConditions", wcmData);
  const { termsAndConditions } = useSelector(getTermsAndConditions);
  const dispatch = useDispatch();

  const openKFSModal = () => {
    setKfsDialog(true);
  };

  const handleClose = () => {
    setKfsDialog(false);
  };

  const handleAccept = () => {
    setKfsDialog(false);
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
              <span>Not accepted</span>
            </div>
          ) : (
            <div className={classes.completedWrapper}>
              <SuccessIcon />
              <span>Accepted</span>
            </div>
          )}
        </div>
        {!termsAndConditions.generalTCs ? (
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
