import React from "react";
import { useStyles } from "../styled";

export const TaxInfoSection = ({
  hideLabel,
  index,
  country,
  tin,
  reasonForTINNotAvailable,
  remarks,
  truncateString
}) => {
  const classes = useStyles();
  return (
    <>
      {!hideLabel && <div className={classes.infoSubCatLabel}>Country {index + 1}</div>}
      <div className={classes.infoLabelValue}>
        <label>Tax residence:</label>
        <p>{country}</p>
      </div>
      <div className={classes.infoLabelValue}>
        <label>TIN or equivalent:</label>
        <p>{tin}</p>
      </div>
      <div className={classes.infoLabelValue}>
        <label>Reason for unavailable TIN:</label>
        <p>
          {reasonForTINNotAvailable
            ? truncateString(reasonForTINNotAvailable, 100)
            : "Not applicable"}
        </p>
      </div>
      <div className={classes.infoLabelValue}>
        <label>Remarks:</label>
        <p>{remarks ? truncateString(remarks, 100) : "-"}</p>
      </div>
    </>
  );
};
