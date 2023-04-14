import React from "react";
import { Button } from "@material-ui/core";
import { useStyles } from "./styled";
import { ReactComponent as FileIcon } from "../../../../assets/icons/fileUpload.svg";

export const DocumentUpload = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.uplaodContainer}>
        <div className={classes.main}>
          <FileIcon className={classes.fileIcon} height="44" width="40" alt="companyIconSvg" />
          <div className={classes.contentContainer}>
            <div className={classes.content}>
              Drag and drop file here or upload from your computer
            </div>
            <div className={classes.subcontent}>
              Supported formats are PDF, JPG and PNG | 5MB maximum | 10KB minimum
            </div>
          </div>
        </div>

        <Button
          color="primary"
          variant="contained"
          component="label"
          className={classes.actionButton}
        >
          Upload
          <input type="file" hidden />
        </Button>
      </div>
    </>
  );
};

export default DocumentUpload;
