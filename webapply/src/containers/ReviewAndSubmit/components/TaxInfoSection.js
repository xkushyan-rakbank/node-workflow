import React, { useState } from "react";
import { Button } from "@material-ui/core";

import { useStyles } from "../styled";
import { ICONS, Icon } from "../../../components/Icons";

export const TaxInfoSection = ({
  hideLabel,
  index,
  country,
  tin,
  reasonForTINNotAvailable,
  remarks,
  truncateString
}) => {
  const [showMoreBackgroundDetail, setShowMoreBackgroundDetail] = useState(false);
  const classes = useStyles({ showMoreBackgroundDetail });

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
        <p>
          {remarks
            ? showMoreBackgroundDetail || remarks.length < 120
              ? remarks
              : remarks.substring(0, 120)
            : "-"}
          {remarks && remarks.length > 120 ? (
            <Button
              disableRipple={true}
              className={classes.showMoreBtn}
              onClick={() => setShowMoreBackgroundDetail(!showMoreBackgroundDetail)}
            >
              {showMoreBackgroundDetail ? "Show less" : "Show more"}
              <Icon name={ICONS.arrowDown} alt="arrow-down" className={classes.showMoreBtnIcon} />
            </Button>
          ) : (
            ""
          )}
        </p>
      </div>
    </>
  );
};
