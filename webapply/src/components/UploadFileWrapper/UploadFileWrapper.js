import React, { Fragment, useState } from "react";
import cx from "classnames";
import { Button, useMediaQuery } from "@material-ui/core";

import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../assets/icons/fileUpload.svg";
import { ReactComponent as SuccessIcon } from "../../assets/icons/loadingGreen.svg";
import { ReactComponent as PreviewEye } from "../../assets/icons/previewEye.svg";
import { PreviewDataModal } from "../../containers/CompanyStakeholders/components/CompanyStakeholders/PreviewDataModal";

export const UploadFileWrapper = ({
  fieldDescription,
  helperText,
  isStepActive = true,
  disabledReason,
  handleScan,
  handleUpload,
  uploadedContent = "",
  isSuccess = false,
  successText,
  handleRemove,
  showPreview,
  hasError = false,
  mobileLabel,
  ...props
}) => {
  const classes = useStyles();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const isMobileDevice = useMediaQuery("max-width: 767px") || window.innerWidth <= 768;

  const truncatedLabel = label => {
    if (!label.includes("|")) {
      return <div className={classes.emriatesIDTile}>{label}</div>;
    }
    const splitLabel = label
      .split("|")
      .map(part => (part.length > 30 ? part.substring(0, 25) + "..." : part));
    return <div className={classes.emriatesIDTile}>{splitLabel.join(" | ")}</div>;
  };
  return (
    <>
      <Fragment>
        <div className={classes.fieldDescription}>{fieldDescription}</div>
        {!isStepActive && <div className={classes.disabledReason}>{disabledReason}</div>}
        <div className={cx(classes.documentContainer, !isStepActive ? classes.disableUpload : "")}>
          <div className={classes.uploadContainer}>
            <div className={classes.contentContainer}>
              {isSuccess ? (
                <SuccessIcon />
              ) : (
                <FileIcon className={classes.fileUploadIcon} alt="companyIconSvg" />
              )}
              <div className={classes.contentWrapper}>
                <div className={classes.content}>
                  {uploadedContent
                    ? truncatedLabel(uploadedContent)
                    : `${
                        isMobileDevice && mobileLabel
                          ? mobileLabel
                          : "Scan or upload from your computer"
                      }`}
                  {!isSuccess && <div className={classes.subcontent}>{helperText}</div>}
                </div>
              </div>
            </div>
            {isSuccess ? (
              <div className={classes.btnWrapper}>
                {showPreview && (
                  <div className={classes.previewBtn}>
                    <PreviewEye />
                    <div
                      className={classes.previewContainer}
                      onClick={() => setShowPreviewModal(true)}
                    >
                      Preview
                    </div>
                  </div>
                )}
                <Button
                  color="primary"
                  variant="outlined"
                  className={cx(classes.actionButton, classes.btnRemove)}
                  disabled={!isStepActive}
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className={classes.scanUploadbtnWrapper}>
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
            )}
          </div>
        </div>
      </Fragment>
      {showPreviewModal && (
        <PreviewDataModal
          isOpen={showPreviewModal}
          handleClose={() => setShowPreviewModal(false)}
          type={props.type}
        />
      )}
    </>
  );
};
