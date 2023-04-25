import React, { Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import cx from "classnames";

import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../assets/icons/fileUpload.svg";
import { ReactComponent as Check } from "../../assets/icons/credit_score.svg";
import useDecisions from "../../utils/useDecisions";

export const Upload = ({
  accept,
  fileSize,
  file,
  onDelete,
  fieldDescription,
  helperText,
  path,
  ...props
}) => {
  const { minSize, maxSize } = fileSize;
  const classes = useStyles();

  const { isDragActive, fileRejections, getRootProps, getInputProps } = useDropzone({
    accept,
    maxSize,
    minSize,
    ...props
  });
  const hasFile = !!file;
  const { visible } = useDecisions(path);

  return (
    visible && (
      <Fragment>
        <div className={classes.fieldDescription}>{fieldDescription}</div>
        <div className={classes.uplaodContainer}>
          <div className={classes.main} {...getRootProps()}>
            <FileIcon className={classes.fileIcon} height="44" width="40" alt="companyIconSvg" />
            <div className={classes.contentContainer}>
              <section>
                <div>
                  <input {...getInputProps()} />
                  <div className={classes.content}>
                    Drag and drop file here or upload from your computer
                  </div>

                  {hasFile ? (
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
      </Fragment>
    )
  );
};
