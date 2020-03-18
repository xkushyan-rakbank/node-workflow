import React from "react";
import { useStyles } from "./styled";
import { ReactComponent as AlertIcon } from "../../assets/icons/alert.svg";

export const DocumentUploadError = ({
  error = "Oops! We couldn’t upload the document.",
  tryAgainHandler = () => {}
}) => {
  const classes = useStyles();

  return (
    <span className={classes.error}>
      <AlertIcon className={classes.alertIcon} />
      {error}. Please
      <span className={classes.errorLink} onClick={tryAgainHandler}>
        try again.
      </span>
    </span>
  );
};
