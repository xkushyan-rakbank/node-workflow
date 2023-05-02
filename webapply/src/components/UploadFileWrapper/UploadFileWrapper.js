import React, { Fragment } from "react";
import cx from "classnames";
import { Button } from "@material-ui/core";

import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../assets/icons/fileUpload.svg";

export const UploadFileWrapper = ({
  fieldDescription,
  helperText,
  isStepActive = true,
  disabledReason,
  handleScan,
  handleUpload,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.fieldDescription}>{fieldDescription}</div>
      {!isStepActive && <div className={classes.disabledReason}>{disabledReason}</div>}
      <div className={cx(classes.documentContainer, !isStepActive ? classes.disableUpload : "")}>
        <div className={classes.uploadContainer}>
          <div className={classes.contentContainer}>
            <FileIcon className={classes.fileUploadIcon} alt="companyIconSvg" />
            <div style={{ marginLeft: "20px" }}>
              <div className={classes.content}>
                Drag and drop file here or upload from your computer
              </div>
              <div className={classes.subcontent}>{helperText}</div>
            </div>
          </div>

          <div className={classes.btnWrapper}>
            <Button
              color="primary"
              variant="contained"
              className={cx(classes.actionButton, classes.btnScanUpload)}
              disabled={!isStepActive}
              onClick={handleScan}
            >
              Scan
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={cx(classes.actionButton, classes.btnScanUpload)}
              disabled={!isStepActive}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        </div>

        <div className={classes.previewContainer}>Preview</div>
      </div>
    </Fragment>
  );
};
