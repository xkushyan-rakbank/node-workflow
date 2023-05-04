import React, { Fragment, useState } from "react";
import cx from "classnames";
import { Button } from "@material-ui/core";

import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../assets/icons/fileUpload.svg";
import { ReactComponent as SuccessIcon } from "../../assets/icons/credit_score.svg";
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
  ...props
}) => {
  const classes = useStyles();
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <>
      <Fragment>
        <div className={classes.fieldDescription}>{fieldDescription}</div>
        {!isStepActive && <div className={classes.disabledReason}>{disabledReason}</div>}
        <div className={cx(classes.documentContainer, !isStepActive ? classes.disableUpload : "")}>
          <div className={classes.uploadContainer}>
            <div className={classes.contentContainer}>
              <FileIcon className={classes.fileUploadIcon} alt="companyIconSvg" />
              <div style={{ marginLeft: "20px" }}>
                <div className={classes.content}>
                  {uploadedContent
                    ? uploadedContent
                    : "Drag and drop file here or upload from your computer"}
                </div>
                {isSuccess ? (
                  <div className={cx(classes.subcontent, classes.successText)}>
                    <SuccessIcon />
                    <span style={{ marginLeft: "5px" }}>{successText}</span>
                  </div>
                ) : (
                  <div className={classes.subcontent}>{helperText}</div>
                )}
              </div>
            </div>

            <div className={classes.btnWrapper}>
              {isSuccess ? (
                <Button
                  color="primary"
                  variant="outlined"
                  className={cx(classes.actionButton, classes.btnRemove)}
                  disabled={!isStepActive}
                  onClick={handleRemove}
                >
                  Remove
                </Button>
              ) : (
                <>
                  {" "}
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
                </>
              )}
            </div>
          </div>
          {showPreview && (
            <div className={classes.previewContainer} onClick={() => setShowPreviewModal(true)}>
              Preview
            </div>
          )}
        </div>
      </Fragment>
      {showPreviewModal && (
        <PreviewDataModal
          isOpen={showPreviewModal}
          handleClose={() => setShowPreviewModal(false)}
          type={props.type}
          previewData={props.data}
        />
      )}
    </>
  );
};
