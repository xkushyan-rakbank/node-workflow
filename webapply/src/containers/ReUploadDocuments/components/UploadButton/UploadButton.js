import React, { useRef, useState } from "react";
import { useStyles } from "./styled";
import { documentValidationSchema } from "../../../../utils/validation";
import { ReactComponent as FileIcon } from "../../../../assets/icons/file.svg";
import { ReactComponent as AddIcon } from "../../../../assets/icons/add-icon.svg";
import { DocumentUploadError } from "../../../../components/DocumentUploadError/DocumentUploadError";
import { useSelector } from "react-redux";
import { getAdditionalConfigs } from "../../../../store/selectors/appConfig";

export const UploadButton = ({ uploadDocument, isFirstDocument }) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const inputEl = useRef(null);
  const additionalConfigs = useSelector(getAdditionalConfigs);
  const uploadButtonClick = () => {
    setError("");
    inputEl.current.click();
  };

  const fileUploadClick = event => (event.target.value = null);

  const fileUploadChange = () => {
    const file = inputEl.current.files[0];

    try {
      if (inputEl.current.value) {
        documentValidationSchema(additionalConfigs).validateSync({ file });
        uploadDocument(file);
      }
    } catch (error) {
      return setError(error.message);
    }
  };

  return (
    <>
      <input
        className={classes.fileInput}
        name="file"
        type="file"
        onChange={fileUploadChange}
        onClick={fileUploadClick}
        ref={inputEl}
      />
      <div className={classes.uploadButton} onClick={uploadButtonClick}>
        {error ? (
          <FileIcon className={classes.errorIcon} width={18} height={24} />
        ) : (
          <AddIcon className={classes.addIcon} width={24} height={24} />
        )}
        <div className={classes.textContainer}>
          <span className={classes.uploadButtonText}>
            {isFirstDocument ? "Upload document" : "Add another document"}
          </span>
          {error && <DocumentUploadError error={error} />}
        </div>
      </div>
    </>
  );
};
