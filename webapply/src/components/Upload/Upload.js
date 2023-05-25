import React, { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import cx from "classnames";
import { getIn } from "formik";
import { isMobile } from "react-device-detect";

import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../assets/icons/fileUpload.svg";
import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import useDecisions from "../../utils/useDecisions";
import { ErrorMessage } from "./../Notifications";

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
  const isError = errorMessage && getIn(touched, field.name);
  const FileIconHeight = isMobile ? "35px" : "44px";
  const FileIconWidth = isMobile ? "32px" : "40px";

  return (
    visible && (
      <Fragment>
        <div className={classes.fieldDescription}>{fieldDescription}</div>
        <div className={classes.uplaodContainer}>
          <div className={classes.main} {...getRootProps()}>
            <FileIcon
              style={{ height: FileIconHeight, width: FileIconWidth }}
              alt="companyIconSvg"
            />
            <div className={classes.contentContainer}>
              <section>
                <div className={classes.contentWrapper}>
                  <input {...getInputProps()} />
                  <div className={classes.content}>
                    {/* Drag and drop file here or upload from your computer */}
                    {showUploadSuccessIcon}
                    {props.content
                      ? props.content
                      : `${
                          isMobile
                            ? mobilecontentPlaceholder
                            : "Drag and drop file here or upload from your computer"
                        }`}
                  </div>

                  {hasFile && showUploadSuccessIcon ? (
                    <div className={classes.row}>
                      <Check size="14px" className={classes.success} />
                      <div
                        className={cx(classes.subcontent, classes.success)}
                        style={{ marginLeft: "5px" }}
                      >
                        Uploaded
                      </div>
                    </div>
                  ) : fileRejections?.length > 0 ? (
                    fileRejections?.map(({ file, errors }) =>
                      errors?.map(e => {
                        return (
                          <div key={file} className={cx(classes.subcontent, classes.error)}>
                            {e?.message}
                          </div>
                        );
                      })
                    )
                  ) : isDragActive ? (
                    <div className={classes.row}>
                      <CircularProgress size="14px" style={{ marginRight: "8px" }} />
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
        {isError && <ErrorMessageComponent error={errorMessage} />}
      </Fragment>
    )
  );
};
