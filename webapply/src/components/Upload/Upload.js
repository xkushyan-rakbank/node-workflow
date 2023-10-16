import React, { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import cx from "classnames";
import { getIn } from "formik";
import { isMobile } from "react-device-detect";

import { useStyles } from "./styled";
import FileUploadIcon from "../../assets/icons/fileUpload.svg";
// import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import { ReactComponent as Check } from "../../assets/icons/loadingGreen.svg";
import useDecisions from "../../utils/useDecisions";
import { ContexualHelp, ErrorMessage } from "./../Notifications";
import { ICONS, Icon } from "../Icons";
import { InfoTitle } from "../InfoTitle";
import { getFileUploadErrorMessage } from "../../constants";

const FileIcon = ({ height, width }) => (
  <img src={FileUploadIcon} style={{ height, width }} alt="fileIconPng" />
);
export const Upload = ({
  accept,
  fileSize,
  file,
  onDelete,
  fieldDescription,
  helperText,
  path,
  mobilecontentPlaceholder,
  form: { errors, touched },
  field: { onBlur, ...field },
  ErrorMessageComponent = ErrorMessage,
  showUploadSuccessIcon = true,
  selectMultipleFiles = false,
  contextualHelpText,
  contextualHelpProps,
  showUploadInfoIcon = false,
  infoTitle,
  infoIcon = false,
  isUploading = false,
  notedText,
  ...props
}) => {
  const { minSize, maxSize } = fileSize;
  const classes = useStyles();

  const { isDragActive, fileRejections, getRootProps, getInputProps } = useDropzone({
    multiple: selectMultipleFiles,
    accept,
    maxSize,
    minSize,
    noDrag: isMobile ? true : false,
    ...props
  });
  const hasFile = !!file;
  const { visible } = useDecisions(path);
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && (getIn(touched, field.name) || touched[field.name]);
  const FileIconHeight = isMobile ? "35px" : "44px";
  const FileIconWidth = isMobile ? "32px" : "40px";

  const handleErrorMessage = error => {
    const errorMessages = {
      "file-invalid-type": getFileUploadErrorMessage.INVALID_FILE_TYPE,
      "file-too-small": getFileUploadErrorMessage.FILE_TOO_SMALL,
      "file-too-large": getFileUploadErrorMessage.FILE_TOO_BIG
    };
    return errorMessages[error.code] || error?.message;
  };

  return (
    visible && (
      <Fragment>
        <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
          <div className={classes.fieldDescription}>
            {fieldDescription}
            {showUploadInfoIcon && (
              <Icon name={ICONS.info} className={classes.uploadInfoIcon} alt="info" />
            )}
          </div>
        </ContexualHelp>
        {notedText}

        <div className={cx(classes.uplaodContainer, { "Mui-error": isError })} {...getRootProps()}>
          <div className={classes.main}>
            <div className={classes.row}>
              {hasFile && showUploadSuccessIcon ? (
                <Check size="14px" className={classes.success} />
              ) : (
                <FileIcon height={FileIconHeight} width={FileIconWidth} alt="companyIconSvg" />
              )}
            </div>
            <div className={classes.contentContainer}>
              <section>
                <div className={classes.contentWrapper}>
                  <input {...getInputProps()} />
                  <div className={classes.content}>
                    {/* Drag and drop file here or upload from your computer */}
                    {showUploadSuccessIcon}
                    {props?.content && props?.content?.fileName ? (
                      <p>{props?.content?.fileDescription || props?.content?.fileName}</p>
                    ) : (
                      `${
                        isMobile && mobilecontentPlaceholder
                          ? mobilecontentPlaceholder
                          : "Drag and drop file here or upload from your computer"
                      }`
                    )}
                  </div>

                  {hasFile && showUploadSuccessIcon ? (
                    <></>
                  ) : fileRejections?.length > 0 ? (
                    fileRejections?.map(({ file, errors }) =>
                      errors?.map(e => {
                        return (
                          <div key={file} className={cx(classes.subcontent, classes.error)}>
                            {handleErrorMessage(e)}
                          </div>
                        );
                      })
                    )
                  ) : isDragActive || isUploading ? (
                    <div className={classes.row}>
                      <CircularProgress size="14px" className={classes.isUploadingStatus} />
                      <div className={classes.subcontent}>Uploading...</div>
                    </div>
                  ) : (
                    <div className={classes.subcontent}>{helperText}</div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {hasFile ? (
            <Button
              color="primary"
              variant="outlined"
              className={classes.actionButton}
              onClick={onDelete}
            >
              Remove
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              component="label"
              className={classes.actionButton}
            >
              Upload
              <input type="file" hidden {...getInputProps()} />
            </Button>
          )}
        </div>
        {infoTitle && <InfoTitle title={infoTitle} showIcon={infoIcon} />}
        {isError && <ErrorMessageComponent error={errorMessage} />}
      </Fragment>
    )
  );
};
